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
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: '154664545454',
        author: '张三'
    }
}

const newBlog = (blogData = {}) => {
    console.log('newBlog blogData', blogData)
    return {
        id: 3
    }
}

const updateBlog = (id, blogData = {}) => {
    console.log('updateBlog blogData', blogData)
    return false
}

const delBlog = (id) => {
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}