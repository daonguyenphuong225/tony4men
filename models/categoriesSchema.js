const mongoose = require('mongoose')


var CategorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: Number,
        required: true,
        trim: true
    },
    productIds: [],
    parentId: String   
},
{
    timestamps:true
},{collection:"category"});
var CategoryModel = mongoose.model('category',CategorySchema)

module.exports = CategoryModel;