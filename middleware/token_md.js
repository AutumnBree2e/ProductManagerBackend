let crypto = require('lxj-crypto');
let config = require('../config');
let userService = require('../service/user');


// 用来判断当前的用户是否是合法认证的用户
// 具体做法：
//1. 从header中取token，如果没有，则直接拒绝
//2. 如果有token，则校验token的正确性，如果解码解密失败，则直接拒绝

//判断url是否是排除检查的url
function isExcludeUrl(url) {

    let excludeUrl=[
        /.*\/user\/login/,
        /.*\/user\/register/,
    ];
    //遍历数组,看当前的数组是否在其中
    let isExclude=false;
    excludeUrl.forEach(item=>{
        if(item.test(url)){
            isExclude=true;
        }
    });
    return isExclude;
}

module.exports=async(req,res,next)=>{
    //先判断当前url是否需要token验证,登陆和注册的窗口是不需要验证的
    if(!isExcludeUrl(req.url)){
        console.log(req.url);
        //从header中取出token
        let token =req.get('token');
        if(!token){
            throw Error('缺少token')
        }
        //对token进行解码,看是不是伪造的
        let tokenData;
        try {
            tokenData = JSON.parse(crypto.aesDecrypt(token, config.TokenKey));
        } catch (e) {
            //解码失败
            throw Error('token不合法');
        }
        //判断token是否过期
        if(tokenData.expire<Date.now()){
            throw Error('token过期,请重新登陆')
        }
        //根据tokenData中的username取出用户信息,为了给后续的请求使用
        let userInfo = await userService.getUserInfo(tokenData.username);
        //给req对象安装一个userInfo变量,为了给后面的中间件使用
        req.user=userInfo;
    }
    next();
};