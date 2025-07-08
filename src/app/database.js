
const mysql = require('mysql2')


// 创建连接池
const connectionPool = mysql.createPool({
    host:'localhost',
    port:3306,
    database:'coderhub',
    user:'root',
    password:'111111',
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