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
    productDetailIds:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "productDetail",
    }],
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
    },
    categoryParentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
    }
},{
    timestamps: true
},{collection:"products"});
var ProductModel = mongoose.model('products',ProductSchema)

module.exports = ProductModel;