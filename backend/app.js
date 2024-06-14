const express = require('express');
const app = express();
const errorMiddleware = require("./middleware/error")

app.use(express.json());

//Route Importing
const product = require("./routes/productRoute");
const cart = require("./routes/cartRoute");

//use
app.use("/ims", product);
app.use("/ims/cart", cart);


//Middleware
app.use(errorMiddleware);


module.exports = app;
