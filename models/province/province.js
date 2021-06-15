const mongoose = require('mongoose')


var ProvinceSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    storeIds: []
},{collection:"province"});
var ProvinceModel = mongoose.model('province',ProvinceSchema)

module.exports = ProvinceModel;