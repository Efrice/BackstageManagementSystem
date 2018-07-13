// 导入express模块
const express = require("express");
const path = require("path");

// 生成router
const accountRouter = express.Router();

// 导入控制器
const pageCtrl = require(path.join(
  __dirname,
  "../controllers/loginPageCtrl.js"
));

console.log(pageCtrl);

// 处理请求
// accountRouter.get('/login',(req,res)=>{
//     res.send({
//         status:200,
//         message: 'login ok'
//     })
// })

// 将请求交由给控制来处理，路由相当于是来分配任务
accountRouter.get("/login", pageCtrl.loginPage);
accountRouter.get("/vcode", pageCtrl.vcode);
accountRouter.get("/register", pageCtrl.registerPage);
accountRouter.post("/register", pageCtrl.register);
accountRouter.post("/login", pageCtrl.login);

// 暴露路由
module.exports = accountRouter;
