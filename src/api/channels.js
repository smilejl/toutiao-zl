// 频道列表请求模块
import request from '@/utils/request'
//获取频道列表信息
export const getAllChannels = () => {
    return request({
        method:"GET",
        url: '/app/v1_0/channels'
       
    })
}

export const AddChannels = data => {
    return request({
        method:"PATCH",
        url: '/app/v1_0/user/channels',
        data
    })
}

export const DeleteUserChannels = channelId => {
    return request({
        method:"DELETE",
        url:`/app/v1_0/user/channels/${channelId}`,
    })
}