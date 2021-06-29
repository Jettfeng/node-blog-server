const router = require('koa-router')()

router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
    const { username, password } = ctx.request.body
    console.log(ctx.request.body);
    console.log(ctx);
    // console.log('xxxxx')
    ctx.body = {
        errno: 0,
        username,
        password
    }
})
module.exports = router
