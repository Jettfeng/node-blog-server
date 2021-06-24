const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 获取cookie的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime()+ (24 *60 * 60 *1000))
    console.log(`d.toGMTString()===${d.toGMTString()}`);
    return d.toGMTString()
}

// session数据
const SESSION_DATA = {}

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

      // 解析session
    //   session问题
    //   目前session直接是js变量，防在node.js进程内存中
    //   1.进程内存有限，访问量过大，内存暴增怎么办？
    //   2.正式线上运行是多进程，进程之间内存无法共享
      let needSetCookie = false
      let userId = req.cookie.userid
      if (userId) {
          if (!SESSION_DATA[userId]) {
              SESSION_DATA[userId] = {}
          }
      } else {
          needSetCookie = true
          userId = `${Date.now()}_${Math.random()}`
          SESSION_DATA[userId] = {}
      }
      req.session = SESSION_DATA[userId]
      console.log('req.session=====================');
      console.log(req.session)
    // 处理POSTData
    getPostData(req).then(postData => {
        req.body = postData
        // 处理blog路由
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                if (blogData) {
                    if (needSetCookie) {
                        res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                    }
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
                    if (needSetCookie) {
                        res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                    }
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