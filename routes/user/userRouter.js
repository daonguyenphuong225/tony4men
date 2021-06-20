const express = require('express');
const router = express.Router();
const UserController = require('../../controller/user/user');



router.get('/',UserController.homeList)
router.get('/products/:id',UserController.productList)
router.get('/productDetail/:id',UserController.getProductDetail)
router.post('/',UserController.getProducts)


module.exports = router