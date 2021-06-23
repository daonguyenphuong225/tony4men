const ProductModel = require('../../models/product/productSchema')
const ProducDetailtModel = require('../../models/product/producstDetail')
const CustomerModel = require('../../models/user/customer')
const OrderModel = require('../../models/user/orderSchema')
const OrderDetailModel = require('../../models/user/orderDetail')
const numeral = require("numeral");
const ProductColorModel = require('../../models/product/productColor')
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
exports.getList = async function (req, res) {
    let { status, sort } = req.query
    let perPage = 4;
    let page = req.query.page || 1;

    let match = {}
    if (sort == 1) {
        sort = { "createdAt": 1 }
    } else {
        sort = { "createdAt": -1 }
    }
    if (status) {
        match.status = status
    }
    let process1 = CustomerModel.find();
    let process2 = ProductColorModel.find();
    let customers = await process1
    let colors = await process2
    let orders = await OrderModel.find(match).sort(sort)
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .populate({ path: "customerId" })
        .populate({
            path: "orderDetailIds",
            populate: { path: "productDetailId" }
        });
        OrderModel.where(match).countDocuments((err, count) => {
            let rs = {
                customers: customers,
                orders: orders,
                colors: colors,
                numeral: numeral,
                dayjs: dayjs,
                match: req.query,
                sort:sort,
                current: page,
                pages: Math.ceil(count / perPage)
            }
            res.render('admin/cartInfo.ejs', rs)
        
           })
}

exports.updateCart = async function (req, res) {
    try {
        const { id, status } = req.body
        await OrderModel.updateOne({ _id: id }, { status: status })
        res.json("update thành công");
    } catch (error) {
        res.json(error.message)
    }
}
exports.canceledCart = async function (req, res) {
    try {
        const { id, status, orderDetails } = req.body

        for (const orderDetail of orderDetails) {
            let productDetail = await ProducDetailtModel.findOne({ _id: orderDetail.productDetailId })
            let producSize = productDetail.sizeIds
            objIndex = producSize.findIndex((obj => obj.size == orderDetail.size));
            producSize[objIndex].amount = producSize[objIndex].amount + parseInt(orderDetail.amount)
            await ProducDetailtModel.updateOne({ _id: orderDetail.productDetailId }, { sizeIds: producSize })
        }
        await OrderModel.updateOne({ _id: id }, { status: status })
        res.json("update thành công");
    } catch (error) {
        res.json(error.message)
    }
}

