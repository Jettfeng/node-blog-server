const env = process.env.NODE_ENV // 环境变量

// 配置
let MYSQL_CONF

if (env === 'dev') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'myblog'
    }
}

if (env === 'production') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'myblog'
    }
}

module.exports = {
    MYSQL_CONF
}