let Order = require('../model/order');
let productService = require('../service/product');
let config = require('../config');
let Big = require('big.js');




async function addOrder(order) {
    //判断是否存在商品的id
    let p = await productService.getProductById(order.productId);
    //库存判断
    if(p.stock<order.count){
        throw Error('库存不足')
    }
    //给order的字段进行复制 以防传数据的时候被篡改
    order.productName=p.name;
    order.productPrice=p.price;
    order.totalPrice=Big(order.productPrice).times(order.price);
    let o = await Order.create(order);

    //改变剩下将库存的数量
    await productService.updateProduct(p._id,{stock:p.stock-order.count});


    return o;


}



async function getOrderByPage(page=1) {
       return await Order.find().skip(config.PageCount*(page-1)).limit(config.PageCount).sort('created').select('-__v');
}


module.exports={
  addOrder,
  getOrderByPage
};