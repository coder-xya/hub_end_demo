
/**
 * 权限验证中间件
 * 
 */

const PermissionService = require("../service/permission.service")
const {OPERATION_IS_NOT_ALLOWED} = require("../config/error-constants")

 const verifyMomentPermission = async(ctx,next) => {

    try {
        const {id : momentId} = ctx.params
        const {id : userId} = ctx.user

        const isPermission = await PermissionService.momentPermission(momentId,userId)

        if(!isPermission){
        return ctx.app.emit('error',OPERATION_IS_NOT_ALLOWED,ctx)
        }

        await next()
        
    } catch (error) {
        console.log(error);
        
    }


}

module.exports = {
    verifyMomentPermission
}