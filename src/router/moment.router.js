

const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const MomentController = require('../controller/moment.controller')

const momentRouter = new KoaRouter({prefix:'/moment'})


//创建动态（增）
momentRouter.post('/create',verifyAuth,MomentController.create)
//动态列表（查）
momentRouter.get('/list',MomentController.list)
//动态详情（查）
momentRouter.get('/detail/:id',MomentController.detail)
//修改动态(改)
momentRouter.patch('/update/:id',MomentController.update)
//删除动态（删）

module.exports = momentRouter