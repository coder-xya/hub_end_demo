
const KoaRouter = require("@koa/router")
const {verifyLogin} = require('../middleware/login.middleware')
const LoginController = require('../controller/login.controller')

const loginRouter = new KoaRouter({prefix:'/login'})

loginRouter.post('/',verifyLogin,LoginController.sign)

module.exports = loginRouter