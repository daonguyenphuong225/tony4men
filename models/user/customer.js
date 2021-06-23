const mongoose = require('mongoose')
var CustomerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    phone:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    address:{
        type: String,
        required: true,
        trim: true
    },
},{
    timestamps: true
},{collection:"customers"});
var CustomerModel = mongoose.model('customers',CustomerSchema)

module.exports = CustomerModel;