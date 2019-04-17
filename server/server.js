const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const passport = require("passport");
var cors = require('cors')
const users = require("./routes/users");
const stocks = require("./routes/stocks");
const session = require("express-session");
const app = express();

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// mLab MongoDB database
const mongoDB = 'mongodb://mongodb:password1@ds125673.mlab.com:25673/stocks';

// Connect to MongoDB
mongoose.connect(mongoDB, { useNewUrlParser: true });

// Passport middleware
app.use(passport.initialize());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

// Passport config
require("./passport")(passport);

// Routes
app.use("/users", users);
app.use("/api", stocks);

// Set port to 3001 if no other port specified
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})