let Product = require('../model/product');
let config = require('lxj-crypto');

//添加一个商品
async function addProduct(product) {
    return await Product.create(product);
}

//按页显示商品
async function getProductByPage(page=1) {
    return await Product.find().skip(config.PageCount*(page-1)).limit(config.PageCount).sort('created').select('-__v');
}

//判断一个商品是否存在
async function isIdExist(id) {
    let res = await Product.findOne({_id:id});
    if(!res){
        throw Error(`编号为${id}的商品不存在`)
    }
}

//更新商品
async function updateProduct(id,update) {
    await isIdExist(id);
    let res = await Product.updateOne({_id:id},update);
    if(res.n<1){
        throw Error('更新失败')
    }
}
//删除商品
async function deleteProduct(id) {
    await isIdExist(id);
    let res = await Product.delete({_id:id});
    if (res.n<1){
        throw Error('删除失败');
    }

}

async function getProductById(id) {
    await isIdExist(id);
    return await Product.findOne({_id:id});
}

module.exports={
    deleteProduct,
    updateProduct,
    addProduct,
    getProductByPage,
    getProductById
};