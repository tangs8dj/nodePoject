/**
 *  studentManager
 *  学生管理页面 
 *  
 */
// 导包
const path = require('path');
const express = require('express');

// 创建路由对象
const managerRouter = express.Router();

// 连接二级路由路径
const managerController = require(path.join(__dirname,'../controllers/managerController'));

managerRouter.get('/list',managerController.getListPage);//处理get请求list.html页面

// 导出一级路由接口
module.exports = managerRouter
