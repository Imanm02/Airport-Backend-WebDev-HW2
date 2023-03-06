package main

import (
	"AuthCore/api"
	"AuthCore/proto"
	"log"
	"net"

	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
	"google.golang.org/grpc"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func main() {
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	dsn := "host=localhost port=5432 user=airport dbname=airport sslmode=disable password=airport"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		panic("failed to connect database")
	}
	r := gin.Default()
	listener, err := net.Listen("tcp", ":7312")
	if err != nil {
		panic(err)
	}
	s := grpc.NewServer()
	proto.RegisterAuthServiceServer(s, &api.GrpcServer{})
	api.InitApis(r, db, rdb)
	r.Run(":5000")
	if err := s.Serve(listener); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
