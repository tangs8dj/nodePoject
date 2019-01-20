// 导包
const  express = require('express');
const path = require('path')

// 创建路由对象
const accountRouter = express.Router();

// 连接路由控制器分发路由rigester页面
const accountControllers = require(path.join(__dirname,'../controllers','accountControllers.js'))


// mvc 处理register页面请求
accountRouter.get('/register',accountControllers.getRegisterPage)

// 处理注册信息
accountRouter.post('/register',accountControllers.register)

// 处理login页面请求
accountRouter.get('/login',accountControllers.getLoginPage)

// 处理login页面刷新验证码的请求
accountRouter.get('/vcode',accountControllers.getLoginVcode)

// 处理login页面登录验证checkloginInfo
accountRouter.post('/login',accountControllers.checkloginInfo)

module.exports = accountRouter