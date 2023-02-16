package main

import (
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/dgrijalva/jwt-go"
)

var db *gorm.DB
var err error

type User struct {
	ID        uint   `gorm:"primary_key"`
	Username  string `gorm:"not null"`
	Password  string `gorm:"not null"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time
}

func init() {
	db, err = gorm.Open("postgres", "host=myhost port=myport user=gorm dbname=gorm password=mypassword")
	if err != nil {
		log.Fatalf("Error opening database: %v", err)
	}

	defer db.Close()

	db.AutoMigrate(&User{})
}

func (api *API) signup(c *gin.Context) {
	username := c.PostForm("username")
	password := c.PostForm("password")

	if username == "" || password == "" {
		c.JSON(400, gin.H{"error": "Username and password are required"})
		return
	}

	user := User{
		Username: username,
		Password: password,
	}

	db.Create(&user)

	c.JSON(201, gin.H{"message": "User created"})
}

func (api *API) login(c *gin.Context) {
	username := c.PostForm("username")
	password := c.PostForm("password")

	if username == "" || password == "" {
		c.JSON(400, gin.H{"error": "Username and password are required"})
		return
	}

	var user User
	db.Where("username = ?", username).First(&user)

	if user.ID == 0 || user.Password != password {
		c.JSON(401, gin.H{"error": "Username or password is incorrect"})
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userID": user.ID,
		"exp":    time.Now().Add(time.Hour * 72).Unix(),
	})

	tokenString, err := token.SignedString([]byte("secret"))
	if err != nil {
		c.JSON(500, gin.H{"error": "Error generating token"})
		return
	}

	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB
		:       0,
	})

	err = client.Set(fmt.Sprintf("token:%d", user.ID), tokenString, time.Hour*72).Err()
	if err != nil {
		c.JSON(500, gin.H{"error": "Error storing token"})
		return
	}

	c.JSON(200, gin.H{"token": tokenString})
}

func (api *API) logout(c *gin.Context) {
	authorization := c.GetHeader("Authorization")
	if authorization == "" || !strings.HasPrefix(authorization, "Bearer ") {
		c.JSON(401, gin.H{"error": "Authorization header is required"})
		return
	}

	tokenString := strings.TrimPrefix(authorization, "Bearer ")
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte("secret"), nil
	})
	if err != nil {
		c.JSON(401, gin.H{"error": "Token is invalid"})
		return
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		c.JSON(401, gin.H{"error": "Token is invalid"})
		return
	}

	userID := uint(claims["userID"].(float64))
	err = client.Del(fmt.Sprintf("token:%d", userID)).Err()
	if err != nil {
		c.JSON(500, gin.H{"error": "Error deleting token"})
		return
	}

	c.JSON(200, gin.H{"message": "Token deleted"})
}

func (api *API) getuser(c *gin.Context) {
	authorization := c.GetHeader("Authorization")
	if authorization == "" || !strings.HasPrefix(authorization, "Bearer ") {
		c.JSON(401, gin.H{"error": "Authorization header is required"})
		return
	}

	tokenString := strings.TrimPrefix(authorization, "Bearer ")
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte("secret"), nil
	})
	if err != nil {
		c.JSON(401, gin.H{"error": "Token is invalid"})
		return
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return 0, errors.New("Cannot get claims from token")
	}
	userID, ok := claims["user_id"].(float64)
	if !ok {
		return 0, errors.New("Cannot get user ID from claims")
	}
	return int(userID), nil
}
		
