const {query} = require('express-validator');

const middlewares = [
    query('origin').notEmpty().withMessage("Origin is required").bail(),

    query('destination').notEmpty().withMessage("Destination is required").bail(),

    query('departureDate').notEmpty().withMessage("Depart date is required").bail()
        .isDate().withMessage("is not date").withMessage("Depart date must be date").bail()
        .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("wrong date format").bail(),

    query('returnDate').custom((value, {req}) => {
        req.hasReturn = value !== undefined;
        return true;
    })
        .if(query('returnDate').exists()).isDate().withMessage("return date must be date").bail()

        .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("wrong date format").bail()

        .custom((value, {req}) => {
            if (Date.parse(value) < Date.parse(req.query.departureDate)) {
                throw new Error("return date before depart date");
            }
            return true;
        }).bail(),
];

module.exports = middlewares;