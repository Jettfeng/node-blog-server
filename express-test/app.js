const express = require('express')

const app = express()

app.use((req, res, next) => {
    console.log('请求开始...', req.method, req.url);
    next()
})

app.use((req, res, next) => {
    req.cookie = {
        userId: 'abc123'
    }
    next()
})

app.use((req, res, next) => {
    setTimeout(() => {
        req.body = {
            a: 100,
            b: 200
        }
        next()
    }, 1000)
})

app.use('/api', (req, res, next) => {
    console.log('处理/api 路由');
    next()
})

app.get('/api', (req, res, next) => {
    console.log('get /api 路由=================');
    next()
})

app.post('/api', (req, res, next) => {
    console.log('post /api 路由');
    next()
})

app.get('/api/get-cookie', (req, res, next) => {
    console.log('get /api/get-cookie');
    res.json({
        errno: 0,
        data: req.cookie
    })
})

app.post('/api/get-post-data', (req, res, next) => {
    console.log('post /api/get-post-data');
    res.json({
        errno: 0,
        data: req.body
    })
})

app.use((req, res, next) => {
    console.log('处理404');
    res.json({
        errno: 404,
        msg: '404 not found'
    })
})


app.listen(3000, () => {
    console.log('server is running on port 3000')
})

