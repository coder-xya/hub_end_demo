

const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const useRouter = require('../router/user.router')

//创建app
const app = new koa()

//使用中间件
//中间件的执行顺序是“洋葱圈模型”，即请求会从第一个中间件开始，依次执行每个中间件，直到某个中间件结束响应（没有调用`next()`）或者执行到最后一个中间件。然后，响应会沿着中间件栈回溯，执行每个中间件中`next()`之后的代码
app.use(bodyParser())//解析请求体（如JSON、表单数据等），并将解析后的数据挂载到`ctx.request.body`上，这样后续的中间件就可以直接使用请求体中的数据
app.use(useRouter.routes())//路由中间件，它根据请求的URL和HTTP方法，将请求路由到对应的处理函数（控制器）。`useRouter.routes()`返回一个中间件函数，该函数会匹配请求的路由并执行相应的处理函数
app.use(useRouter.allowedMethods())//这个中间件通常与`useRouter.routes()`一起使用，用于处理请求的HTTP方法。当请求的HTTP方法在路由中没有定义时，它会根据情况返回`405 Method Not Allowed`或`501 Not Implemented`。它还会设置`Allow`响应头，列出支持的HTTP方法

//导出app

module.exports = app

