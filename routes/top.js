// Import dependencies
const express = require("express");
const router = express.Router();
require("dotenv").config();

// Test get
router.get("/", async (req, res) => {
    res.send("Hello world!");
});

// Test post
router.post("/", async (req, res) => {
    res.send("Hello world!");
});

module.exports = router;