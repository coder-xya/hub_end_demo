const dotenv = require("dotenv");

/** 使用dotenv插件加载.env文件 */
dotenv.config();
// console.log(process.env);
// console.log(process.env.SERVER_PORT);

module.exports = { APP_HOST, APP_PORT } = process.env;
