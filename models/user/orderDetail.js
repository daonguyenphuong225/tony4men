const mongoose = require('mongoose')
var OrderDetailSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: true,
        trim: true
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
    },
    productDetailId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "productDetail",
    },
    unitPrice:{
        type: Number,
        required: true,
        trim: true
    },
   
    size:{
        type: String,
        required: true,
        trim: true
    }, 
    amount:{
        type: Number,
        required: true,
        trim: true
    },
   
},{collection:"orderDetails"});
var OrderDetailModel = mongoose.model('orderDetails',OrderDetailSchema)

module.exports = OrderDetailModel;