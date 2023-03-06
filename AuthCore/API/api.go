package API

import (
	"encoding/base64"
	"fmt"
	"regexp"
	"time"

	"AuthCore/storage"
	"crypto/sha256"

	"github.com/gin-gonic/gin"
	"github.com/kataras/jwt"
	"github.com/redis/go-redis/v9"
	"gorm.io/gorm"
)

var db *gorm.DB
var cache *redis.Client
var sharedKey = []byte("sercrethatmaycontainch@r$32chars")

func InitApis(r *gin.Engine, pdb *gorm.DB, rdb *redis.Client) {
	r.POST("/signup", signup)
	r.POST("/signin", signin)
	r.POST("/signout", signout)
	r.POST("/userinfo", userInfo)
	r.POST("/refresh", refresh)
	db = pdb
	cache = rdb
}

func signup(c *gin.Context) {
	var req SignUpRequest
	err := c.BindJSON(&req)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "incomplete request",
		})
		return
	}
	if req.Gender != "M" && req.Gender != "F" {
		c.JSON(400, gin.H{
			"error": "gender invalid",
		})
		return
	}
	if match, _ := regexp.MatchString("\\d{11}", req.PhoneNumber); !match {
		c.JSON(400, gin.H{
			"error": "phone number invalid " + req.PhoneNumber,
		})
		return
	}
	if match, _ := regexp.MatchString("[-a-zA-Z0-9_\\.]+@\\w+\\.com", req.Email); !match {
		c.JSON(400, gin.H{
			"error": "email invalid",
		})
		return
	}
	if len(req.Password) < 4 {
		c.JSON(400, gin.H{
			"error": "password too short",
		})
		return
	}
	h := sha256.New()
	h.Write([]byte(req.Password))
	user := storage.User{
		Email:        req.Email,
		PhoneNumber:  req.PhoneNumber,
		Gender:       req.Gender,
		FirstName:    req.FirstName,
		LastName:     req.LastName,
		PasswordHash: base64.URLEncoding.EncodeToString(h.Sum(nil)),
	}
	tx := db.WithContext(c)
	if err := tx.Table("user_account").Create(&user).Error; err != nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(200, UserInfoResponse{
		UserID:      user.UserID,
		Email:       user.Email,
		PhoneNumber: user.PhoneNumber,
		Gender:      user.Gender,
		FirstName:   user.FirstName,
		LastName:    user.LastName,
	})
}

func signin(c *gin.Context) {
	var req SignInRequest
	err := c.BindJSON(&req)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "incomplete request",
		})
		return
	}
	if req.Email == "" && req.PhoneNumber == "" {
		c.JSON(400, gin.H{
			"error": "incomplete request",
		})
		return
	}
	h := sha256.New()
	h.Write([]byte(req.Password))
	hash := base64.URLEncoding.EncodeToString(h.Sum(nil))
	var user storage.User
	tx := db.WithContext(c)
	if req.Email != "" {
		if err := tx.Table("user_account").Where("email = ? AND password_hash = ?", req.Email, hash).Take(&user).Error; err != nil {
			c.JSON(401, gin.H{
				"error": err.Error(),
			})
			return
		}
	} else {
		if err := tx.Table("user_account").Where("phone_number = ? AND password_hash = ?", req.PhoneNumber, hash).Take(&user).Error; err != nil {
			c.JSON(401, gin.H{
				"error": err.Error(),
			})
			return
		}
	}

	accessToken, err := jwt.Sign(jwt.HS256, sharedKey, UserClaim{
		IsRefresh:   false,
		UserID:      user.UserID,
		Email:       user.Email,
		PhoneNumber: user.PhoneNumber,
	}, jwt.MaxAge(30*time.Minute))
	if err != nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

	refreshToken, err := jwt.Sign(jwt.HS256, sharedKey, UserClaim{
		IsRefresh:   true,
		UserID:      user.UserID,
		Email:       user.Email,
		PhoneNumber: user.PhoneNumber,
	}, jwt.MaxAge(30*24*time.Hour))
	if err != nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

	tx.Transaction(func(tx *gorm.DB) error {
		err := tx.Table("refresh_token").Create(&storage.RefreshToken{
			UserID:     user.UserID,
			Token:      string(refreshToken),
			Expiration: time.Now().Add(2 * time.Hour),
		}).Error
		if err != nil {
			return err
		}
		cache.Set(c, string(refreshToken), "refresh", 2*time.Hour)
		return nil
	})

	c.JSON(200, SignInResponse{
		RefreshToken: string(refreshToken),
		AccessToken:  string(accessToken),
		Expiration:   time.Now().Add(30 * time.Minute),
	})
}

func signout(c *gin.Context) {
	auth := c.Request.Header.Get("Authorization")
	verifiedToken, err := jwt.Verify(jwt.HS256, sharedKey, []byte(auth))
	if err != nil {
		c.JSON(401, gin.H{
			"error": err.Error(),
		})
		return
	}

	var claims UserClaim
	err = verifiedToken.Claims(&claims)
	if err != nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}
	if claims.IsRefresh {
		c.JSON(500, gin.H{
			"error": "access token must be given",
		})
		return
	}

	tx := db.WithContext(c)
	err = tx.Transaction(func(tx *gorm.DB) error {
		_, err := cache.Get(c, auth).Result()
		if err != nil && err != redis.Nil {
			return err
		}
		if err != redis.Nil {
			return fmt.Errorf("access token already signed out")
		}
		err = tx.Table("unauthorized_token").Create(&storage.UnauthorizedToken{
			UserID:     claims.UserID,
			Token:      auth,
			Expiration: verifiedToken.StandardClaims.ExpiresAt(),
		}).Error
		if err != nil {
			return err
		}
		err = tx.Table("unauthorized_token").Where("expiration < NOW()").Delete(&storage.UnauthorizedToken{}).Error
		if err != nil {
			return err
		}
		err = cache.Set(c, auth, "access", verifiedToken.StandardClaims.Timeleft()).Err()
		if err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{
		"message": "signed out successfully",
	})
}

func checkAccessToken(c *gin.Context, tx *gorm.DB) (userID int64, err error) {
	auth := c.Request.Header.Get("Authorization")

	verifiedToken, err := jwt.Verify(jwt.HS256, sharedKey, []byte(auth))
	if err != nil {
		c.JSON(401, gin.H{
			"error": err.Error(),
		})
		return
	}

	var claims UserClaim
	err = verifiedToken.Claims(&claims)
	if err != nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

	if claims.IsRefresh {
		err = fmt.Errorf("access token must be given")
		c.JSON(401, gin.H{
			"error": err.Error(),
		})
		return
	}

	err = cache.Get(c, auth).Err()
	if err == nil {
		err = fmt.Errorf("access token signed out")
		c.JSON(401, gin.H{
			"error": err.Error(),
		})
		return
	} else if err != nil && err != redis.Nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

	var accessToken storage.UnauthorizedToken
	err = tx.Table("unauthorized_token").Where("token = ?", auth).Take(&accessToken).Error
	if err == nil {
		cache.Set(c, auth, "access", accessToken.Expiration.Sub(time.Now()))
		err = fmt.Errorf("token signed out")
		c.JSON(401, gin.H{
			"error": err.Error(),
		})
		return
	} else if err != nil && err != gorm.ErrRecordNotFound {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

	return claims.UserID, nil
}

func userInfo(c *gin.Context) {
	tx := db.WithContext(c)
	userID, err := checkAccessToken(c, tx)
	if err != nil {
		return
	}
	var user storage.User
	if err := tx.Table("user_account").Where("user_id = ?", userID).Take(&user).Error; err != nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(200, UserInfoResponse{
		UserID:      user.UserID,
		Email:       user.Email,
		PhoneNumber: user.PhoneNumber,
		Gender:      user.Gender,
		FirstName:   user.FirstName,
		LastName:    user.LastName,
	})
}

func refresh(c *gin.Context) {
	auth := c.Request.Header.Get("Authorization")

	verifiedToken, err := jwt.Verify(jwt.HS256, sharedKey, []byte(auth))
	if err != nil {
		c.JSON(401, gin.H{
			"error": err.Error(),
		})
		return
	}

	var claims UserClaim
	err = verifiedToken.Claims(&claims)
	if err != nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

	if !claims.IsRefresh {
		c.JSON(401, gin.H{
			"error": "refresh token must be given",
		})
		return
	}

	tx := db.WithContext(c)

	err = cache.Get(c, auth).Err()
	if err != nil && err != redis.Nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	} else if err == redis.Nil {
		var refreshToken storage.RefreshToken
		err = tx.Table("refresh_token").Where("token = ?", auth).Take(&refreshToken).Error
		if err != nil && err != gorm.ErrRecordNotFound {
			c.JSON(500, gin.H{
				"error": err.Error(),
			})
			return
		}
		if err == gorm.ErrRecordNotFound {
			c.JSON(400, gin.H{
				"error": fmt.Errorf("refresh token invalid"),
			})
			return
		}
		if refreshToken.Expiration.Before(time.Now()) {
			err = tx.Table("refresh_token").Delete(&refreshToken).Error
			if err != nil {
				c.JSON(500, gin.H{
					"error": err.Error(),
				})
				return
			}
			c.JSON(400, gin.H{
				"error": fmt.Errorf("refresh token expired"),
			})
			return
		}
	}

	accessToken, err := jwt.Sign(jwt.HS256, sharedKey, UserClaim{
		IsRefresh:   false,
		UserID:      claims.UserID,
		Email:       claims.Email,
		PhoneNumber: claims.PhoneNumber,
	}, jwt.MaxAge(30*time.Minute))
	if err != nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

	tx.Transaction(func(tx *gorm.DB) error {
		cache.Set(c, auth, "refresh", 2*time.Hour)
		err := tx.Table("refresh_token").Where("token = ?", auth).Updates(&storage.RefreshToken{
			Expiration: time.Now().Add(2 * time.Hour),
		}).Error
		if err != nil {
			return err
		}
		return nil
	})

	c.JSON(200, RefreshResponse{
		AccessToken: string(accessToken),
		Expiration:  time.Now().Add(2 * time.Hour),
	})
}
