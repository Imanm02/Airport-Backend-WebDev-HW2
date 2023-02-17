package databases

import (
	"context"

	"github.com/go-faster/errors"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"golang.org/x/crypto/bcrypt"
)

type Database struct {
	db *pgxpool.Pool
}

func NewDatabase(db *pgxpool.Pool) Database {
	return Database{db}
}

var InvalidCredentialsErr = errors.New("invalid credentials")

func (db Database) AuthUser(ctx context.Context, email, password string) (int64, error) {
	var userID int64
	var hashedPassword string
	err := db.db.QueryRow(ctx, "SELECT user_id, password_hash FROM user_account WHERE email=$1", email).Scan(&userID, &hashedPassword)
	if err == pgx.ErrNoRows {
		return 0, InvalidCredentialsErr
	}
	if err != nil {
		return 0, errors.Wrap(err, "cannot query row")
	}
	if bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password)) != nil {
		return 0, InvalidCredentialsErr
	}
	return userID, nil
}
