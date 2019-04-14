const axios = require('axios');
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Transaction = require("../models/Transaction");

// Purchase stock if user has enough balance and insert transaction to database
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
            let totalPrice = latestPrice * req.params.shares;

            // Update if user has enough balance to make transaction
            if (req.session.balance > totalPrice) {
                let newBalance = Math.round((req.session.balance - totalPrice) * 100) / 100;
                // Update the user's balance
                User.findOneAndUpdate({ email: req.session.user }, { balance: newBalance }, { upsert: true }, (error) => {
                    if (error) return res.send(500, { error: error });
                    req.session.balance = newBalance;
                    const newData = {
                        balance: newBalance
                    }
                    return res.send(newData);
                });

                // Create transaction entry in database
                axios.post('http://localhost:4000/api/transactions', {
                    user: req.session.user,
                    symbol: symbol,
                    shares: req.params.shares,
                    price: totalPrice
                })
                    .catch(err => console.log(err));
            }
            else {
                return res.status(400).send("Not enough balance!");
            }
        }
            //res.send(response.data) 
        )
        .catch(error => next(error));
});

//Get the user's balance
router.get("/balance", (req, res, next) => {
    if (!req.session.user) {
        console.log("not logged in")
        return res.status(401).send();
    }

    // Find a user and return the balance
    User.findOne({ email: req.session.user }).then(user => {
        if (!user) {
            return res.status(400).send("User doesn't exist");
        }
        console.log(user.balance);
        return res.status(200).send(user);
    })
});

// Save user transaction into database
router.post("/transactions", (req, res) => {
    const { user, symbol, shares, price } = req.body;
    const newTransaction = new Transaction({
        user,
        symbol,
        shares,
        price
    })

    newTransaction
        .save()
        .then(transaction => res.json(transaction))
        .catch(err => console.log(err));

    //  return res.status(200).send(newTransaction);
});

// Get all transactions for a user
router.get("/transactions/:user", (req, res) => {
    Transaction.find({ user: req.params.user }).then(transaction => {
        if (!transaction) {
            return res.status(400).send("User not found!");
        }
        return res.status(200).send(transaction);
    });
});

// Get all transactions for a user and organizing into a portfolio object
router.get("/portfolio", (req, res) => {
    // Fetch all transactions from a user
    axios.get(`http://localhost:4000/api/transactions/${req.session.user}`)
        .then(response => {
            // Create an object to store the stock and amount of shares a user has
            let portfolio = {};
            response.data.forEach(response => {
                if (!portfolio.hasOwnProperty(response.symbol)) {
                    portfolio[response.symbol] = response.shares;
                } else {
                    portfolio[response.symbol] += response.shares;
                }
            })

            for (var stock in portfolio) {
                if (portfolio.hasOwnProperty(stock)) {
                    axios.get(`https://api.iextrading.com/1.0/stock/${stock}/quote`)
                        .then(response => {
                            const { latestPrice, open } = response.data;
                            let stockStatus = open - latestPrice;
                            if (stockStatus < open)
                                stock.status = 'low'
                            else if (stockStatus > open)
                                stock.status = 'high'
                            else
                                stock.status = 'neutral'

                        }).catch(error => console.log(error))
                }
            }
            return res.status(200).send(portfolio)
        }).catch(error => res.status(401).send(error))
});


module.exports = router;