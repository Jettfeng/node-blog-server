const express = require('express')

const app = express()

const apiRouter = require('./api')


app.get('/',(req,res,next) => {
   
})
// app.get('/api/test', (req, res, next) => {
//     res.json({
//         b: 1
//     })
// })

app.use('/api', apiRouter)
app.use('/api',(req,res,next) => {
    console.log('000000000000000000000000')
    next()
})
app.listen(3000, () => {
    console.log('启动成功');
})