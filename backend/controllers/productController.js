const Product = require('../modals/productModal');


exports.addItemToInventory = async(req, res)=>{
    const {productId, productName, productPrice, productQuantity} = req.body;

    try{
        let product = await Product.findOne({productId});
        if(product){
            product.productQuantity += productQuantity;
        }else{
            product = new Product({productId, productName, productPrice, productQuantity});
        }
        await product.save();
        res.json(product);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
} 

exports.getInventoryItems = async(req, res)=>{
    res.status(200).json({message:"Route is working fine"});
}