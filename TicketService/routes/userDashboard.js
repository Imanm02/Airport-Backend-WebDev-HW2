const express = require('express');
const router = express.Router();
const {getUserTickets} = require('../controllers/dashboardController');
const {isAuth} = require('../middlewares/auth');


router.get('/tickets', isAuth, getUserTickets);

module.exports = router;