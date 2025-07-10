
const KoaRouter = require("@koa/router")
const {verifyLogin,verifyAuth} = require('../middleware/login.middleware')
const LoginController = require('../controller/login.controller')

const loginRouter = new KoaRouter({prefix:'/login'})

loginRouter.post('/',verifyLogin,LoginController.sign)

loginRouter.get('/',verifyAuth,(ctx,next)=>{

    ctx.body= {
        msg:'yanzhengtongguo1'
    }

    console.log('ddd');
    
   
})

module.exports = loginRouter