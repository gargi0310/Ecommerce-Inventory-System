const Product = require('../modals/productModal');
const ErrorHandler = require('../utils/erroHandler');
const catchAsyncError = require("../middleware/catchAsyncError");

//Insert item
exports.addItemToInventory = catchAsyncError(async(req, res)=>{
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
});


//Get all Items
exports.getInventoryItems = catchAsyncError(async(req, res)=>{
    const products = await Product.find();

    res.status(201).json({
        success:true,
        products
    })
})


//update item
exports.updateProduct = catchAsyncError(async(req, res, next)=>{

    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Item not Found", 404));
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

});


//Get Product Details
exports.getProductDetails = catchAsyncError(async(req, res, next)=>{
    const {productId} = req.body;

    const product = await Product.findOne({productId});
    if(!product){
        return next(new ErrorHandler("Item not Found",404));
    }

    res.status(200).json({
        success:true,
        product
    })
    
});


//delete Items
exports.removeItemFromInventory = catchAsyncError(async(req, res, next)=>{
    const {productId, productQuantity} = req.body;

    try{
        let product = await Product.findOne({productId});
        if(!product || product.productQuantity < productQuantity){
            return next(new ErrorHandler("Item not Found or insufficient items", 404));
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
});