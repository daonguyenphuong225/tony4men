const mongoose = require('mongoose')
var orderSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    phone:Number,
    address:{
        type: String,
        required: true,
        trim: true
    },
    note:{
        type: String,
        required: true,
        trim: true
    },
    totalPrice:Number,
    orderDetail: Array,
    status:{
        type:Number,
        default:0
    }
},{
    timestamps: true
});
var OrderModel = mongoose.model('order',orderSchema)

module.exports = OrderModel;