const express = require('express');
const { addItemToCart } = require('../controllers/cartController');
const router = express.Router();


router.route("/new").post(addItemToCart);

module.exports = router;