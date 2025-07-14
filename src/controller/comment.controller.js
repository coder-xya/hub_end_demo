const { configDotenv } = require("dotenv")
const commentService = require("../service/comment.service")


class CommentController {
   async create(ctx,next){

        const {id} = ctx.user

        const {content,momentId} = ctx.request.body


        const result = await commentService.create(content,momentId,id)

        console.log(result);
        

        ctx.body = {
            code:0,
            msg:"评论成功～"
        }

    }
}

module.exports = new CommentController