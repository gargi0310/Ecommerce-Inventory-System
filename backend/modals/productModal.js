const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId:{
        type:String,
        required:[true, "Enter Product Id"],
        unique:true
    },
    productDescription:{
        type:String,
        require:[true, "Please Enter product Description"]
    },
    productName : {
        type:String,
        required:[true, "Enter Product Name"],
        trim:true
    },
    productPrice:{
        type:Number,
        required:[true, "Enter Product Price"]
    },
    productQuantity:{
        type:Number,
        required:[true, "Enter Product Quantity"],
        maxLength:[4, "Quantity cannot exceed 4 characters"],
        default:1
    },
    productRating:{
        type:Number,
        default: 0
    },
    images:[
        {
            public_id:{
                type:String,
                require:true
            },
            url:{
                type:String,
                require:true
            }
        }
    ],
    productCategory:{
        type:String,
        required:[true, "Please enter product Category"],
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String, 
                required:true
            },
            
            rating:{
                type:Number,
                require:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);