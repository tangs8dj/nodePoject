// 导包
const path = require('path')
const {
    createConnection
} = require('mysql');
const captchapng = require('captchapng')


// 设置mysql链接信息
const connection = createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'root',
    database: 'nodepoject'
})

// 处理注册页面
exports.getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/register.html'))
}

// 处理注册方法
exports.register = (req, res) => {

    const result = {
        status: 0,
        message: "注册成功"
    }

    // 解构取值
    const {
        username,
        password
    } = req.body;
    // 连接sql
    // connection.connect()

    // 查询mysql语句
    let sql = `select * from accountinfo where username = ${username}`
    connection.query(sql, (err, resu) => {
        if (err) throw err;
        // 没有查询到数据,
        if (resu.length == 0) {
            // 插入mysql语句
            let insSql = `insert into accountinfo(username,password) values('${username}','${password}')`;
            connection.query(insSql, (err, data) => { //发送插入语句
                if (err) throw err;
                if (data.affectedRows == 0) {
                    result.status = 1
                    result.message = "注册失败"
                }
                res.json(result)
            })
        } else {
            result.status = 1
            result.message = "注册失败"
            res.json(result)

        }

    })


}

// 处理login页面
exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/login.html'))
}

// 处理login页面的刷新验证码请求
exports.getLoginVcode = (req, response) => {
    let vcode = parseInt(Math.random() * 9000 + 1000)
    var p = new captchapng(80, 30, vcode); // width,height,numeric captcha
    req.session.vcode = vcode; //在server的session中存储vcode的值
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    response.writeHead(200, {
        'Content-Type': 'image/png'
    });
    response.end(imgbase64);

}

exports.checkloginInfo = (req, res) => {
    // 设定返回值
    const result = {
        status: 0,
        message: "登录成功"
    }
    // 解构提交的info
    const {
        username,
        password,
        vcode
    } = req.body;
    console.log(req.session.vcode);
    console.log(vcode);
    // 校验vcode
    if (req.session.vcode != vcode) {

        result.status = 2
        result.message = "验证码错误"

      
    }
    // 校验成功查询mysql对比info
    let sql = `select * from accountinfo where username = '${username}' and password = '${password}' `
    console.log(sql);
    connection.query(sql, (err, response) => {
        if (err) throw err;
        console.log((response == 0));
        if (response.length == 0) {
            result.status = 1
            result.message = "用户名或密码错误"
            
        }
    })
    
    res.json(result)
}