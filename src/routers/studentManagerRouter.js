const express = require('express')
const path = require('path')

const studentManagerRouter = express.Router()

const studentPage = require(path.join(__dirname,'../controllers/studentManagerCtrl'))
console.log(studentPage);
// Router分配任务
studentManagerRouter.get('/list',studentPage.getListPage)


module.exports = studentManagerRouter