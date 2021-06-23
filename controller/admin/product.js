const ProductModel = require('../../models/product/productSchema')
const ProductColortModel = require('../../models/product/productColor')
const ProducDetailtModel = require('../../models/product/producstDetail')
const numeral = require("numeral");
const CategoryModel = require('../../models/categoriesSchema')
const { fullTextSearch } = require('../../until/until')
const dayjs = require('dayjs')
const jwt = require('jsonwebtoken')
const bcryptjs = require('../../service/login');

exports.checkAccount = function(req,res,next){
  try {
      const token = req.cookies.token
      const ketqua = jwt.verify(token,'phuong225')
      if(ketqua){
          next()
      }
  } catch (error) {
     res.redirect('/login')
  }
}
exports.productList = async function (req, res) {
  try {
    let { name, categoryId, status, sort } = req.query
    let perPage = 3;
    let page = req.query.page || 1;

    if (sort == 1) {
      sort = { "name": 1 }
    }
    if (sort == 2) {
      sort = { "createdAt": -1 }
    }
    if (sort == 3) {
      sort = { "createdAt": 1 }
    }

    let match = {}

    if (name) {
      match.name = fullTextSearch(name)
    }

    if (status) {
      match.status = status
    }
    if (categoryId) {
      match.categoryId = categoryId
    }

    let process1 = CategoryModel.find()
    let process2 = ProductColortModel.find()
    let process3 = ProducDetailtModel.find()

    let categories = await process1
    let productColors = await process2
    let productDetails = await process3
    let products = await ProductModel.find(match).sort(sort)
      .skip((perPage * page) - perPage)
      .limit(perPage)

    ProductModel.where(match).countDocuments((err, count) => {
      let rs = {
        categories: categories,
        products: products,
        numeral: numeral,
        dayjs: dayjs,
        productDetails: productDetails,
        productColors: productColors,
        match: req.query,
        sort: sort,
        current: page,
        pages: Math.ceil(count / perPage)
      }
      res.render('admin/product/products.ejs', rs)
    })
  } catch (error) {
    res.json(error)
  }
}
exports.createForm = async function (req, res) {
  try {
    let categories = await CategoryModel.find()
    let products = await ProductModel.find().sort({"createdAt": -1})
    let productColors = await ProductColortModel.find()
    let rs = {
      categories: categories,
      products: products,
      productColors: productColors
    }
    res.render('admin/product/product-form.ejs', rs)
  } catch (error) {
    res.json(error)
  }
}
exports.createProduct = async function (req, res) {
  try {
    let categoryId = req.body.categoryId
    let data = await CategoryModel.findOne({_id:categoryId})
    let categoryParentId = data.parentId
    req.body.categoryParentId = categoryParentId
    let product = await ProductModel.create(req.body)
    await CategoryModel.updateOne(
      { _id: req.body.categoryId },
      { $addToSet: { productIds: product._id } }
    )
    res.json({ product: product, message: "Tạo sản phẩm thành công" })
  } catch (error) {
    res.json(error)
  }
}
exports.upload = async function (req, res, next) {

  const files = req.files
  if (!files) {
    const error = new Error('Please choose files')
    error.httpStatusCode = 400
    res.json(error)
  }
  res.json(files)

}

exports.createProductDetail = async function (req, res) {
  try {
    let data = req.body
    let productId = data.productId
    let colorId = data.color
    let pictures = data.img
    let sizeIds = []
    for (i = 0; i < 5; i++) {
      if (data.size[i] && data.amount[i]) {
        let sizeId = { size: data.size[i], amount: data.amount[i] }
        sizeIds.push(sizeId)
      }
    }
    let productDetail = await ProducDetailtModel.create({
      pictures: pictures,
      colorId: colorId,
      sizeIds: sizeIds
    })
    await ProductModel.updateOne(
      { _id: productId },
      { $addToSet: { productDetailIds: productDetail._id } }
    )
    if (productDetail) {
      res.render('admin/product/product-form-navigation.ejs')
    } else {
      res.json({ error: 'Lỗi' })
    }
  } catch (error) {
    res.json(error)

  }
}

exports.deleteProduct = async function (req, res) {
  try {
    await ProductModel.updateOne({ _id: req.body.id }, { status: req.body.status })
    res.json('ok')
  } catch (error) {
    res.json(error)
  }
}

exports.updateProductForm = async function (req, res) {
  try {
    let id = req.params.id

    let process1 = CategoryModel.find()
    let process2 = ProductModel.find()
    let process3 = ProductColortModel.find()
    let process4 = ProducDetailtModel.find()
    let categories = await process1
    let products = await process2
    let productColors = await process3
    let productDetails = await process4
    let rs = {
      categories: categories,
      products: products,
      productColors: productColors,
      productDetails: productDetails,
      id: id
    }
    res.render('admin/product/product-update.ejs', rs)
  } catch (error) {
    res.json(error)
  }
}