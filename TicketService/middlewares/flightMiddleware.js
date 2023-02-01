const {query} = require('express-validator');

const middlewares = [
    query('origin').notEmpty().withMessage("Origin is required"),

    query('destination').notEmpty().withMessage("Destination is required"),

    query('departDate').notEmpty().withMessage("Depart date is required")
        .isDate().withMessage("is not date").withMessage("Depart date is not valid")
        .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("wrong date format"),

    query('returnDate').custom((value, {req}) => req.hasReturn = !!value)
        .if((value, {req}) => req.hasReturn).isDate().withMessage("return date is not valid")
        .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("wrong date format")
        .custom((value, {req}) => {
            if (Date.parse(value) < Date.parse(req.query.departureDate)) {
                throw new Error("return date before depart date");
            }
            console.log("return date after depart date");
            return true;
        }),
];

module.exports = middlewares;