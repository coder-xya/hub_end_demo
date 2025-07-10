

const { NAME_IS_NOT_EXISTS, NAME_OR_PASSWORD_IS_REQUIRE,PASSWORD_IS_INCORRENT } = require("../config/error-constants") 
const userService = require("../service/user.service") 
const md5Password = require("../utils/md5-password") 

// 登录接口验证逻辑中间件

const verifyLogin = async (ctx,next)=>{
    const {name,password} = ctx.request.body


    //1. 判断用户名、密码是否为空
        if(!name || !password){
            return ctx.app.emit('error',NAME_OR_PASSWORD_IS_REQUIRE,ctx)
        }

    //2. 判断用户是否存在

    const users = await userService.findUserByName(name)
    const user = users[0]
    if(!user){
        return ctx.app.emit('error',NAME_IS_NOT_EXISTS,ctx)
    }


    //3. 查询用户传入到密码与数据库中是否一致 
    if(user.password !== md5Password(password)){
        ctx.app.emit('error',PASSWORD_IS_INCORRENT,ctx)
    }

    //4. 将user保存在ctx中（后面的中间件使用）
    ctx.user = user

    await next()
}

module.exports = {verifyLogin}