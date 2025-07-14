

const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const MomentController = require('../controller/moment.controller')
const {verifyPermission} = require('../middleware/permission.middleware')
const { verifyLabelExists } = require('../middleware/label.middleware')

const momentRouter = new KoaRouter({prefix:'/moment'})


//创建动态（增）
momentRouter.post('/create',verifyAuth,MomentController.create)
//动态列表（查）
momentRouter.get('/list',MomentController.list)
//动态详情（查）
momentRouter.get('/detail/:id',MomentController.detail)
//修改动态(改)
momentRouter.patch('/update/:id',verifyAuth,verifyPermission('moment'),MomentController.update)
//删除动态（删）
momentRouter.delete('/remove/:id',verifyAuth,verifyPermission('moment'),MomentController.remove)
//给动态添加标签
momentRouter.post('/:id/labels',verifyAuth,verifyPermission('moment'),verifyLabelExists,MomentController.addLabels)


module.exports = momentRouter