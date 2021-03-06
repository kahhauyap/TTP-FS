const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const secretKey = "banana";

// Registration endpoint checks if user exists then creates an account if not
router.post("/register", (req, res) => {
    // Check the database to see if the email already exists
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        }

        // If email doesn't exist then create a new user
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        // Hash password before saving
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                    throw err;
                }
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
            });
        });
    });
});

// Login endpoint validates user and creates a session
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).send("Email not found");
        }
        // Compare the password with hash
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched so create payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign jwt token
                jwt.sign(payload, secretKey,
                    { expiresIn: 31556926 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
                req.session.user = email;
                req.session.balance = user.balance;

            } else { // Password didn't match so send error
                return res.status(400).send("Password didn't match!")
            }
        });
    });
});

// Logout endpoint destroys session
router.get("/logout", (req, res) => {
    if (req.session.user) {
        req.session.destroy();
    }
    return res.status(400);
})

// Authorization endpoint checks if user is logged in
router.get("/auth", (req, res) => {
    if (!req.session.user) {
        return res.status(401).send();
    }
    const userData = {
        user: req.session.user,
        balance: req.session.balance
    }
    return res.status(200).send(userData);
});

// @@@@@ Endpoint to retrieve user balance
router.get("/balance", (req, res, next) => {

    if (!req.session.user) {
        return res.status(401).send("Not logged in!");
    }

    User.findOne({ email: req.session.user }).then(user => {
        if (!user) {
            return res.status(400).send("User doesn't exist");
        }
        return res.status(200).send(user);
    })
});


module.exports = router;


