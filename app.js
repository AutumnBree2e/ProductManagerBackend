 require('./db');
require('express-async-errors') ; //需要放在最前面引入
 let express = require('express');
 let bodyParser = require('body-parser');
 let morgin = require('morgan');
 let config = require('./config');
 let util = require('./util/router_util');
 let app = express();

 //注册日志中间件
 app.use(morgin('combined'));
 //注册body-parser中间件
 app.use(bodyParser.json());


 // //注册自定义中间件
 app.use(require('./middleware/res_md'));
 //token 认证
 app.use(require('./middleware/token_md'));
 //权限校验
 app.use(require('./middleware/permission'));
 //注册路由
 app.use('/user',require('./router/user'));
 app.use('/product',require('./router/product'));
 app.use('/order',require('./router/order'));
 app.use('/category',require('./router/category'));



 //异常处理中间件
 app.use((err,req,res,next)=>{
     res.send({
         code: -1,
         msg: err.toString()
     })
 });
 app.listen(config.PORT);






