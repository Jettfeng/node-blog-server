const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
    // 先返回假数据（格式是正确的）
    let sql = `select * from blogs where 1=1 ` // 1=1占位作用，当author、keyword都为空的时候就成了 `select * from blogs where ;`就会报错
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`
    return exec(sql)
}

const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const createtime = Date.now()
    const sql = `insert into blogs (title, content, createtime , author) values ('${title}','${content}',${createtime},'${author}')`
    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
    // console.log('newBlog blogData', blogData)
    // return {
    //     id: 3
    // }
}

const updateBlog = (id, blogData = {}) => {
    const title = blogData.title
    const content = blogData.content
    const sql = `
        update blogs set title='${title}',content='${content}' where id=${id}
    `
    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
    // console.log('updateBlog blogData', blogData)
    // return false
}

const delBlog = (id, author) => {
    const sql = `delete from blogs where id='${id}' and author='${author}';`
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}