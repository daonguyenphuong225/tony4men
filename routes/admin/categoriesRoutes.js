const express = require('express');
const router = express.Router();
const CategoryController = require('../../controller/admin/category');




router.get('/admin',CategoryController.checkAccount,CategoryController.admin)
router.get('/category-list',CategoryController.checkAccount,CategoryController.getList)
router.post('/category-list',CategoryController.checkAccount,CategoryController.create)

router.put('/category-list',CategoryController.checkAccount,CategoryController.update)





module.exports = router