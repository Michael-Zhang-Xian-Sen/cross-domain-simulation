# 跨域模拟
当前只实现了对三种跨域方式的模拟
1. jsonp
2. form+iframe
3. cors

项目使用的技术
* 后台：koa2
* 前端：vue3.0、ant-design-vue

## 运行项目
后端：在项目根目录下执行如下命令
1. `npm i`
2. `node index.js`

前端：在fe目录下执行如下命令
1. `npm i`
2. `npm run serve`
3. 浏览器打开`http://localhost:8080/`