// 导包
const MongoClient = require('mongodb').MongoClient;

// 封装MongoDB
//     1 初始化数据库信息
        // 1.1 创建一个构造函数
        // 1.2 把初始化信息,当做构造函数的属性
    // 2 把操作数据库的方法,给构造函数的原型添加
        // 2.1 每一个方法要求能够通用
    // 3 暴露构造函数给调用者
/**
 * 构造函数
 */
function DB(){
    this.url = 'mongodb://localhost:27017'
    this.abname = 'whyu_node01'
}


/** 链接MongoDB
 * 
 * @param {*} collection_name 表名
 * @param {*} callback 回调函数(集合,db)
 */
DB.prototype.getConnection = function (collection_name,callback){

    MongoClient.connect(this.url, {useNewUrlParser: true},(err, client) => {
        // 链接
        const db = client.db(this.abname);
        // 拿到集合
        const collection = db.collection(collection_name);
    
        callback(collection,client)//返回集合
    });
}





/** 查询全部
 * 
 * @param {*} collection_name 表名
 * @param {*} conditions 查询条件
 * @param {*} callback 回调函数
 */
DB.prototype.find = function (collection_name,conditions,callback){

    // 拿到
    this.getConnection(collection_name,(collection,client) => {

        collection.find(conditions).toArray((err,docs) =>{
            client.close();//关闭链接
            callback(err,docs)//参数1:报错信息   参数2:查询结果

        })
    })
}
/** 查询一条
 * 
 * @param {*} collection_name 表名
 * @param {*} conditions 查询条件
 * @param {*} callback 回调函数
 */
DB.prototype.findone = function (collection_name,conditions,callback){

    // 拿到
    this.getConnection(collection_name,(collection,client) => {

        collection.find(conditions).toArray((err,docs) =>{
            client.close();//关闭链接
            callback(err,docs)//参数1:报错信息   参数2:查询结果

        })
    })
}


/** 插入多条
 * 
 * @param {*} collection_name 表名
 * @param {*} conditions 查询条件
 * @param {*} callback 回调函数
 */
DB.prototype.insertMany = function (collection_name,conditions,callback){

    // 拿到
    this.getConnection(collection_name,(collection,client) => {

        collection.insertMany(conditions, (err, result) => {
            client.close();//关闭链接
            callback(err,result)//参数1:报错信息   参数2:查询结果
        })

    })
}

/** 插入一条
 * 
 * @param {*} collection_name 表名
 * @param {*} conditions 查询条件
 * @param {*} callback 回调函数
 */
DB.prototype.insertOne = function (collection_name,conditions,callback){

    // 拿到
    this.getConnection(collection_name,(collection,client) => {

        collection.insertOne(conditions,(err, result) => {
            client.close();//关闭链接
            callback(err,result)//参数1:报错信息   参数2:查询结果
        });

    })
}

/**更新全部
 * 
 * @param {*} collection_name 表名
 * @param {*} conditions 更新需要的条件
 * @param {*} update_fields 要更新的字段
 * @param {*} callback 回调函数
 */
DB.prototype.updateMany = function (collection_name,conditions,update_fields,callback){

    // 拿到
    this.getConnection(collection_name,(collection,client) => {

        collection.updateMany(conditions,update_fields,(err, result) => {
            client.close();//关闭链接
            callback(err,result)//参数1:报错信息   参数2:查询结果
        });

    })
}

/** 更新一条
 * 
 * @param {*} collection_name 表名
 * @param {*} conditions 更新需要的条件
 * @param {*} update_fields 要更新的字段
 * @param {*} callback 回调函数
 */
DB.prototype.updateOne = function (collection_name,conditions,update_fields,callback){

    // 拿到
    this.getConnection(collection_name,(collection,client) => {

        collection.updateOne(conditions,update_fields,(err, result) => {
            client.close();//关闭链接
            callback(err,result)//参数1:报错信息   参数2:查询结果
        });

    })
}
/** 删除多条
 * 
 * @param {*} collection_name 表名
 * @param {*} conditions 删除满足的条件
 * @param {*} callback 回调函数
 */
DB.prototype.deleteMany = function (collection_name,conditions,callback){

    // 拿到
    this.getConnection(collection_name,(collection,client) => {

        collection.deleteMany(conditions,(err, result) => {
            client.close();//关闭链接
            callback(err,result)//参数1:报错信息   参数2:查询结果
        });

    })
}
/** 删除多条
 * 
 * @param {*} collection_name 表名
 * @param {*} conditions 删除满足的条件
 * @param {*} callback 回调函数
 */
DB.prototype.deleteOne = function (collection_name,conditions,callback){

    // 拿到
    this.getConnection(collection_name,(collection,client) => {

        collection.deleteOne(conditions,(err, result) => {
            client.close();//关闭链接
            callback(err,result)//参数1:报错信息   参数2:查询结果
        });

    })
}



// 导出
module.exports = new DB()


