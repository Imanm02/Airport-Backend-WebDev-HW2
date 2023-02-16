#!/bin/bash
# Cache
export REDIS_URL=127.0.0.1:6379
export REDIS_DB=1
# Database itself
export DATABASE_URL=postgres://postgres:postgres@localhost:5432/airline
# Rest
export HTTP_LISTEN=127.0.0.1:51691
export TLS_CERT=cert.pem
export TLS_KEY=key.pem
# GRPC
export GRPC_LISTEN_ADDRESS=127.0.0.1:21901
# Compile and stuff
go build ./cmd/AuthCore
#openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365 -nodes
# Run
./AuthCore
