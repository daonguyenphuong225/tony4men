const ProvinceModel = require('../../models/province/province')
const StoreModel = require('../../models/province/store')
const dayjs = require('dayjs')


exports.getProvince = async function (req, res) {
    try {
        let provinceId = req.query.provinceId
        let perPage = 4;
        let page = req.query.page ||1;
        let match = {}
        if (provinceId) {
            match.provinceId = provinceId
        }

        let process = ProvinceModel.find()
        let stores = await StoreModel.find(match)
        .skip((perPage * page) - perPage)
        .limit(perPage)
        let provinces = await process
        StoreModel.where(match).countDocuments((err, count) => {
            let rs = {
                stores: stores,
                provinces: provinces,
                match:req.query,
                dayjs: dayjs,
                current: page,
                pages: Math.ceil(count / perPage)
            }
            res.render('admin/province.ejs', rs)
           })
    } catch (error) {
        res.json("404");
    }
}
exports.createStore = async function (req, res) {
    try {
        let store = await StoreModel.create(req.body)
        await ProvinceModel.updateOne(
            { _id: req.body.provinceId },
            { $addToSet: { storeIds: store._id } }
        )

        res.json('Tạo cửa hàng thành công')

    } catch (error) {
        res.json("404");
    }
}
exports.updateStore = async function (req, res) {
    try {
        const id = req.body.id
        const address = req.body.address
        const status = req.body.status
        const provinceId = req.body.provinceId
        let update = { id: id, status: status }
        if (address) {
            update.address = address
        }
        if (provinceId) {
            update.provinceId = provinceId
        }

        await StoreModel.updateOne({ _id: id }, update)
        res.json('OK')

    } catch (error) {
        res.json(error);
    }
}