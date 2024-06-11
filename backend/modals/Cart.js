const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    customerId:{
        type:String, 
        required:[true, "Please Enter CustomerId"]
    },

    items:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product'
            },
            productQuantity:{
                type:Number,
                required:true
            }
        }
    ]
});

module.exports = mongoose.model('Cart', CartSchema);