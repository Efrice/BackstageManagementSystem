// 1、导入模块
const path = require("path");
const captchapng = require("captchapng");
const dbtools = require(path.join(__dirname, "../tools/dbtools.js"));

// 2、加载登录页面
const loginPage = (req, res) => {
  //   console.log("loginPage ok");
  res.sendFile(path.join(__dirname, "../views/login.html"));
};

// 3、加载图片
const vcode = (req, res) => {
  const random = parseInt(Math.random() * 9000 + 1000);
  req.session.vcode = random;
  const p = new captchapng(80, 30, random); // width,height,numeric captcha
  p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
  p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
  let img = p.getBase64();
  let imgbase64 = new Buffer(img, "base64");
  res.writeHead(200, {
    "Content-Type": "image/png"
  });
  res.end(imgbase64);
};

// 4、加载注册页面
const registerPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/register.html"));
};

// 5、注册
const register = (req, res) => {
  let result = {
    status: 0,
    msg: "注册成功"
  };
  // 解构赋值
  const { userName } = req.body;
  dbtools.findOne("accountInfo", { userName }, doc => {
    if (doc) {
      result.status = 1;
      result.msg = "用户名存在";
      res.send(result);
      return;
    } else {
      dbtools.insertOne("accountInfo", req.body, result1 => {
        console.log("插入数据库" + result1);
        if (!result1) {
          result.status = 2;
          result.msg = "注册失败";
          res.send(result);
          return;
        }
        res.send(result);
      });
    }
  });
};

// 6、登录
const login = (req, res) => {
  let result = {
    status: 0,
    msg: "登录成功"
  };
  // 解构赋值
  const { userName, password, vcode } = req.body;
  // console.log(vcode);
  if (vcode != req.session.vcode) {
    result.status = 1;
    result.msg = "验证码错误";
    res.json(result);
    return;
  } else {
    dbtools.findOne("accountInfo", { userName, password }, doc => {
      if (!doc) {
        result.status = 2;
        result.msg = "用户名或密码错误";
        res.json(result);
        return;
      }
      req.session.usernameId = userName
      res.json(result);
    });
  }
};

module.exports = {
  loginPage,
  vcode,
  registerPage,
  register,
  login
};
