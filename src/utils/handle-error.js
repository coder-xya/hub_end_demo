 
 
const app =require('../app/index')
const { NAME_OR_PASSWORD_IS_REQUIRE, NAME_IS_ALREADY_EXISTS,NAME_IS_NOT_EXISTS,PASSWORD_IS_INCORRENT,UNAUTHORIZATION } = require('../config/error-constants')

 app.on('error',(error,ctx)=>{
    let code = 0
    let message = ''

    switch (error) {
        case NAME_OR_PASSWORD_IS_REQUIRE:
            code = -1001
            message = '用户名或密码不能为空~'
            break;
    
        case NAME_IS_ALREADY_EXISTS:
            code = -1002
            message = '用户名已存在~'
            break;

        case NAME_IS_NOT_EXISTS:
            code = -1003
            message = '用户不存在~'
            break;

        case PASSWORD_IS_INCORRENT:
            code = -1004
            message = '用户名或密码不正确~'
            break;

        case UNAUTHORIZATION:
            code = -1005
            message = 'token无效,请重新登录~'
            break;

            
    
        default:
            break;
    }
    //
    ctx.body = {code,message}
 })