// Import dependencies
const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const validator = require("email-validator");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: "postgres",
    password: process.env.PASS,
    port: 5432,
});

// Handle Sign Up Request
router.post("/signup", async (req, res) => {
    if(!validator.validate(req.body.email)) {
        res.send("bademail");
    } else {
        pool.query({ text: "SELECT * FROM users WHERE email = $1",
            values: [req.body.email], }, (error, response) => {
            if(response.rows.length > 0) {
                res.send("exists");
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        pool.query("INSERT INTO users VALUES($1, $2)",
                            [req.body.email, hash], (error, response) => {
                            res.send("success");
                        });
                    });
                });
            }
        });
    }
});

// Handle Log In Request
router.post("/login", async (req, res) => {
    if(!validator.validate(req.body.email)) {
        res.send("bademail");
    } else {
        pool.query({ text: "SELECT * FROM users WHERE email = $1",
            values: [req.body.email], }, (error, response) => {
            if(response.rows.length > 0) {
                bcrypt.compare(req.body.password, response.rows[0].password)
                .then(result => {
                    result ? res.send("success") : res.send("fail");
                });
            } else {
                res.send("fail");
            }
        });
    }
});

module.exports = router;