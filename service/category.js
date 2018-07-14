let Category = require('../model/category');
let config = require('../config');


//添加一个分类
async function addCategory(category) {
   return await Category.create(category);
}

//按页显示分类
async function getCategoryByPage(page=1) {
    return await Category.find().skip(config.PageCount*(page-1)).limit(config.PageCount).sort('created').select('-__v');
}

//判断一个分类是否存在
async function isIdExist(id) {
    let res = await Category.findOne({_id:id});
    if(!res){
        throw Error(`编号为${id}的分类不存在`)
    }
}

//更新分类
async function updateCategory(id,update) {
    await isIdExist(id);
    let res = await Category.updateOne({_id:id},update);
    if(res.n<1){
        throw Error('更新失败')
    }
}
//删除分类
async function deleteCategory(id) {
    await isIdExist(id);
    let res = await Category.delete({_id:id});
    if (res.n<1){
        throw Error('删除失败');
    }
}

module.exports={
  deleteCategory,
  updateCategory,
    addCategory,
    getCategoryByPage
};