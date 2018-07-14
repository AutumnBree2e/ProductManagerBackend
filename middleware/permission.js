
//检查当前登陆的是商家还是管理员以便通过role属性来定义其权限

let role_permission=[
    //普通商家
    {
        role:0,
        permission:[
            /.*\/product/,
            /.*\/order/,
            /.*\/category/
        ]
    },
    //超级管理员
    {
        role:100,
        permission:[
            /.*/
        ]
    }
];
module.exports=(req,res,next)=>{
  //对req.user对象不为空才进行检查
    if(req.user){
        //取出user的role,然后遍历数组,判断对应的role的权限是否包含当前请求的url
        let canGo=false;
        role_permission.forEach(obj=>{
            if(req.user.role===boj.role){
                //遍历当前obj的permission,看看是否能够访问req.url
                obj.permission.forEach(p=>{
                    if(p.test(req.url)){
                        canGo=true;
                    }
                });
            }
        });
        if(!canGo){
            throw Error('用户当前权限不足');
        }

    }
    next();

};