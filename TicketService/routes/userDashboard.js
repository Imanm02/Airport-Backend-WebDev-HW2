const express = require('express');
const router = express.Router();
const {getUserTickets} = require('../controllers/dashboardController');
const {dummyIsAuth} = require('../middlewares/auth');


router.get('/tickets', dummyIsAuth, getUserTickets);

module.exports = router;