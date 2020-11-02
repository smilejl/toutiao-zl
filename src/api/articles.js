//文章请求相关模块
import request from '@/utils/request'



export const getArticles = params => {
    return request({
        method:"GET",
        url: '/app/v1_1/articles',
        params
    })
}

//获取文章详情
export const getArticleByid = article_id => {
    return request({
        method:"GET",
        url: `/app/v1_0/articles/${article_id}`,
    })
}

//收藏文章
export const addCollect = articleId => {
    return request({
        method:"POST",
        url: '/app/v1_0/article/collections',
        data:{
            target:articleId
        }
    })
}


//取消收藏
export const deleteCollect = articleId => {
    return request({
        method:"DELETE",
        url: `/app/v1_0/article/collections/${articleId}`
       
    })
}
