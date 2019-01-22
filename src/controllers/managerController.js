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
            keyword,
        })

        // 返回list.html
        res.send(html)
    })
   
}

// 导出manager/add页面的请求
exports.getAddStudentPage = (req,res) => {

    // 使用art-template处理模板
    let html = arttemplate(path.join(__dirname,'../public/views/add.html'),{}) 

    //返回add.html
    res.send(html)
}

//导出处理新增学员信息的接口
exports.postAddStudent = (req,res) => {
    // 获取form表单传递过来的值
    // 把获取到的值,插入数据库
    db.insertOne('studentInfo',req.body,(err,result1) => {
        if(result1.result.n !=0){
            res.send(`<script>window.location='/manager/list'</script>`)
        }else{
            res.send(`<script>alert('插入失败')</script>`)
        }
    })
}

// 导出处理修改页面请求
exports.editStudentPage = (req,res) => {

    let _id = db.ObjectID(req.params.studentId)

    db.findOne('studentInfo',{_id},(err,doc) => {

       // 使用art-template处理模板
        let edit = arttemplate(path.join(__dirname,'../public/views/edit.html'),doc[0]) 

        //返回add.html
        res.send(edit)

    })

}

// 导出修改页面修改请求
exports.postEditStudent = (req,res) =>{
    // 拿到传递的id,包装成MongoDB ObjectID
    let _id = db.ObjectID(req.params.studentId)

    //把拿到的id当做条件
    db.updateOne('studentInfo',{_id},req.body,(err,result) => {

        if (!result) {
            //失败
            res.send(`<script>alert("修改失败")</script>`);
        } else {
            res.send(`<script>location.href='/manager/list'</script>`);
        }
    })

}