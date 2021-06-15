const mongoose = require('mongoose')
var ProductDetailSchema = new mongoose.Schema({
    pictures:[],
    colorId:String,
    sizeIds:[{
        size:String,
        amount:Number
    }]
},{collection:"productDetail"});
var ProducDetailtModel = mongoose.model('productDetail',ProductDetailSchema)

module.exports = ProducDetailtModel;