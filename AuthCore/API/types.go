package api

type SignUpRequest struct {
	Email       string `json:"email"`
	PhoneNumber string `json:"phone_number"`
	Gender      string `json:"gender"`
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
	Password    string `json:"password"`
}

type SignInRequest struct {
	Email       string `json:"email"`
	PhoneNumber string `json:"phone_number"`
	Password    string `json:"password"`
}

type UserInfoResponse struct {
	UserID      int64  `json:"user_id"`
	Email       string `json:"email"`
	PhoneNumber string `json:"phone_number"`
	Gender      string `json:"gender"`
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
}

type UserClaim struct {
	UserID      int64  `json:"user_id"`
	Email       string `json:"email"`
	PhoneNumber string `json:"phone_number"`
}
