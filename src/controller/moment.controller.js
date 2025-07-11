const MomentService = require("../service/moment.service")

class MomentController {
    async create(ctx,next){

        // auth验证中间件存的（token中解析）
        const {id ,name } = ctx.user 

        const {content} = ctx.request.body

        // 存入数据库里
        const result = await MomentService.create(id,content)

        ctx.body = {
            code:0,
            msg:"数据添加成功～",
            data:result
        }
    }

    async list(ctx,next){

        const {limit,offset} = ctx.query

        //
        const result = await MomentService.queryList(limit,offset)
        
        ctx.body = {
            code:0,
            data:result
        }

    }
}

module.exports = new MomentController