// 1、导入模块
const xtpl = require("xtpl");
const path = require("path");
const dbtools = require(path.join(__dirname, "../tools/dbtools.js"));
const ObjectId = require("mongodb").ObjectId;

// 2、获取学生list
const getListPage = (req, res) => {
  const keyword = req.query.keyword || "";

  dbtools.findList("studentInfo", { name: { $regex: keyword } }, docs => {
    xtpl.renderFile(
      path.join(__dirname, "../views/list.html"),
      { studentsList: docs, keyword ,loginedName:req.session.usernameId},
      (err, content) => {
        if (err) throw err;
        res.send(content);
      }
    );
  });
};

// 3、获取学生add
const getAddPage = (req, res) => {
  xtpl.renderFile(
    path.join(__dirname, "../views/add.html"),
    {loginedName:req.session.usernameId},
    (err, content) => {
      if (err) throw err;
      res.send(content);
    }
  );
};

// 4、新增一个学生数据
const add = (req, res) => {
  console.log(req.body);
  dbtools.insertOne("studentInfo", req.body, result => {
    if (!result) {
      res.send("<script>alert('新增失败')</script>");
    } else {
      res.send(`<!DOCTYPE html>
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
         <script>location.href="/student/list"</script>
      </body>
      
      </html>`);
    }
  });
};

// 5、编辑一个学生数据
const getEditPage = (req, res) => {
  // console.log(req.params.studentId);
  const _id = ObjectId(req.params.studentId);
  // console.log(typeof _id);
  dbtools.findOne("studentInfo", { _id }, result => {
    xtpl.renderFile(
      path.join(__dirname, "../views/edit.html"),
      { studentInfo: result,loginedName:req.session.usernameId },
      (err, content) => {
        if (err) throw err;
        res.send(content);
      }
    );
  });
};

// 6、编辑上传一个学生数据
const edit = (req, res) => {
  // console.log(req.params.studentId);
  const _id = ObjectId(req.params.studentId);
  // console.log(typeof _id);
  // console.log(req.body);
  dbtools.updateOne("studentInfo", { _id }, req.body, result => {
    if (!result) {
      res.send("<script>alert('修改失败')</script>");
    } else {
      res.send(`<!DOCTYPE html>
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
         <script>location.href="/student/list"</script>
      </body>
      
      </html>`);
    }
  });
};

// 7、删除一个学生数据
const deleteStudent = (req, res) => {
  const _id = ObjectId(req.params.studentId);
  dbtools.deleteOne("studentInfo", { _id }, result => {
    if (!result) {
      res.send("<script>alert('删除失败')</script>");
    } else {
      res.send(`<!DOCTYPE html>
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
         <script>location.href="/student/list"</script>
      </body>
      
      </html>`);
    }
  });
};

// 退出
const logout = (req,res) => {
  req.session.usernameId = '';
  res.send(`<!DOCTYPE html>
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
      
      </html>`);
}
module.exports = {
  getListPage,
  getAddPage,
  add,
  getEditPage,
  edit,
  deleteStudent,
  logout
};
