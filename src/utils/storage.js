// 本地储存封装模块

//获取数据
export const getItem = name => {
    const data = window.localStorage.getItem(name)
    //为什么把JSON.parse放到try catch中
    //因为 data 可能不是字符串
    try{
        //尝试把 data 转换为 Javascript 对象
        return JSON.parse(data)
    } catch (err) {
        //进入错误函数 ，说明data 不是字符串，直接返回原数据
        return data
    }
}
//存储数据
export const setItem = (name , value) => {
    //判断value是否是对象，如果是 把它转为JSON字符串再存储
    if(typeof value === 'object'){
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(name , value)
}
//删除数据
export const removeItem = name => {
    //window.localStorage.removeItem(name)
}