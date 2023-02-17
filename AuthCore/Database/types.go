package database

import (
	"database/sql/driver"

	"github.com/go-faster/errors"
)

type Gender uint8

const (
	GenderMale Gender = iota
	GenderFemale
)

func (g *Gender) String() string {
	switch *g {
	case GenderMale:
		return "m"
	case GenderFemale:
		return "f"
	default:
		return "u"
	}
}

func (g *Gender) Value() (driver.Value, error) {
	switch *g {
	case GenderMale:
		return "m", nil
	case GenderFemale:
		return "f", nil
	}
	return nil, errors.New("invalid gender")
}

func (g *Gender) Scan(a interface{}) error {
	switch data := a.(type) {
	case string:
		return g.UnmarshalText([]byte(data))
	case []byte:
		return g.UnmarshalText(data)
	}
	return errors.New("invalid type")
}

func (g *Gender) UnmarshalText(text []byte) error {
	switch string(text) {
	case "m":
		*g = GenderMale
		return nil
	case "f":
		*g = GenderFemale
		return nil
	}
	return errors.New("invalid gender")
}
