const axios = require('axios');
const express = require("express");
const router = express.Router();

const link = "https://api.iextrading.com/1.0/stock/aapl/quote";
const symbol = "aapl";

// Fetch from IEX API
router.get("/stocks", (req, res, next) => {
    axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/quote`)
        .then(response => res.send(response.data))
        .catch(error => next(error));
});

module.exports = router;