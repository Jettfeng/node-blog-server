const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 获取cookie的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime()+ (24 *60 * 60 *1000))
    console.log(`d.toGMTString()===${d.toGMTString()}`);
    return d.toGMTString()
}

const handleUserRouter = (req, res) => {
    const method = req.method
    // 获取博客列表
    if (method === 'POST' && req.path === '/api/user/login') {
        // const { username, password } = req.body
         const { username, password } = req.body
        let result = login(username, password)
        // if (result) {
        //     return new SuccessModel()
        // } else {
        //     return new ErrorModel('登录失败')
        // }
        return result.then(data => {
            if (data.username) {
                // 操作cookie
                // res.setHeader('Set-Cookie',`username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`) // path=/ 代表cookie对当前网站所有路由都有效;httpoOnly:只能在服务端修改cookie，不让客户端修改cookie
                // 设置session
                req.session.username = data.username
                req.session.realname = data.realname

                console.log('req.session is ',req.session)
                return new SuccessModel()
            } else {
                return new ErrorModel('登录失败')
            }
        })
    }
}

module.exports = handleUserRouter