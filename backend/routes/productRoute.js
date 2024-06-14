const express = require('express');
const { addItemToInventory, getInventoryItems, removeItemFromInventory, updateProduct, getProductDetails } = require('../controllers/productController');
const router = express.Router();

router.route("/product/add").post(addItemToInventory);
router.route("/products/all").get(getInventoryItems);
router.route("/product/new").post(addItemToInventory);
router.route("/product/update/:id").put(updateProduct);
router.route("/product/getitem").get(getProductDetails);
router.route("/product/delete").delete(removeItemFromInventory);

module.exports = router;