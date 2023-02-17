package core

import (
	"Authcore/api"
	"Authcore/pkg/oauth2"
	"Authcore/pkg/proto"
	"os"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"google.golang.org/grpc"
)

func main() {
	oauth2Redis, err := oauth2.NewStorageFromRedis(getRedisOptions())
	if err != nil {
		log.WithError(err).Fatalln("cannot connect to redis for oauth2")
	}
	oauth := oauth2.NewOauth2(oauth2Redis)
	db, err := database.NewPostgresDatabase(getDatabaseConnectionURL())
	if err != nil {
		log.WithError(err).Fatalln("cannot initialize database")
	}
	dbConnection := database.NewDatabase(db)
	go startHTTPServer(oauth, dbConnection)
	go startGrpcServer(oauth, dbConnection)
	select {}
}

func startHTTPServer(oauth oauth2.Oauth2, db database.Database) {
	apiServer := api.API{
		Oauth:    oauth,
		Database: db,
	}
	g := gin.Default()
	g.POST("/signup", apiServer.SignUpUser)
	g.POST("/login", apiServer.LoginUser)
	g.POST("/logout", apiServer.SignOutUser)
	g.GET("/getuser", apiServer.RefreshToken)
	var err error
	if os.Getenv("TLS_CERT") != "" && os.Getenv("TLS_KEY") != "" {
		err = g.RunTLS(getServeData())
	} else {
		err = g.Run(os.Getenv("HTTP_LISTEN"))
	}
	if err != nil {
		log.WithError(err).Fatalln("cannot serve http server")
	}
}

func startGrpcServer(oauth oauth2.Oauth2, db database.Database) {
	apiServer := api.GrpcServer{
		Oauth:    oauth,
		Database: db,
	}
	var opts []grpc.ServerOption
	grpcServer := grpc.NewServer(opts...)
	proto.RegisterAuthServerServiceServer(grpcServer, apiServer)
	err := grpcServer.Serve(getGrpcListener())
	if err != nil {
		log.WithError(err).Fatalln("cannot serve grpc server")
	}
}
