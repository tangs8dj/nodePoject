//导包
const express = require('express')
const path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')

//创建app
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// Use the session middleware
app.use(session({ secret: 'keyboard cat',resave:false,saveUninitialized:false, cookie: { maxAge: 600000 }}))

//设置静态资源根目录
app.use(express.static(path.join(__dirname,"public")))

app.all('/*',(req,res,next) => {
    if(req.url.includes('account')){
        next()
    }else{
        if(req.session.loginedName){
            console.log(req.session.loginedName+':登录成功');
            next()
        }else{
            res.send(`<script>alert('请先登录!');location.href='/account/login'</script>`)
        }
    }
})

//导入路由对象，路由中间件写在最后
const accountRouter = require(path.join(__dirname,"routers/accountRouter.js"))//account一级路由路径
const managerRouter = require(path.join(__dirname,'routers/managerRouter.js'))//student一级路由路径
app.use('/account',accountRouter)////account一级路由挂载use
app.use('/manager',managerRouter)////account一级路由挂载use



//启动
app.listen(9527,'127.0.0.1',err=>{
    if(err){
        console.log(err)
    }

    console.log("start ok")
})