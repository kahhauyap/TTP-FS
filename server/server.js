const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const app = express();

//Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//mLab MongoDB database
const mongoDB = 'mongodb://mongodb:password1@ds125673.mlab.com:25673/stocks';

//Connect to MongoDB
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Set port to 3001 if no other port specified
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})