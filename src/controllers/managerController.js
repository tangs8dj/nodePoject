// 导包
const path = require('path')
const arttemplate = require('art-template')

// 导出manager/list页面的请求
exports.getListPage = (req,res) => {

    // 使用art-template处理模板
    let html = arttemplate(path.join(__dirname,'../public/views/list.html'),{})

    // 返回list.html
    res.send(html)
}