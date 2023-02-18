const {validationResult} = require('express-validator');
const {getUserTicket} = require("../services/userTicketService");


async function getUserTickets(req, res) {
    const errors = validationResult(req);
    /* send errors of middlewares */
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const user_id = req.user.user_id
        console.log(user_id);
        const tickets = await getUserTicket(user_id);
        res.status(200).send(tickets);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}

module.exports = {
    getUserTickets
}