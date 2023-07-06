// Import dependencies
const express = require("express");
const cors = require("cors");
const main = require("./routes/main.js");

const app = express();

app.use(express.json());
app.use(cors());

// Load the /posts routes
app.use("/", main);

module.exports = app;