// 导包
const path = require('path')
const arttemplate = require('art-template')
const MongoClient = require('mongodb').MongoClient;

// 导出manager/list页面的请求
exports.getListPage = (req,res) => {
    let keyword  =  req.query.keyword || ''
    // 连接MongoDB
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, function(err, client) {
        
        // 拿到集合
        const db = client.db('whyu_node01');

        // 拿到文档
        const collection = db.collection("studentInfo");

        // 查询文档
        collection.find({name:{$regex:keyword}}).toArray((err,doc) =>{

            client.close();//关闭链接
            // 使用art-template处理模板    查询到的doc是一个数组
            let html = arttemplate(path.join(__dirname,'../public/views/list.html'),{student:doc,keyword})
        
            // 返回list.html
            res.send(html)

        })
       
      });
}