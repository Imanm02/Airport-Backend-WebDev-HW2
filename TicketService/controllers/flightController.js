const {searchFlight} = require('../services/flightService');
const {validationResult} = require('express-validator');

async function getFlight(req, res) {
    const errors = validationResult(req);
    /* send errors of middlewares */
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const {origin, destination, departDate, returnDate, hasReturn} = req.query;
        if (hasReturn) {
            const flight = await searchFlight(origin, destination, departDate);
            const returnFlight = await searchFlight(destination, origin, returnDate);
            res.status(200).send({flight, returnFlight});
        } else {
            const flight = await searchFlight(origin, destination, departDate);
            res.status(200).send(flight);
        }

    } catch (err) {
        res.status(500).send({message: 'Internal Server Error'});
    }
}

module.exports = {
    getFlight
}