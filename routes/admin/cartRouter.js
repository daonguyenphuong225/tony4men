const express = require('express');
const router = express.Router();
const CartController = require('../../controller/admin/cart');


router.get('/cart-list',CartController.checkAccount,CartController.getList)
router.put('/cart-list',CartController.checkAccount,CartController.updateCart)
router.put('/cart-canceled',CartController.checkAccount,CartController.canceledCart)



module.exports = router