let User= require('../model/user');
let crypto = require('lxj-crypto');
let config = require('../config');

//获取用户信息
async function getUserInfo(username) {
    let res = await User.findOne({username:username}).select('-__v-password');
    if (!res){
        throw Error(`用户名为${username}的用户不存在`);
    }
    return res;
}

/*
* 判断用户是否存在
* */
async function isUserExist(username) {
    let res = await User.findOne({username:username});
    if (!res){
        throw Error(`用户名为${username}的用户不存在`);
    }
}


//删除用户
async function deleteUser(username) {
    isUserExist(username);
    let res = await User.delete({username:username});
    // res: {n:1, mModify:1, ok: 1}
    if(res.n<1){
        throw Error('删除用户失败');
    }
}

//注册   user: { username: xxx, password: xx, age: 11, role: 100}
async function registerUser(user) {
    //判断用户名是否已被使用
    let res = await User.findOne({username:user.username});
    if (res){
        throw Error(`用户名为${username}的用户已经存在`);
    }
    user.password=crypto.sha1Hmac(user.password,user.username);
    user.role=0;
    user.created=Date.now();
    //创建并存储
    res = await User.create(user);
    //密码已经存储  需要重置
    res.password='';
    return res;
}

//登陆  user: { username: xxx, password: xx}
async function loginUser(user) {
    //对密码进行加密
    user.password=crypto.sha1Hmac(user.password,user.username);
    //去数据库查询看用户是否存在
    let res = await User.findOne({username: user.username, password: user.password});
    if (!res) {
        throw Error("用户名或者密码错误")
    }
    //给用户生成一个token,可以用aes算法生成
    let tokenData={
        username:user.username,
        expire:Date.now()+config.TokenExpire
    };
    let token=crypto.aesEncrypt(JSON.stringify(tokenData),config.TokenKey);
    return token;
}

module.exports={
    registerUser,
    getUserInfo,
    loginUser,
    deleteUser
};
