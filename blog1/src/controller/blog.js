const getList = (author, keyword) => {
    // 先返回假数据（格式是正确的）
    return [{
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: '154664545454',
        author: '张三'
    },{
        id: 2,
        title: '标题B',
        content: '内容B',
        createTime: '154664545454',
        author: '李四'
    },{
        id: 3,
        title: '标题C',
        content: '内容C',
        createTime: '154664545454',
        author: '王五'
    }]
}

module.exports = {
    getList
}