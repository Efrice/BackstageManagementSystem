// 1、导入express模块
const express = require("express");
const path = require("path");

// 2、生成router
const accountRouter = express.Router();

// 3、导入控制器
const accountCtrl = require(path.join(
  __dirname,
  "../controllers/accountCtrl.js"
));

// 4、将请求交由给控制来处理，路由相当于是来分配任务
accountRouter.get("/login", accountCtrl.loginPage);
accountRouter.get("/vcode", accountCtrl.vcode);
accountRouter.get("/register", accountCtrl.registerPage);
accountRouter.post("/register", accountCtrl.register);
accountRouter.post("/login", accountCtrl.login);

// 5、暴露路由
module.exports = accountRouter;
