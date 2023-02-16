package oauth2

import (
	"crypto/rand"
	"encoding/base32"
)

type Oauth2 struct {
	Storage
}

func NewOauth2(storage Storage) Oauth2 {
	return Oauth2{storage}
}

func NewToken() string {
	b := make([]byte, 16)
	_, _ = rand.Read(b)
	return base32.StdEncoding.EncodeToString(b)
}
