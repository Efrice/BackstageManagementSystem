// 1、导入模块
const express = require('express')
const path = require('path')

// 2、创建Router
const studentRouter = express.Router()

// 3、导入控制器
const studentCtrl = require(path.join(__dirname,'../controllers/studentCtrl'))

// 4、Router分配任务
studentRouter.get('/list',studentCtrl.getListPage)
studentRouter.get('/add',studentCtrl.getAddPage)
studentRouter.post('/add',studentCtrl.add)
studentRouter.get('/edit/:studentId',studentCtrl.getEditPage)
studentRouter.post('/edit/:studentId',studentCtrl.edit)
studentRouter.get('/delete/:studentId',studentCtrl.deleteStudent)
studentRouter.get('/logout',studentCtrl.logout)

// 5、暴露
module.exports = studentRouter