
// 用户请求相关模块
import request from '@/utils/request'

//注册，登录请求

export const login = data => {
    return request({
        method:"POST",
        url: '/app/v1_0/authorizations',
        data
    })
}
//发送短信验证码
export const send = mobile => {
    return request({
        method:"GET",
        url: `/app/v1_0/sms/codes/${mobile}`
    })
}

//获取登录用户的信息
export const getCurrentUser = () => {
    return request({
        method:"GET",
        url: '/app/v1_0/user'
        // headers: {
        //     Authorization:`Bearer ${store.state.user.token}`
        // }
    })
}


//获取登录用户的频道列表信息
export const addFollow = userId => {
    return request({
        method:"POST",
        url: '/app/v1_0/user/followings',
        data:{
            target: userId
        }
    })
}


//关注用户
export const deleteFollow = userId => {
    return request({
        method:"DELETE",
        url: `/app/v1_0/user/followings/${userId}`
       
    })
}


//取消关注
export const getLoadChannels = () => {
    return request({
        method:"GET",
        url: '/app/v1_0/user/channels'
       
    })
}


