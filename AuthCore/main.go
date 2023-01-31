package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"golang.org/x/crypto/bcrypt"

	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "mysecretpassword"
	dbname   = "mydb"
)

var db *sql.DB

func main() {
	var err error
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatalf("Error opening database: %v\n", err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		log.Fatalf("Error pinging database: %v\n", err)
	}

	http.HandleFunc("/register", handleRegister)
	http.HandleFunc("/login", handleLogin)

	log.Println("Starting server on :8080")
	err = http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatalf("Error starting server: %v\n", err)
	}
}

func handleRegister(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	username := r.FormValue("username")
	email := r.FormValue("email")
	password := r.FormValue("password")

	// Validate input
	if username == "" || email == "" || password == "" {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	// Check if the email already exists
	var emailExists string
	err := db.QueryRow("SELECT email FROM users WHERE email=$1", email).Scan(&emailExists)
	if err == nil {
		http.Error(w, "Email already exists", http.StatusBadRequest)
		return
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Error hashing password", http.StatusInternalServerError)
		return
	}

	// Insert the new user into the database
	_, err = db.Exec("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", username, email, hashedPassword)
	if err != nil {
		http.Error(w, "Error inserting user into database", http.StatusInternalServerError)
		return
	}
	fmt.Fprintln(w, "User registered successfully!")

}

http.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
  	r.ParseForm()
    if r.Method != http.MethodPost {
      http.Error(w, "Invalid request method", http