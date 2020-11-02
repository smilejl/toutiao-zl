//获取搜索联想接口模块

import request from '@/utils/request'

export const getSuggestions = q => {
    return request({
        method:"GET",
        url: '/app/v1_0/suggestion',
        params:{
            q //搜索关键词
        }
    })
}

//获取搜索结果接口
export const getResults = params => {
    return request({
        method:"GET",
        url: '/app/v1_0/search',
        params
       
    })
}

//获取搜索历史接口
export const getHistories = () => {
    return request({
        method:"GET",
        url: '/app/v1_0/search/histories',
        
       
    })
}
