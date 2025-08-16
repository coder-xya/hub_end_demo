const fileService = require("../service/file.service");
const userService = require("../service/user.service");
const { APP_HOST, APP_PORT } = require("../config/server");

class FileController {
  async create(ctx, next) {
    // console.log(ctx.request.file);

    const { filename, mimetype, size } = ctx.request.file;
    const { id: userId } = ctx.user;

    const result = await fileService.avatarCreate(
      filename,
      mimetype,
      size,
      userId
    );

    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/avatar/${userId}`;
    const result2 = await userService.updateUserAvatar(avatarUrl, userId);

    ctx.body = {
      code: 0,
      message: "头像上传成功～",
      data: avatarUrl,
    };
  }
}

module.exports = new FileController();
