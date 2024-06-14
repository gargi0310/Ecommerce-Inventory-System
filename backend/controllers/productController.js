const Product = require('../modals/productModal');

//Insert item
exports.addItemToInventory = async(req, res)=>{
    const {productId,productDescription, productName, productPrice, productQuantity, productRating, images, productCategory, numOfReviews, reviews, createdAt} = req.body;

    try{
        let product = await Product.findOne({productId});
        if(product){
            product.productQuantity += productQuantity;
        }else{
            product = new Product({productId,productDescription, productName, productPrice, productQuantity,productRating, images, productCategory, numOfReviews, reviews, createdAt});
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

//update item
exports.updateProduct = async(req, res)=>{

    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    })

}

//Get Product Details
exports.getProductDetails = async(req, res)=>{
    const {productId} = req.body;

    const product = await Product.findOne({productId});
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Item not found"
        })
    }

    res.status(200).json({
        success:true,
        product
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
        if(product.productQuantity < 0){
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