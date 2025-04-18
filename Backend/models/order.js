const mongoose = require("mongoose");
const order = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    items:[
        {
            book: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "books",
            },
            quantity:{
                type:Number,
                default:1
            },
            price:{
                type:Number,
                required:true
            }
            
        }
    ],
    status: {
        type: String,
        default: "Order Placed",
        enum:["Order Placed" , "Out for Delivery","Delivered","Canceled"],
    },
    total:{
        type:Number,
        required:true
    }
  
},
    {timestamps: true} //sort orders based on time
);

module.exports = mongoose.model("order",order);