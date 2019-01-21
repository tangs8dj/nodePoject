const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const captchapng = require('captchapng')
const db = require(path.join(__dirname, '../tools/databasetool'))

/**
 * module.exports = {
 *  getRegisterPage:箭头函数
 * }
 * 导出的一个方法，该方法获取注册页面
 */
exports.getRegisterPage = (req, res) => {
  // 内部就是对 fs.readFile 的封装
  res.sendFile(path.join(__dirname, "../public/views/register.html"));
};

/**
 * 导出的注册方法
 */
exports.register = (req, res) => {
  const result = {
    status: 0,
    message: "注册成功"
  };
  //1、拿到浏览器传输过来数据 (body-parser ===> app.js )
  const { username } = req.body;

  //2、先判断数据库中用户名，是否存在，如果存在返回提示 (mongodb)
  // Use connect method to connect to the server

      // 查询一个
      db.findOne('accountInfo',{ username }, (err, doc) => {
        // 如果result == null 没有查询到，就可以插入，如果查询到了，说明用户名已经存在
        console.log(doc);
        console.log(doc.length == 0);
        if (doc.length != 0) {
          // 存在
          result.status = 1;
          result.message = "用户名已经存在";

          // 返回
          res.json(result);
        } else {
          //3、如果用户名不存在，插入到数据库中
          // result2 有值，代表成功 result2 为null就是失败
          db.insertOne('accountInfo',req.body, (err, result2) => {
            console.log(result2);
            if (!result2) {
              // 失败
              result.status = 2;
              result.message = "注册失败";
            }

            // 返回
            res.json(result);
          });
        }
      });
    

};

// 导出获取登录页面的方法
exports.getLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views/login.html"));
};

exports.getVcodeImage = (req, res) => {
  const vcode = parseInt(Math.random() * 9000 + 1000);
  // 把vcode保存到session对象中去，方便将来登录
  req.session.vcode = vcode
  var p = new captchapng(80, 30, vcode); // width,height,numeric captcha
  p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
  p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

  var img = p.getBase64();
  var imgbase64 = Buffer.from(img, "base64");
  res.writeHead(200, {
    "Content-Type": "image/png"
  });
  res.end(imgbase64);
};

// 导出登录的方法
exports.login = (req,res) => {
  const result = {
    status: 0,
    message: "登录成功"
  };
  // 把浏览器传递过来的验证码 和 req.session.vcode 中的验证码对比
  // 获取post传递过来的info
  let {username,password,vcode} = req.body
  if(req.session.vcode != vcode){
    result.status = 1
    result.message = "验证码错误"
    res.json(result)
    return
  }

  // Use connect method to connect to the server

      // 查询一个
      db.findOne('accountInfo',{ username,password }, (err, doc) => {
        // 如果result == null 没有查询到，就返回用户名或密码错误，如果查询到了，说明用户名已经存在,就验证成功
        if (doc.length != 0) {
          // 存在
          // 返回
          res.json(result);
        } else {
          //3、如果用户名不存在，插入到数据库中
          // result2 有值，代表成功 result2 为null就是失败
          result.status = 2
          result.message = "用户名或密码错误"
            // 返回
          res.json(result);
        }
      });
    
  

}
