

const dotenv = require('dotenv')

/** 使用dotenv插件加载.env文件 */
dotenv.config()
// console.log(process.env);
// console.log(process.env.SERVER_PORT);


module.exports = {
    SERVER_HOST,
    SERVER_PORT
} = process.env