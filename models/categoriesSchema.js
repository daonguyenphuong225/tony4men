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
    productIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
    }],
    parentId: String
},
{
    timestamps:true
},{collection:"categories"});
var CategoryModel = mongoose.model('categories',CategorySchema)

module.exports = CategoryModel;