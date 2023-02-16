package oauth2

import (
	"context"
	"github.com/go-faster/errors"
	"github.com/go-redis/redis/v8"
	"time"
)

type redisStorage struct {
	client *redis.Client
}

const accessTokenPrefix = "access:"
const refreshTokenPrefix = "refresh:"

func NewStorageFromRedis(options *redis.Options) (Storage, error) {
	r := redis.NewClient(options)
	err := r.Ping(context.Background()).Err()
	if err != nil {
		return redisStorage{}, err
	}
	return redisStorage{r}, nil
}

func (r redisStorage) Store(userID int64, ttl time.Duration) (accessToken, refreshToken string, err error) {
	accessToken = NewToken()
	refreshToken = NewToken()
	err = r.client.Set(context.Background(), accessTokenPrefix+accessToken, userID, ttl).Err()
	if err != nil {
		return "", "", errors.Wrap(err, "cannot set access token")
	}
	err = r.client.Set(context.Background(), refreshTokenPrefix+refreshToken, accessToken, ttl).Err()
	if err != nil {
		return "", "", errors.Wrap(err, "cannot set refresh token")
	}
	return
}

func (r redisStorage) Get(accessToken string) (userID int64, err error) {
	return r.client.Get(context.Background(), accessTokenPrefix+accessToken).Int64()
}

func (r redisStorage) Delete(accessToken string) error {
	return r.client.Del(context.Background(), accessTokenPrefix+accessToken).Err()
}

func (r redisStorage) Refresh(refreshToken string, ttl time.Duration) (newAccessToken string, err error) {
	accessTokenData := r.client.Get(context.Background(), refreshTokenPrefix+refreshToken)
	if accessTokenData.Err() != nil {
		return "", errors.Wrap(accessTokenData.Err(), "cannot get access token of refresh token")
	}
	r.client.Expire(context.Background(), refreshTokenPrefix+refreshToken, ttl)
	accessToken := accessTokenData.Val()
	// Renew TTL
	changedTTL := r.client.Expire(context.Background(), accessTokenPrefix+accessToken, ttl)
	if changed, _ := changedTTL.Result(); !changed {
		return "", NotFound
	}
	// Change it
	newAccessToken = NewToken()
	r.client.Rename(context.Background(), accessTokenPrefix+accessToken, accessTokenPrefix+newAccessToken)
	return
}
