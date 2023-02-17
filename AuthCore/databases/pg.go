package databases

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

func NewPostgresDatabase(connectionString string) (*pgxpool.Pool, error) {
	return pgxpool.New(context.Background(), connectionString)
}
