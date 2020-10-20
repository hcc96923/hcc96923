const path = require('path');
const Koa = require('koa');
const koaConvert = require('koa-convert');
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const koaLogger = require('koa-logger');
const koaCORS = require('koa-cors');


// 实例化服务对象
const app = new Koa();


// 加载解析POST请求的中间件
app.use(koaConvert(bodyParser()));


// 设置服务端静态资源目录
app.use(koaStatic(path.join(__dirname, './static')));


// 加载控制台日志中间件
app.use(koaConvert(koaLogger()));


// 加载设置跨域的中间件
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT']
}
app.use(koaConvert(koaCORS(corsOptions)));


// 加载路由中间件
const router = require('./routes/index');
app.use(router.routes()).use(router.allowedMethods());


// 监听端口
app.listen(8081, () => {
    console.log('Server is running in http://localhost:' + 8081);
});