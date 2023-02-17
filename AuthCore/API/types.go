package api

type errorResponse struct {
	Error string `json:"error"`
}

type signupRequest struct {
	Email      string `form:"email" binding:"required"`
	Phone      string `form:"phone" binding:"required"`
	Password   string `form:"password" binding:"required"`
	FirstName  string `form:"first_name" binding:"required"`
	SecondName string `form:"second_name" binding:"required"`
	Gender     string `form:"gender" binding:"required"`
}

type refreshTokenRequest struct {
	RefreshToken string `query:"refresh_token" json:"refresh_token" form:"refresh_token" binding:"required"`
}

type loginRequest struct {
	Email    string `form:"email" binding:"required"`
	Password string `form:"password" binding:"required"`
}

type loginResponse struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	TTL          int64  `json:"ttl"` // in seconds
}
