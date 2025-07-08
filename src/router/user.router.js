

const koaRouter = require('@koa/router')
const UserController = require('../controller/user.controller')
const {verifyUser,handlePassword} = require('../middleware/user.middleware')

//创建路由对象
const useRouter = new koaRouter({prefix:'/users'})

//定义路由中映射

//用户注册接口
useRouter.post('/',verifyUser,handlePassword,UserController.create)//  传递的是create函数本身（不加括号），而不是create函数的执行结果（加括号）

module.exports = useRouter