// 导包
const express = require('express');
const path = require('path');

// 创建app实例
const app = express();

// 加载静态资源
app.use(express.static(path.join(__dirname,'public')))

// 导入路由
// 导入路由对象
const accountRouter = require(path.join(__dirname,'routers','accountRouter.js'));
app.use('/account',accountRouter)

                                                                                           
// 监听端口
app.listen(9527,'127.0.0.1',err=>{
    if(err){
        console.log(err)
    }

    console.log("start ok")
})