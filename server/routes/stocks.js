const axios = require('axios');
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const link = "https://api.iextrading.com/1.0/stock/aapl/quote";
const symbol = "aapl";

// Fetch from IEX API
router.get("/fetch/:symbol/:shares", (req, res, next) => {
    axios.get(`https://api.iextrading.com/1.0/stock/${req.params.symbol}/quote`)
        .then(response => {
            if (!req.session.user) {
                return res.status(401).send("Not logged in!");
            }
            const { symbol, latestPrice, open } = response.data;
            // Send relevant stock information back
            //     res.send({symbol,latestPrice,open});
            /*
            axios.get('http://localhost:4000/api/balance').then(user => {
                let totalPrice = (latestPrice * req.params.shares);
                if (user.balance > totalPrice) {
                    return res.send(user.balance - totalPrice);
                }
            }).catch(error => next(error + "sdsd"));
*/
            let totalPrice = (latestPrice * req.params.shares);
            if (req.session.balance > totalPrice) {
                return res.send("Balance " + (req.session.balance - totalPrice));
            }
        }
            //res.send(response.data) 
        )
        .catch(error => next(error));
});

router.get("/balance", (req, res, next) => {

    if (!req.session.user) {
        console.log("not logged ni")
        return res.status(401).send();
    }

    User.findOne({ email: req.session.user }).then(user => {
        if (!user) {
            return res.status(400).send("User doesn't exist");
        }
        console.log(user.balance);
        return res.status(200).send(user);
    })
});

module.exports = router;