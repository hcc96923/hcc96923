const koaRouter = require('koa-router');
const userRouter = new koaRouter();
const execDB = require('../utils/connectionDB');


/* 
    addUser
    用户注册
*/
userRouter.post('/addUser', async( ctx ) => {
    const { user_account, user_pwd } = ctx.request.body;
    const sqlString = `SELECT user_id FROM user WHERE user_account = '${ user_account }'`;
    await execDB(sqlString)
        .then(async ( result ) => {
            if (result.length > 0) {
                ctx.response.body = {
                    code: 1,
                    message: '该账号已注册'
                }
            } else {
                const sqlString = `INSERT INTO user(user_account, user_pwd) VALUES('${ user_account }', '${ user_pwd }')`;
                await execDB(sqlString)
                    .then(result => {
                        ctx.response.body = {
                            code: 0,
                            message: '注册成功'
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        })
        .catch(error => {
            console.log(error);
        });
    
});
/* 
    login
    用户登录
*/
userRouter.post('/login', async( ctx ) => {
    // 登录状态已存在
    if (ctx.request.header.authorization !== undefined) {
        ctx.response.body = {
            code: 0,
            message: '登录状态已存在'
        }
        return;
    }
    

    // 登录状态不存在
    const { user_account, user_pwd } = ctx.request.body;
    const sqlString = `SELECT user_id FROM user WHERE user_account = '${ user_account }' AND user_pwd = '${ user_pwd }'`;
    await execDB(sqlString)
        .then(result => {
            if (result.length > 0) {
                ctx.response.body = {
                    code: 0,
                    message: '登陆成功',
                    user_cookie: {
                        user_account,
                        expires: 7
                    }
                }
            } else {
                ctx.response.body = {
                    code: 1,
                    message: '用户不存在或账号密码不匹配'
                }
            }
        })
        .catch(error => {
            console.log(error);
        });
});
/* 
    updatePwd
    修改密码
*/
userRouter.post('/updatePwd', async( ctx ) => {
    const { user_account, user_pwd, user_pwds } = ctx.request.body;
    const sqlString = `SELECT user_id FROM user WHERE user_account = '${ user_account }' AND user_pwd = '${ user_pwd }'`;

    
    await execDB(sqlString)
        .then(async (result) => {
            console.log(result);
            
            if (result.length > 0) {
                const sqlString = `UPDATE user SET user_pwd = '${ user_pwds }' WHERE user_account = '${ user_account }' AND user_pwd = '${ user_pwd }'`;
                await execDB(sqlString)
                    .then(result => {
                        ctx.response.body = {
                            code: 0,
                            message: '修改成功'
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                ctx.response.body = {
                    code: 1,
                    message: '账号密码不匹配'
                }
            }
        })
        .catch(error => {
            console.log(error);
        });
    
    
});


module.exports = userRouter;