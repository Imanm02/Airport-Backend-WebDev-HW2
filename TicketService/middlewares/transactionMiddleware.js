const { check, params } = require("express-validator")

const checkPostData = [
    check("offer_price").isInt().withMessage("Wrong offer price"),
    check("flight_serial").isInt().withMessage("Wrong flight_serial"),
    check("offer_class").isIn(['y','j','f']).withMessage("Wrong class"),
    check("corresponding_user_id").isInt().withMessage("Wrong user id")
]

module.exports = checkPostData