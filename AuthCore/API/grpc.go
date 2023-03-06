package api

import (
	"AuthCore/proto"
	"context"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type GrpcServer struct {
	proto.UnimplementedAuthServiceServer
}

func (s *GrpcServer) CheckToken(ctx context.Context, t *proto.Token) (*proto.UserData, error) {
	//t.Token
	return nil, status.Errorf(codes.Unimplemented, "method CheckToken not implemented")
}
