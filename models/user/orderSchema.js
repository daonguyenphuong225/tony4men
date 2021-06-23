const mongoose = require('mongoose')
var OrderSchema = new mongoose.Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers",
    },
    orderDetailIds:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "orderDetails",
    }],
    status:{
        type: Number,
        required: true,
        trim: true
    },
    totalPrice:{
        type: Number,
        required: true,
        trim: true
    },
    note:{
        type: String,
        required: true,
        trim: true
    },
   
},{
    timestamps: true
},{collection:"orders"});
var OrderModel = mongoose.model('orders',OrderSchema)

module.exports = OrderModel;