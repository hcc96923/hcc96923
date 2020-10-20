const koaRouter = require('koa-router');
const router = new koaRouter();
const userRouter = require('./user');


// 加载所有子路由
router.use('/user', userRouter.routes(), userRouter.allowedMethods());


module.exports = router;