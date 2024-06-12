const mongoose = require('mongoose');
const Cart = require('../modals/Cart');
const Product = require('../modals/productModal');

exports.addItemToCart = async (req, res) => {
    const { customerId, items } = req.body;

    // Log the incoming request body
    console.log('Request Body:', req.body);

    try {
        let cart = await Cart.findOne({ customerId });

        // Log the found cart or new cart creation
        console.log('Found or Created Cart:', cart);

        if (!cart) {
            cart = new Cart({ customerId, items: [] });
        }

        for (const item of items) {
            const { productId, productQuantity } = item;

            // Check if productQuantity is a valid number
            if (isNaN(productQuantity)) {
                return res.status(400).json({ message: "Invalid product quantity" });
            }

            // Ensure productQuantity is a number
            const quantity = Number(productQuantity);

            // Find product by custom productId
            let product = await Product.findOne({ productId });

            // Log the found product
            console.log('Found Product:', product);

            if (!product) {
                return res.status(400).json({ message: `Product not found: ${productId}` });
            }

            if (product.productQuantity < quantity) {
                return res.status(400).json({ message: `Insufficient quantity for product: ${productId}` });
            }

            const itemIndex = cart.items.findIndex(item => item.productId === productId);

            if (itemIndex > -1) {
                cart.items[itemIndex].productQuantity += quantity;
            } else {
                cart.items.push({ productId, productQuantity: quantity });
            }

            product.productQuantity -= quantity;

            // Save the updated product
            await product.save();
        }

        // Save the updated cart
        await cart.save();

        // Log the final cart
        console.log('Final Cart:', cart);

        res.json({ success: true, cart });
    } catch (err) {
        console.error('Error occurred:', err);
        res.status(500).send('Internal Server Error');
    }
};
