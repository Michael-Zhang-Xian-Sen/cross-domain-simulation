const Router = require('koa-router')
const router = new Router({
    prefix: '/api'
})
const koaBody = require('koa-body')

router.get('/testGet', (ctx) => {
    console.log(`后台testGet接口被触发`);
    console.log(`接收到数据：${ctx.request.query.anything}`);
    console.log(ctx.request.query)
    ctx.response.status = 200;
    // 后台返回的内容必须为模拟执行回调函数的代码，即：回调函数名(参数)
    ctx.body = `${ctx.request.query.callback}({"status":"success"})`;
})

router.post('/testPost', koaBody({ multipart: true }), async (ctx, next) => {
    console.log(`后台testPost接口被触发`);
    console.log(`接收到数据：${JSON.stringify(ctx.request.body)}`);
    ctx.response.status = 200;
    ctx.body = {
        status: "success",
        text: ctx.request.body
    }
})

router.post('/testCorsPost', koaBody({ multipart: true }), async (ctx, next) => {
    const isSetCookie = ctx.request.body.isDeliverCookie.value;
    // 根据是否携带cookie，设置不同的跨域信息。具体是两点：
    // 1. 如果设置cookie，Access-Control-Allow-Origin字段不得为"*"。
    // 2. 如果设置cookie，Access-Control-Allow-Credentials字段需要设置为true。
    ctx.set('Access-Control-Allow-Origin', ctx.request.body.corsApi.value)
    isSetCookie && ctx.set('Access-Control-Allow-Credentials', true)
    ctx.set('Access-Control-Request-Method', 'PUT,POST,GET,DELETE,OPTIONS')
    ctx.response.status = 200;
    ctx.body = {
        status: "success",
        text: ctx.request.body
    }
})

router.get('/testCorsGet', (ctx) => {
    let isSetCookie = ctx.request.query["isDeliverCookie[value]"] === "true";
    ctx.set('Access-Control-Allow-Origin', ctx.request.query["corsApi[value]"])
    isSetCookie && ctx.set('Access-Control-Allow-Credentials', true)
    ctx.set('Access-Control-Request-Method', 'PUT,POST,GET,DELETE,OPTIONS')
    ctx.response.status = 200;
    ctx.body = {
        status: "success",
        text: ctx.request.query
    }
})

module.exports = router;