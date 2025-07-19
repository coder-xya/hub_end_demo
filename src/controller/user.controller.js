
 const fs = require('fs')
const fileService = require('../service/file.service');
const UserService = require('../service/user.service');
const { UPLOAD_PATH } = require('../config/path');

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

    async showAvatarImage(ctx,next){

        const {userId} = ctx.params

        const {filename,mimetype} = await fileService.queryAvatarWithUser(userId)

        ctx.type = mimetype//浏览器直接下载图片而不是显示，通常是因为响应头中缺少正确的`Content-Type`，或者浏览器不识别该类型。使用`ctx.type = mimetype`来设置响应头。
        ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
    }
}

module.exports = new UserController