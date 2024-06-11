const express = require('express');
const { addItemToCart } = require('../controllers/cartController');
const router = express.Router();


router.route("/cart/new").post(addItemToCart);