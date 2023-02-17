FROM golang:1.16-alpine
WORKDIR /authcore
COPY . /authcore/
RUN go mod tidy
CMD [ "go", "run", "main.go" ]