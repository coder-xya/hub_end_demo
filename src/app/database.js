
const mysql = require('mysql2')

const {MYSQL_HOST,MYSQL_PORT,MYSQL_DATABASE,MYSQL_USER,MYSQL_PASSWORD} = require('../config/server.js')

// 创建连接池
const connectionPool = mysql.createPool({
    host:MYSQL_HOST||'localhost',
    port:MYSQL_PORT||3306,
    database:MYSQL_DATABASE||coderhub,
    user:MYSQL_USER||'root',
    password:MYSQL_PASSWORD||'123456',
    connectionLimit:5
})

// 获取连接是否成功
connectionPool.getConnection((err,connection)=>{

    // 是否有错误
    if(err){
        console.log('数据库连接失败!',err);
        return
    }

    //获取connection。尝试和数据库建立一次连接
    connection.connect(err=>{
    // 是否有错误
        if(err){
            console.log('数据库连接失败!',err);
            return
        }else{
            console.log('数据库连接成功!');
            
        }
    })
})


//获取连接池中链接对象（promise）
const connection = connectionPool.promise()


module.exports = connection