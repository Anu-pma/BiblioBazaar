const mongoose = require("mongoose");
const order = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "books",
    },
    book: {
        type: mongoose.Types.ObjectId,
        ref: "books",
    },
    status: {
        type: String,
        default: "Order Placed",
        enum:["Order Placed" , "Out for Delivery,Delivered,Canceled"],
    },
    total:{
        type:Number,
    }
  
},
    {timestamps: true} //sort orders based on time
);

module.exports = mongoose.model("order",order);