// 导包
const express = require('express');

// 创建app实例
const app = express();

app.get('/',(req,res) => {
    res.send('hello node')
})

                                                                                           
// 监听端口
app.listen(9527,'127.0.0.1',err=>{
    if(err){
        console.log(err)
    }

    console.log("start ok")
})