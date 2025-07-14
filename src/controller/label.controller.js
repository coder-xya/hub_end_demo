const LabelService = require("../service/label.service")

class LabelController {
    async create(ctx,next){


        const {name} = ctx.request.body

        const result = await LabelService.create(name)


        ctx.body = {
            code:0,
            message:"创建标签成功～"
        }
    }
}

module.exports = new LabelController