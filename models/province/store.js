const mongoose = require('mongoose')


var StoreSchema = new mongoose.Schema({
    address:{
        type: String,
        required: true,
        trim: true
    },
    provinceId:{
        type: String,
        required: true,
        trim: true
    },
    status:Number
},{
    timestamps:true
},{collection:"store"});
var StoreModel = mongoose.model('store',StoreSchema)

module.exports = StoreModel;