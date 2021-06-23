const ProductModel = require('../../models/product/productSchema')
const ProducDetailtModel = require('../../models/product/producstDetail')
const ProductColor = require('../../models/product/productColor')
const CustomerModel = require('../../models/user/customer')
const OrderModel = require('../../models/user/orderSchema')
const OrderDetailModel = require('../../models/user/orderDetail')
const numeral = require("numeral");
const CategoryModel = require('../../models/categoriesSchema')
const { headerData } = require('./header')
const { fullTextSearch } = require('../../until/until')
const ProductColorModel = require('../../models/product/productColor')


// Trang HOME////
exports.homeList = async function (req, res) {
  try {
    let header = await headerData()
    let productDetails = await ProducDetailtModel.find()
    let products = await ProductModel.find().sort({ "createdAt": -1 }).populate({ path: "categoryId" }).populate({ path: "productDetailIds" });
    let rs = {
      ...header,
      products: products,
      numeral: numeral,
      productDetails: productDetails,
    }

    res.render('user/user.ejs', rs)
  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    })

  }
}

exports.getProducts = async function (req, res) {
  let id = req.body.id
  let products = await ProductModel.find({ "categoryId": id }).populate({ path: "productDetailIds" }).limit(8)
  let price = []
  for (const product of products) {
    let priceEdit = numeral(product.price).format('0,0')
    price.push(priceEdit)
  }

  res.json({ products: products, price: price })
}
// Trang HOME////


// Trang PRODUCT LIST////
exports.productList = async function (req, res) {
  try {
    let id = req.params.id
    let { color, size, price, sort } = req.query
    let perPage = 12;
    let page = req.query.page || 1;

    if (sort) {
      if (sort == 0) {
        sort = { "createdAt": -1 }
      }
      if (sort == 1) {
        sort = { "price": 1 }
      }
      if (sort == 2) {
        sort = { "price": -1 }
      }
    } else {
      sort = { "createdAt": -1 }
    }

    let match = {}

    if (price) {
      if (price == 0) {
        match.price = { $lt: 200000 };
      }
      if (price == 1) {
        match.price = []
        for (i = 200; i <= 500; i++) {
          match.price.push(i * 1000)
        }
      }
      if (price == 2) {
        match.price = []
        for (i = 500; i <= 1000; i++) {
          match.price.push(i * 1000)
        }
      }
      if (price == 3) {
        match.price = { $gt: 1000000 };
      }
    }

    let header = await headerData()
    let productColors = await ProductColor.find()
    let productFilter = await CategoryModel.findOne({ _id: id })
    let products = []
    if (productFilter.parentId == "") {
      match.categoryParentId = id
      products = await ProductModel.find({ categoryParentId: id }).populate({ path: "categoryId" }).populate({ path: "productDetailIds" });
    } else {
      match.categoryId = id
      products = await ProductModel.find({ categoryId: id }).populate({ path: "categoryId" }).populate({ path: "productDetailIds" });
    }
    let productDetailIds = []
    let productDetailIds2 = []
    let newProducts = []
    let newProducts2 = []
    let productIds1 = []
    let productIds2 = []
    if (size) {
      for (const product of products) {
        for (const productDetailId of product.productDetailIds) {
          productDetailId.sizeIds.find(function (post, index) {
            if (post.size == size)
              productDetailIds.push(productDetailId._id);
          });
        }
      }
      for (const productDetailId of productDetailIds) {
        for (const product of products) {
          for (const data of product.productDetailIds) {
            if (data._id == productDetailId) {

              newProducts.push(product._id)

            }
          }
        }
      }
      productIds1 = [...new Set(newProducts)];
    }
    if (color) {
      for (const product of products) {
        for (const productDetailId of product.productDetailIds) {
          if (productDetailId.colorId == color) {
            productIds2.push(product._id);
          }
        }
      }
    }
    if (color && typeof size == 'undefined') {
      match._id = productIds2
    }
    if (size && typeof color == 'undefined') {
      match._id = productIds1
    }
    if (color && size) {

      products2 = await ProductModel.find({ _id: productIds2 }).populate({ path: "productDetailIds" });

      for (const product2 of products2) {
        for (const productDetailId2 of product2.productDetailIds) {
          productDetailId2.sizeIds.find(function (post, index) {
            if (post.size == size)
              productDetailIds2.push(productDetailId2._id);
          });
        }
      }
      for (const productDetailId2 of productDetailIds2) {
        for (const product2 of products2) {
          for (const data2 of product2.productDetailIds) {
            if (data2._id == productDetailId2) {
              newProducts2.push(product2._id)
            }
          }
        }
      }
      match._id = [...new Set(newProducts2)];
    }

    products = await ProductModel.find(match).sort(sort)
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .populate({ path: "categoryId" }).populate({ path: "productDetailIds" });

    ProductModel.where(match).countDocuments((err, count) => {
      let rs = {
        ...header,
        products: products,
        numeral: numeral,
        productColors: productColors,
        filter: req.query,
        id: id,
        sort: sort,
        current: page,
        pages: Math.ceil(count / perPage)
      }
      res.render('user/products-list.ejs', rs)
    })
  }
  catch (error) {
    res.json(error)
  }
}
// Trang PRODUCT LIST////

// Trang PRODUCT DETAIL////
exports.getProductDetail = async function (req, res) {
  try {
    let id = req.params.id
    let header = await headerData()
    let productColors = await ProductColor.find()
    product = await ProductModel.findOne({ _id: id }).populate({ path: "categoryId" })
      .populate({
        path: "productDetailIds",
        populate: {
          path: "colorId",
        },
      });

    let rs = {
      ...header,
      product: product,
      numeral: numeral,
      productColors: productColors,
      id: id,
    }

    res.render('user/productDetail.ejs', rs)
  } catch (error) {
    console.log(error)
  }
}

exports.getSize = async function (req, res) {
  try {
    let productDetailId = req.body.productDetailId
    let productDetail = await ProducDetailtModel.findOne({ _id: productDetailId })
    let size = []
    for (const sizeId of productDetail.sizeIds) {
      size.push(sizeId.size)
    }
    res.json(size);
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })

  }
}
exports.amountCheck = async function (req, res) {
  try {
    let { productDetailId, size, amount } = req.body
    let productDetail = await ProducDetailtModel.findOne({ _id: productDetailId })
    let producSize = productDetail.sizeIds
    objIndex = producSize.findIndex((obj => obj.size == size));
    if (producSize[objIndex].amount - amount >= 0) {
      res.json(0)
    } else {
      res.json(1)
    }

  }
  catch (error) {
    res.json({
      success: false,
      message: error.message
    })

  }
}


// Trang PRODUCT DETAIL////

// Trang CART ////
exports.cartDetail = async function (req, res) {
  try {
    let header = await headerData()
    let rs = {
      ...header,
      numeral: numeral,
    }

    res.render('user/cart.ejs', rs)
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })

  }
}

exports.amountLastCheck = async function (req, res, next) {
  try {
    let order = req.body.order

    let i = 0
    for (const data of order) {

      let productDetail = await ProducDetailtModel.findOne({ _id: data.productDetailId })

      let producSize = productDetail.sizeIds
      objIndex = producSize.findIndex((obj => obj.size == data.size));
      if (producSize[objIndex].amount - data.amount >= 0) {
        i++
      }
    }
    if (i == order.length) {
      next()
    } else {
      res.json(0)
    }
  }
  catch (error) {
    res.json({
      success: false,
      message: error.message
    })

  }
}
exports.CreateCart = async function (req, res) {
  try {
    let { name, email, phone, address, order, note, totalPrice } = req.body
    if (!note) {
      note = "0"
    }
    let oldCustomer = await CustomerModel.findOne({ name: name, phone: phone })
    let customerId = ''
    if (oldCustomer) {
      await CustomerModel.updateOne({ _id: oldCustomer._id }, { address: address })
      customerId = oldCustomer._id
    } else {
      let newCustomer = await CustomerModel.create({
        name: name,
        phone: phone,
        email: email,
        address: address
      })

      customerId = newCustomer._id
    }
    let orderDetailIds = []
    let product = {}
    let color = {}
    let orderDetail = {}
    let productDetailId = ''
    for (const data of order) {
      product = await ProductModel.findOne({ _id: data.id }).populate({ path: "productDetailIds" });
      color = await ProductColorModel.findOne({ name: data.color });

      for (productDetail of product.productDetailIds) {
        if (productDetail.colorId == color._id) {
          productDetailId = productDetail._id
        }
      }
      orderDetail = await OrderDetailModel.create({
        productId: product._id,
        productName: product.name,
        productDetailId: productDetailId,
        unitPrice: data.price,
        size: data.size,
        amount: data.amount
      })
      orderDetailIds.push(orderDetail._id)
    }
    let newOrder = await OrderModel.create({
      customerId: customerId,
      orderDetailIds: orderDetailIds,
      status: 0,
      totalPrice: totalPrice,
      note: note
    })
    for (const data of order) {
      let productDetail = await ProducDetailtModel.findOne({ _id: data.productDetailId })
      let producSize = productDetail.sizeIds
      objIndex = producSize.findIndex((obj => obj.size == data.size));
      producSize[objIndex].amount = producSize[objIndex].amount - data.amount
      await ProducDetailtModel.updateOne({ _id: data.productDetailId }, { sizeIds: producSize })
      let ab = await ProducDetailtModel.findOne({ _id: data.productDetailId })
    }
    res.json(1)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }


}
// Trang CART ////


// Trang SEARCH ////
exports.search = async function (req, res) {
  try {
    let name = req.query.nameSearch
    let perPage = 12;
    let page = req.query.page || 1;

    let match = {}
    match.name = fullTextSearch(name)
    let header = await headerData()
    let productDetails = await ProducDetailtModel.find()
    let products = await ProductModel.find(match).sort({ "createdAt": -1 })
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .populate({ path: "categoryId" }).populate({ path: "productDetailIds" });
    ProductModel.where(match).countDocuments((err, count) => {
      let rs = {
        ...header,
        products: products,
        numeral: numeral,
        productDetails: productDetails,
        nameSearch: req.query.nameSearch,
        current: page,
        pages: Math.ceil(count / perPage)
      }
      res.render('user/search.ejs', rs)
    })


  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    })

  }
}


// Trang SEARCH ////

