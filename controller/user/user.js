const ProductModel = require('../../models/product/productSchema')
const ProducDetailtModel = require('../../models/product/producstDetail')
const ProductColor = require('../../models/product/productColor')
const numeral = require("numeral");
const CategoryModel = require('../../models/categoriesSchema')
const { fullTextSearch } = require('../../until/until')



exports.homeList = async function (req, res) {
  try {
    let process1 = ProducDetailtModel.find()
    let process2 = CategoryModel.find({ parentId: '' })
    let productDetails = await process1
    let categoryParents = await process2
    let categories = await CategoryModel.find().populate({
      path: "productIds",
      populate: {
        path: "productDetailIds",

      },
    });

    let products = await ProductModel.find().sort({ "createdAt": -1 }).populate({ path: "categoryId" }).populate({ path: "productDetailIds" });

    let rs = {
      categories: categories,
      categoryParents: categoryParents,
      products: products,
      numeral: numeral,
      productDetails: productDetails,
    }

    res.render('user/user.ejs', rs)
  }
  catch (error) {
    res.json(error)
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

    let process2 = CategoryModel.find({ parentId: '' })
    let process3 = CategoryModel.find()
    let process4 = ProductColor.find()
    let categoryParents = await process2
    let categories = await process3
    let productColors = await process4

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
        categories: categories,
        categoryParents: categoryParents,
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

exports.getProductDetail = async function (req, res) {
  try {
    let id = req.params.id
    let process2 = CategoryModel.find({ parentId: '' })
    let process3 = CategoryModel.find()
    let process4 = ProductColor.find()
    let categoryParents = await process2
    let categories = await process3
    let productColors = await process4
    product = await ProductModel.findOne({ _id: id }).populate({ path: "categoryId" })
      .populate({
        path: "productDetailIds",
        populate: {
          path: "colorId",
        },
      });
    let sizes = []
    let arrange =[]
    for (const ProductDetail of product.productDetailIds) {
      for (const data of ProductDetail.sizeIds) {
        arrange.push(data.size)
      }
    }
    sizes = [...new Set(arrange)];
    

    let rs = {
      categories: categories,
      categoryParents: categoryParents,
      product: product,
      numeral: numeral,
      productColors: productColors,
      id: id,
      sizes: sizes
    }

    res.render('user/productDetail.ejs', rs)
  } catch (error) {
    console.log(error)
  }
}