const express = require('express');
const router = express.Router();
const ProductController = require('../../controller/admin/product');
const fileUploader  = require('../../models/CloudinaryModel')


router.get('/product-form',ProductController.checkAccount,ProductController.createForm)
router.get('/product-list',ProductController.checkAccount, ProductController.productList)
router.get('/product-list/:id',ProductController.checkAccount, ProductController.updateProductForm)
router.put('/product-list',ProductController.checkAccount, ProductController.deleteProduct)
router.post('/product-form',ProductController.checkAccount, ProductController.createProduct)
router.post('/product-detail',ProductController.checkAccount, ProductController.createProductDetail)
router.post('/product-upload',fileUploader.array('myFiles', 12), ProductController.upload)


module.exports = router