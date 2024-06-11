const express = require('express');
const { addItemToInventory, getInventoryItems } = require('../controllers/productController');
const router = express.Router();

router.route("/products/add").post(addItemToInventory);
router.route("products/all").get(getInventoryItems);

module.exports = router;