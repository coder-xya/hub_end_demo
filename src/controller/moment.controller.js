const MomentService = require("../service/moment.service")

class MomentController {
    //创建
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
//列表
    async list(ctx,next){

        const {limit,offset} = ctx.query

        //
        const result = await MomentService.queryList(limit,offset)
        
        ctx.body = {
            code:0,
            data:result
        }

    }
//详情
    async detail(ctx,next){

        const {id} = ctx.params
        //
        const result = await MomentService.queryById(id)

        ctx.body = {
            code:0,
            data:result[0]
        }

    }
    //修改动态
    async update(ctx,next){

        const {content} = ctx.request.body
        const {id} = ctx.params

        //
        const result = await MomentService.updateById(content,id)
        console.log(result);
        

        ctx.body = {
            code : 0,
            msg:'动态修改成功～'
        }
    }
    //删除动态
    async remove(ctx,next){
        const {id} = ctx.params

        //
        const result = await MomentService.removeById(id)
        console.log(result);
        

        ctx.body = {
            code : 0,
            msg:'动态删除成功～'
        }
    }
    //设置labels
    async addLabels(ctx,next){

        const labels = ctx.labels

        const {id:momentId} = ctx.params

        for(const label of labels){
            const isExists = await MomentService.hasTheLabel(momentId,label.id)

            if(!isExists){
                const result = await MomentService.addLabel(momentId,label.id)
            }
        }

        ctx.body = {
            code: 0,
            massageL:'添加标签成功～'
        }
    }
}

module.exports = new MomentController