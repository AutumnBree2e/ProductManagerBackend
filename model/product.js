const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    //名字
    name: {
        type: String,
        unique: true,
        required: [true, "商品名字不能为空"]
    } ,
    //价格
    price: {
        type: String,
        required: [true, "商品价格不能为空"]
    },
    //库存
    stock: {
        type: Number,
        default: 0
    },
    //描述
    description: {
        type: String
    },
    //是否上架
    isOnSale: {
        type: Boolean,
        default: true //默认是上架状态
    },
    //种类
    category: {
        type:  mongoose.Schema.Types.ObjectId,
        required: [true, "商品分类不能为空"]
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('', schema);