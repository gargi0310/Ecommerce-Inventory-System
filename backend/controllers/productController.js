const Product = require('../modals/productModal');

//Insert item
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
        res.status(201).json({
            success:true,
            product
        })
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
} 


//get all Items
exports.getInventoryItems = async(req, res)=>{
    const products = await Product.find();

    res.status(201).json({
        success:true,
        products
    })
}

//delete Items
exports.removeItemFromInventory = async(req, res)=>{
    const {productId, productQuantity} = req.body;

    try{
        let product = await Product.findOne({productId});
        if(!product || product.productQuantity < productQuantity){
            return res.status(400).json({
                message:"Item not found or Insufficient Item"
            })
        }

        product.productQuantity -= productQuantity;
        if(product.productQuantity <= 0){
            await Product.findOneAndDelete({productId});
            return res.json({
                message:"Item Deleted Successfully"
            });
        }
        await product.save();
        res.json(product);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
}