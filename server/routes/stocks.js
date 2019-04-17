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
            const { symbol, latestPrice } = response.data;
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
                return res.status(402);
            }
        })
        .catch(error => next(error));
});

// Get the user's balance
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
        .then(transaction => res.send(transaction))
        .catch(err => console.log(err));

    return res.status(200).send(newTransaction);
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

// Get all transactions for a user
router.get("/transactions", (req, res) => {
    Transaction.find({ user: req.session.user }).then(transaction => {
        if (!transaction) {
            return res.status(400).send("User not found!");
        }
        return res.status(200).send(transaction);
    });
});

// Get all transactions for a user and organize into a portfolio object
router.get("/portfolio", (req, res) => {
    // Fetch all transactions from a user
    axios.get(`http://localhost:4000/api/transactions/${req.session.user}`)
        .then(response => {
            if (response.data.length === 0)
                return res.status(404).send("No transactions");
            let portfolio = {};
            let querySymbols = '';
            // Create a portfolio object with the symbols as the properties and set the number of shares
            response.data.forEach(response => {
                if (!portfolio.hasOwnProperty(response.symbol)) {
                    portfolio[response.symbol] = { shares: response.shares };
                    // Create string of symbols for a batch API request
                    querySymbols += response.symbol + ',';
                } else {
                    portfolio[response.symbol].shares += response.shares;
                }
            })

            querySymbols = querySymbols.slice(0, -1); // Remove the trailing ','

            // Call the API with the batch of symbols and format the portfolio object
            axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${querySymbols}&types=quote`)
                .then(response => {
                    for (var stock in response.data) {
                        if (portfolio.hasOwnProperty(stock)) {
                            portfolio[stock].latestPrice = response.data[stock].quote.latestPrice;
                            portfolio[stock].changePercent = response.data[stock].quote.changePercent;
                        }
                    }

                    // Create an array from the portfolio object
                    let portfolioList = [];
                    for (var stock in portfolio) {
                        const { shares, latestPrice, changePercent } = portfolio[stock];
                        const stockData = {
                            stock,
                            shares,
                            latestPrice,
                            changePercent
                        }
                        portfolioList.push(stockData);
                    }
                    return res.status(200).send(portfolioList);
                })
                .catch(error => {
                    console.log(error.response)
                    return res.status(400).send(error)
                })
        })
        .catch(error => { return res.status(400).send(error) })
});


module.exports = router;