const express = require('express');
const router = express.Router();
const CategoryController = require('../../controller/admin/category');




router.get('/admin',CategoryController.admin)
router.get('/category-list',CategoryController.getList)
router.post('/category-list',CategoryController.create)

router.put('/category-list',CategoryController.update)





module.exports = router