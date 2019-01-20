// 导包
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session')

// 创建app实例
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// 加载静态资源
app.use(express.static(path.join(__dirname,'public')))

// 加载session
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))


// 导入路由对象  处理account相关的页面
const accountRouter = require(path.join(__dirname,'routers','accountRouter.js'));
app.use('/account',accountRouter)

                                                                                           
// 监听端口
app.listen(9527,'127.0.0.1',err=>{
    if(err){
        console.log(err)
    }

    console.log("start ok")
})