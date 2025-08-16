//导入app
const app = require("./app/index.js");
require("./utils/handle-error.js");

const { APP_PORT } = require("./config/server.js");

//启动
app.listen(APP_PORT, () => {
  console.log("服务器启动成功!");
});
