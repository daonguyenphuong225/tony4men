const express = require('express');
const router = express.Router();
const UserController = require('../controller/admin/order');



router.get('/products',UserController.loginUserForm)
router.get('/cart',UserController.cartForm)
router.post('/cart',UserController.CreateCart)



module.exports = router