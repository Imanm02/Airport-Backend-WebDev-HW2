const express = require('express');
const router = express.Router();
const flightMiddleware = require('../middlewares/flightMiddleware');
const {getFlight} = require('../controllers/flightController');


router.get('/flights', ...flightMiddleware, getFlight);

module.exports = router;