
const CategoryModel = require('../../models/categoriesSchema')

exports.headerData = async function () {
   try {
    let process1 =  CategoryModel.find()
    
    let process2 = CategoryModel.find({ parentId: '' })
    let categories = await process1
    let categoryParents = await process2
    let data = {
    categories: categories,
      categoryParents: categoryParents
    }
    
    return data
   } catch (error) {
        console.log(error); 
   }
  }