const Cart = require('../modals/Cart');
const Product = require('../modals/productModal');

exports.addItemToCart = async (req, res) => {
    const { customerId, productId, productQuantity } = req.body;

    try {
        let product = await Product.findOne({ productId });

        if (!product || product.productQuantity < productQuantity) {
            return res.json({
                message: "Insufficient Products"
            });
        }

        let cart = await Cart.findOne({ customerId });
        if (!cart) {
            cart = new Cart({ customerId, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].productQuantity += productQuantity;
        } else {
            cart.items.push({ productId, productQuantity });
        }

        product.productQuantity -= productQuantity;
        await product.save();
        await cart.save();

        res.json({
            success: true,
            cart
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
};
