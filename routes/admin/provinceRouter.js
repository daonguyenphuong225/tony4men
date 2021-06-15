const express = require('express');
const router = express.Router();
const ProvinceController = require('../../controller/admin/province');




router.get('/province-list',ProvinceController.getProvince)
router.post('/province-list',ProvinceController.createStore)
router.put('/province-list',ProvinceController.updateStore)




module.exports = router