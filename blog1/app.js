const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 用于处理 post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json')

    const url = req.url
    const path = url.split("?")[0]

    req.path = path
    // 解析 query
    req.query = querystring.parse(url.split('?')[1])
    
    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || '' // ke1v1;k2=v2;k3=v3这种格式
    cookieStr.split(';').forEach(item => {
        if(!item) {
            return
        }
        //设置了httpOnly的情况下，username=name; username=name2,如果破httpOnly是针对name2设置的，虽然name和name都会发送到服务端，但是服务端只能获取到name2
        const arr = item.split('=')
        const key = arr[0].trim() // cookie拼接的时候有空格，所以要去掉，不让拿不到
        const value = arr[1].trim()
        req.cookie[key] = value
    })

    console.log('req.cookie is ')
    console.log(req.cookie);
    // 处理POSTData
    getPostData(req).then(postData => {
        req.body = postData
        // 处理blog路由
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                if (blogData) {
                    res.end(JSON.stringify(blogData))
                    return
                }
            })
            return
        }
        // const blogData = handleBlogRouter(req,res)


        // 处理user路由
        // const userData = handleUserRouter(req, res)
        // if (userData) {
        //     res.end(JSON.stringify(userData))
        //     return
        // }

        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                if (userData) {
                    res.end(JSON.stringify(userData))
                    return
                }
            })
            return
        }

        // 未命中路由，返回404
        res.writeHead(404, { "Content-type": "text/plain" })
        res.write('404 Not Found\n')
        res.end()
    })
}

module.exports = serverHandle