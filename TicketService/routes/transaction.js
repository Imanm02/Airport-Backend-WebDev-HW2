const express = require('express');
const router = express.Router();
const Purchase = require('../models/purchase')
// const UserAccount = require('../models/userAccount')
const {dummyIsAuth} = require('../middlewares/auth');

const axios = require('axios')
router.post('/', dummyIsAuth, async function (req, res, next) {
    try {
        let clientHost = "http://localhost:8000/transaction/";
        const postData = req.body;
        const options = {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
            },
            url: clientHost,
            data: JSON.stringify({
                amount: postData["offer_price"],
                receipt_id: process.env.RECEIPT_ID,
                callback: "http://localhost:3000/transactionResult"
            }),
        }

        const response = await axios(options);
        // save the log of uncompleted transaction with the related user data (id, first name, last name)
        const buyer = req.user;
        const new_purchase = await Purchase.create({
            corresponding_user_id: postData["corresponding_user_id"],
            title: postData["title"],
            first_name: buyer.first_name,
            last_name: buyer.last_name,
            flight_serial: postData["flight_serial"],
            offer_price: postData["offer_price"],
            offer_class: postData["offer_class"],
            transaction_id: response.data.id
        });

        // redirect to bank payment page
        res.redirect(process.env.BANK_URL + "/payment/" + response.data.id);



        // console.log(response.data);
    } catch (e) {
        console.log(e)
    }
});


module.exports = router;