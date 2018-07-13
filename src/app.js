// 1.0、导入express模块
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
// 1.1、路由中间件
const accountRouter = require(path.join(__dirname, "routers/accountRouter.js"));
const studentManagerRouter = require(path.join(__dirname, "routers/studentManagerRouter.js"));

// 2.0、创建app
const app = express();

// 3.0、加载静态资源
app.use(express.static(path.join(__dirname, "statics")));

// Use the session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
  })
);

// 解析
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// 4.0、分配路由
app.use("/account", accountRouter);
app.use("/studentManager", studentManagerRouter);

// 5.0、开启监听
app.listen(3000, "127.0.0.1", err => {
  if (err) throw err;
  console.log("start ok");
});
