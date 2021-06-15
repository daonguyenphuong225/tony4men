const mongoose = require('mongoose')
var ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true,
        trim: true
    },
    status:{
        type: String,
        required: true,
        trim: true
    },
    productDetailIds:[],
    categoryId:{
        type: String,
        required: true,
        trim: true
    }
},{
    timestamps: true
},{collection:"product"});
var ProductModel = mongoose.model('product',ProductSchema)

module.exports = ProductModel;