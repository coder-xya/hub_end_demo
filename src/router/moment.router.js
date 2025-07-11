

const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const MomentController = require('../controller/moment.controller')

const momentRouter = new KoaRouter({prefix:'/moment'})


//创建动态
momentRouter.post('/create',verifyAuth,MomentController.create)
//动态列表
momentRouter.get('/list',MomentController.list)
//动态详情
momentRouter.get('/detail/:id',MomentController.detail)

module.exports = momentRouter