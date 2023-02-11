const express = require('express');
const router = express.Router();
const Purchase = require('../models/purchase')
// const Purchase = require('../db').Purchase
// const Purchase = require('../db').Purchase

router.get('/:transactionId/:resultId', async function (req, res, next) {
    // if result != 1
    // show adequate message
    // if result == 1
    // show success and save the transaction in purchase table

    let result = +req.params.resultId


    try {
        let record = await Purchase.findByPk(+req.params.transactionId);
        console.log(record)
        record.transaction_result = result;
        await record.save();
        // await Purchase.upsert({
        //     transaction_id: +req.params.transactionId,
        //     transaction_result: result,
        // });
    } catch (e) {
        res.status(500).send({
            message: "error in saving transaction result"
        });
    }

    if (result !== 1) {

        // console.log(result)
        if (result === 2) {
            res.send('transaction failed, Input Mismatch');
        } else if (result === 3) {
            res.send('transaction failed, Expire');
        } else if (result === 4) {
            res.send('transaction failed, No Credit');

        } else if (result === 5) {
            res.send('transaction failed, Canceled');
        } else {
            res.send('transaction failed, Unknown Error');
        }
    } else {
        res.send('transaction successful');
    }


})


module.exports = router;