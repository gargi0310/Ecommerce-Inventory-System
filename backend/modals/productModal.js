const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId:{
        type:String,
        required:[true, "Enter Product Id"],
        unique:true
    },
    productName : {
        type:String,
        required:[true, "Enter Product Name"],
    },
    productPrice:{
        type:Number,
        required:[true, "Enter Product Price"]
    },
    productQuantity:{
        type:Number,
        required:[true, "Enter Product Quantity"]
    }
    
})

module.exports = mongoose.model('Product', productSchema);