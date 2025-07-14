
const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const commentController = require('../controller/comment.controller')

const commentRouter = new KoaRouter({prefix:'/comment'})

commentRouter.post('/create',verifyAuth,commentController.create)

commentRouter.post('/reply',verifyAuth,commentController.reply)

module.exports = commentRouter