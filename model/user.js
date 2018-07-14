let mongoose = require('mongoose');
let schema=new mongoose.Schema({
   username:{
       type:String,
       unique:true,
       required:[true,'用户名不能为空']
   },
   password:{
       type:String,
       required:[true,'密码不能为空']
   },
   age:{
       type:Number,
        min:[0,'年龄不得小于0'],
        max:[120,'年龄不得大于120'],
       default:10
   },
    //用户性质,0表示普通商家,100表示超级管理员
    role:{
       type:Number,
        default:0
    },
    created:{
       type:Date,
        default:Date.now()
    }

});

module.exports=mongoose.model('users',schema);