const express = require('express');
const app = express();

app.use(express.json());

//Route Importing
const product = require("./routes/productRoute");


//use
app.use("/ims", product);

module.exports = app;
