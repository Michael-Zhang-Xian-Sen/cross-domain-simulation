const Koa = require('koa');
const app = new Koa();
const router = require("./routes/index.js");

app.use(async (ctx, next) => {
	if (ctx.request.method === "OPTIONS") {
		ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
		ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
		ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
		ctx.set('Access-Control-Allow-Credentials', true)
		ctx.body = 200;
	} else {
		console.log("发给下一个中间件")
		await next();
	}
})

app.use(router.routes(), router.allowedMethods())

var server = app.listen(3000, function () {
	const host = server.address().address;
	const port = server.address().port;

	console.log('App listening at http://%s:%s', host, port);
});

module.exports = app;