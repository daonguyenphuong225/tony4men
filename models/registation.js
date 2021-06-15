const mongoose = require('mongoose')
var RegSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    }  
},{collection:'registation'});
var RegModel = mongoose.model('registation',RegSchema)

module.exports = RegModel;