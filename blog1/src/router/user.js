const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleUserRouter = (req, res) => {
    const method = req.method
    // 获取博客列表
    if (method === 'GET' && req.path === '/api/user/login') {
        // const { username, password } = req.body
         const { username, password } = req.query
        let result = login(username, password)
        // if (result) {
        //     return new SuccessModel()
        // } else {
        //     return new ErrorModel('登录失败')
        // }
        return result.then(data => {
            if (data.username) {
                // 操作cookie
                res.setHeader('Set-Cookie',`username=${data.username}; path=/; httpOnly`) // path=/ 代表cookie对当前网站所有路由都有效;httpoOnly:只能在服务端修改cookie，不让客户端修改cookie
                return new SuccessModel()
            } else {
                return new ErrorModel('登录失败')
            }
        })
    }
    
    // 登录验证 === 测试
    if (method === 'GET' && req.path === '/api/user/login-test') {
        if (req.cookie.username) {
            return Promise.resolve(new SuccessModel(JSON.stringify({username:req.cookie.username})))
        } 
        return Promise.resolve(new ErrorModel('尚未登录'))
    }
}

module.exports = handleUserRouter