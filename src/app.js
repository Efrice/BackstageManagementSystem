// 1.0、导入express模块
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");

// 1.1、路由中间件
const accountRouter = require(path.join(__dirname, "routers/accountRouter.js"));
const studentRouter = require(path.join(__dirname, "routers/studentRouter.js"));

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


// 监控所有的请求
app.all("*", (req, res, next) => {
  if (req.url.includes("/account")) {
    next();
  } else {
    if (req.session.usernameId) {
      next();
    } else {
      res.send(`
        <!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>学生管理系统</title>
          <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
          <script src="/js/jquery.min.js"></script>
      </head>
      
      <body>
         <script>location.href="/account/login"</script>
      </body>
      
      </html>
      `);
    }
  }
});

// 解析
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// 4.0、分配路由
app.use("/account", accountRouter);
app.use("/student", studentRouter);

// 5.0、开启监听
app.listen(3000, "127.0.0.1", err => {
  if (err) throw err;
  console.log("start ok");
});
