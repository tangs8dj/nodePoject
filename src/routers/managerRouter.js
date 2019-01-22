/**
 *  studentManager
 *  学生管理页面 
 *  二级路径get用req.query.key 取值 /manager/list?key=111
 *  二级路径post用req.body.key 取值 /manager/list
 *  三级路径get用req.params.key 取值  /delete/sadasdasd(可变的字段)' 在路由处理中设置 /delete/:studentId'
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

managerRouter.get('/add',managerController.getAddStudentPage);//处理get请求add.html页面

managerRouter.post('/add',managerController.postAddStudent);//处理post提交student信息

managerRouter.get('/edit/:studentId',managerController.editStudentPage);//处理get携带动态id请求edit页面

managerRouter.post('/edit/:studentId',managerController.postEditStudent);//处理post携带动态id请求修改

managerRouter.get('/delete/:studentId',managerController.deleteStudentInfo)//处理get携带id请求delete过来student info



// 导出一级路由接口
module.exports = managerRouter
