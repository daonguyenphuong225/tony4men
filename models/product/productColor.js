const mongoose = require('mongoose')
var ProductColorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    color:{
        type: String,
        required: true,
        trim: true
    }
},{collection:"productColor"});
var ProductColorModel = mongoose.model('productColor',ProductColorSchema)

module.exports = ProductColorModel;