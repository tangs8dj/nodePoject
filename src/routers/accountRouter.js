// 导包
const  express = require('express');
const path = require('path')

// 创建路由对象
const accountRouter = express.Router();

// 链接路由控制器分发路由rigester页面
const accountControllers = require(path.join(__dirname,'../controllers','accountControllers.js'))

// mvc
accountRouter.get('/register',accountControllers.getRegisterPage)

module.exports = accountRouter