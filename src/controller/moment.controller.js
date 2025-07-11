const momentService = require("../service/moment.service")

class MomentController {
    async create(ctx,next){


        // auth验证中间件存的（token中解析）
        const {id ,name } = ctx.user 

        const {content} = ctx.request.body

        // 存入数据库里
        const result = await momentService.create(id,content)

        ctx.body = {
            code:0,
            msg:"数据添加成功～",
            data:result
        }
    }
}

module.exports = new MomentController