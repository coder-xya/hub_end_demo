
 
const UserService = require('../service/user.service')

class UserController {
    async create(ctx ,next){

        // 获取传递过来的信息
        const user = ctx.request.body
        console.log(user);
        

        // 将用户添加到数据库
        const result = await UserService.create(user)

        // 返回数据
        ctx.body = {
            message:'创建用户成功!',
            data:result
        }
    }
}

module.exports = new UserController