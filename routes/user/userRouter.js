const express = require('express');
const router = express.Router();
const UserController = require('../../controller/user/user');



router.get('/',UserController.homeList)
router.get('/products/:id',UserController.productList)
router.get('/productDetail/:id',UserController.getProductDetail)
router.post('/get-size',UserController.getSize)
router.post('/check-amount',UserController.amountCheck)
router.get('/cartDetail',UserController.cartDetail)
router.post('/cartDetail',UserController.amountLastCheck,UserController.CreateCart)
router.post('/',UserController.getProducts)
router.get('/search',UserController.search)


module.exports = router