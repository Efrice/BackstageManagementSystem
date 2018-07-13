const express = require("express");
const path = require("path");
const captchapng = require("captchapng");
const MongoClient = require("mongodb").MongoClient;

// Connection URL
const url = "mongodb://localhost:27017";
// Database Name
const dbName = "mongo-one";

// 加载登录页面
const loginPage = (req, res) => {
  //   console.log("loginPage ok");
  res.sendFile(path.join(__dirname, "../views/login.html"));
};

// 加载图片
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

// 加载注册页面
const registerPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/register.html"));
};

// 注册
const register = (req, res) => {
  let result = {
    status: 0,
    message: "注册成功"
  };
  // 解构赋值
  const { userName } = req.body;
  // console.log(req.body);
  // console.log(userName);

  // Use connect method to connect to the server
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      const db = client.db(dbName);
      const collection = db.collection("accountInfo");
      collection.findOne({ userName: userName }, (err, doc) => {
        if (doc) {
          result.status = 1;
          result.message = "用户名存在";
          // console.log("用户名存在");
          client.close();
          res.json(result);
          return;
        } else {
          // console.log(req.body);
          collection.insertOne(req.body, (err, result1) => {
            if (!result1) {
              result.status = 2;
              result.message = "注册失败";
            }
          });
        }
        client.close();
        res.json(result);
      });
    }
  );
};

// 登录
const login = (req, res) => {
  let result = {
    status: 0,
    message: "登录成功"
  };
  // 解构赋值
  const { userName, password, vcode } = req.body;
  console.log(vcode);
  console.log({userName,password,vcode});
  if (vcode != req.session.vcode) {
    result.status = 1;
    result.message = "验证码错误";
    res.json(result);
    return;
  } else {
    // Use connect method to connect to the server
    MongoClient.connect(
      url,
      { useNewUrlParser: true },
      function(err, client) {
        const db = client.db(dbName);
        const collection = db.collection("accountInfo");
        collection.findOne(
          { userName: userName, password: password },
          (err, doc) => {
            console.log(doc);
            if (!doc) {
              result.status = 2;
              result.message = "用户名或密码错误";
              console.log("用户名或密码错误");
            }
            client.close();
            res.json(result);
          }
        );
      }
    );
  }
};

module.exports = {
  loginPage,
  vcode,
  registerPage,
  register,
  login
};
