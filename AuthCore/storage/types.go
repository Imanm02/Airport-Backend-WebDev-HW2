package storage

import "time"

type User struct {
	UserID       int64 `gorm:"primary_key"`
	Email        string
	PhoneNumber  string
	Gender       string
	FirstName    string
	LastName     string
	PasswordHash string
}

type UnauthorizedToken struct {
	UserID     int64
	Token      string
	Expiration time.Time
}

type RefreshToken struct {
	UserID     int64
	Token      string
	Expiration time.Time
}
