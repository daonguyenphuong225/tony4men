
const CategoryModel = require('../../models/categoriesSchema')
const {fullTextSearch} = require('../../until/until')

const dayjs = require('dayjs')
const jwt = require('jsonwebtoken')

const bcryptjs = require('../../service/login');


exports.admin = function (req, res) {
    res.render('admin/admin.ejs')
}


exports.getList = async function (req, res) {
   try {
   
   let {name,parentId,status,sort}= req.query
   let perPage = 4;
   let page = req.query.page ||1;

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
    if (parentId) {
        match.parentId = parentId
    }
    let process = CategoryModel.find({parentId: ''})
    let categories = await CategoryModel.find(match).sort(sort)
    .skip((perPage * page) - perPage)
    .limit(perPage)
    let categoryParent = await process
    CategoryModel.where(match).countDocuments((err, count) => {
    let rs = {
        categories: categories,
        categoryParent: categoryParent,
        match:req.query,
        sort:sort,
        dayjs: dayjs,
        current: page,
        pages: Math.ceil(count / perPage)
    }
    res.render('admin/categories.ejs', rs)

   })
    } catch (error) {
        res.json(error);
   }
}


exports.create = async function (req, res) {
    try {
        let { name, status, parentId } = req.body 

        if(parentId){
            let checkParentStatus = await CategoryModel.findOne({_id: parentId })
            if(checkParentStatus.status == 1){
            status = 1
            }
        }
            await CategoryModel.create({ name: name, status: status,parentId: parentId })
        
       
        res.json("Tạo danh mục thành công");
    } catch (error) {
        res.json("Tạo danh mục thất bại");
    }
}

exports.update = async function (req, res) {
    try {
        const id = req.body.id
        const name = req.body.name
        const status = req.body.status
        const parentId = req.body.parentId
        let update = {id:id, status:status}
        if(name){
            update.name = name
        }
        if(parentId){
            update.parentId = parentId
        }

        let checkParent = await CategoryModel.updateMany({parentId:id},{status:status})
        let data = await CategoryModel.updateOne({_id:id },update)
        res.json("ok");
    } catch (error) {
        res.json('Thất bại');
    }
}

