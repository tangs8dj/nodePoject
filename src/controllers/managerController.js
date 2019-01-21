// 导包
const path = require('path')
const arttemplate = require('art-template')
const MongoClient = require('mongodb').MongoClient;
const db = require(path.join(__dirname, '../tools/databasetool'))

// 导出manager/list页面的请求
exports.getListPage = (req, res) => {
    let keyword = req.query.keyword || ''

    db.find("studentInfo", {name:{$regex:keyword}}, (err, docs) => {

        // 使用art-template处理模板    查询到的doc是一个数组
        let html = arttemplate(path.join(__dirname, '../public/views/list.html'), {
            student: docs,
            keyword
        })

        // 返回list.html
        res.send(html)
    })
   
}