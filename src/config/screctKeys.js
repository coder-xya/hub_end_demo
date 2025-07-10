

const fs = require('fs')

const path = require('path')

// 绝对路径
// const PRIVATE_KEY = fs.readFileSync('./src/config/keys/private.key')
// const PUBLIC_KEY = fs.readFileSync('./src/config/keys/public.key')


//默认情况下相对目录和node的启动目录有关系,在这里不能直接使用相对路径
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname,'./keys/private.key'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname,'./keys/public.key'))



module.exports = {
    PRIVATE_KEY,
    PUBLIC_KEY
}