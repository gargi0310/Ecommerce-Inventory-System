const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId:{
        type:String,
        required:true
    },
    productName : {
        type:String,
        required:true,
    },
    productPrice:{
        type:Number,
        required:true
    },
    productQuantity:{
        type:Number,
        required:true
    }
    
})

module.exports = mongoose.model('Product', productSchema);