const fileService = require("../service/file.service")


class FileController {
    async create(ctx,next){

        // console.log(ctx.request.file);

        const {filename,mimetype,size} = ctx.request.file
        const {id:userId} = ctx.user

        const result = await fileService.avatarCreate(filename,mimetype,size,userId)

        ctx.body = {
            code:0,
            message:'头像上传成功～'
        }
    
    }  
}


module.exports = new FileController