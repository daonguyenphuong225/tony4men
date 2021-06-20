const mongoose = require('mongoose')
var ProductDetailSchema = new mongoose.Schema({
    pictures:[{type: String }],
    colorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "productColor",
    },
    sizeIds:[{
        size:String,
        amount:Number
    }]
},{collection:"productDetail"});
var ProducDetailtModel = mongoose.model('productDetail',ProductDetailSchema)

module.exports = ProducDetailtModel;