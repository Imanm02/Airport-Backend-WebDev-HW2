FROM golang:alpine
WORKDIR /usr/src/goapp
COPY . /usr/src/goapp/
RUN go mod tidy
RUN go build -o /authcore ./cmd/AuthCore
CMD [ "/authcore" ]
