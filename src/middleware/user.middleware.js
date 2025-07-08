
const { NAME_OR_PASSWORD_IS_REQUIRE, NAME_IS_ALREADY_EXISTS } = require('../config/error-constants')
const UserService = require('../service/user.service')
const md5Password = require('../utils/md5-password')

//验证用户名、密码
const verifyUser = async (ctx,next)=> {
    
        //验证客户端发过来的数据是否能保存到数据库
        const {name,password} = ctx.request.body

        //验证用户名和密码是否为空
        if(!name || !password){

            // ctx.body = {
            //     code:-1001,
            //     message: '用户名或密码不能为空!'
            // }
            // return 

            return ctx.app.emit('error',NAME_OR_PASSWORD_IS_REQUIRE,ctx)
        }

        //判断用户名是否在数据库中已存在
        const users = await UserService.findUserByName(name)
        if(users.length){
            // ctx.body = {
            //     code:-1002,
            //     message:'用户名已经存在!'
            // }
            // return

            return ctx.app.emit('error',NAME_IS_ALREADY_EXISTS,ctx)
        } 
        
        await next()
}
//MD5对密码进行加密
const handlePassword = async (ctx,next)=>{
    const {password} = ctx.request.body

    ctx.request.body.password = md5Password(password)

    await next()
}

module.exports = {
    verifyUser,
    handlePassword
}