let orderService = require('../service/order');
let router = require('express').Router();


router.get('/',async(req,res)=>{
    let r = await orderService.getOrderByPage(req.query.page);
    res.success(r);
});

router.post('/',async(req,res)=>{
    let r = await orderService.addOrder(req.body);
    res.success(r);
});

module.exports=router;
