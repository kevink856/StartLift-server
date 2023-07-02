// Import dependencies
const express = require("express");
const cors = require("cors");
const top = require("./routes/top.js");

const app = express();

app.use(express.json());
app.use(cors());

// Load the /posts routes
app.use("/top", top);

module.exports = app;