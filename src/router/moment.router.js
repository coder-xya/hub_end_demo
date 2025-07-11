

const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const MomentController = require('../controller/moment.controller')

const momentRouter = new KoaRouter({prefix:'/moment'})

momentRouter.post('/create',verifyAuth,MomentController.create)


module.exports = momentRouter