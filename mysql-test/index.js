const mysql = require('mysql')
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'myblog'
})

con.connect() // 开始连接

// 执行sql语句
const sql = `insert into blogs (title, content, createtime, author) values ('标题D', '内容D',1546871704408, 'wangwu')`
// const sql = `select id,username from users;`
con.query(sql,(err,result) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(result);
})

con.end()