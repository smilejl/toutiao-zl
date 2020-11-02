<template>
  <div class="channel-edit">
    <van-cell :border = "false">
        <div slot="title" class="channel-title">我的频道</div>
        <van-button
        type="danger"
        round size="small"
        @click="isEdit = !isEdit"
        >
        {{isEdit ? '完成' : '编辑'}}
        </van-button>
    </van-cell>
    <van-grid :gutter="10">
        <van-grid-item
        class="grid-items"
        :class="{active : index === active}"
        v-for="(channel , index) in userChannels"
        :key="index"
        :icon="(isEdit && index !==0) ? 'clear' : ''"
        :text=channel.name
        @click="isUserChannelClick(channel , index)"
        />
    </van-grid>
    <van-cell :border = "false">
        <div
        slot="title"
        class="channel-title"
        >频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
        <van-grid-item
        class="grid-items"
        v-for="(channel , index) in recommendChannels"
        :key="index"
        :text=channel.name
        @click="onAdd(channel)"
        />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels , AddChannels , DeleteUserChannels} from '@/api/channels.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
    name:"ChannelEdit",
    data () {
        return {
            allChannels:[],
            isEdit: false //控制编辑状态的叉号是否显示
        }
    },
    created () {
        this.loadChannels ()
    },
    methods:{
        async loadChannels () {//请求获取所有频道
            const { data } = await getAllChannels ()
            this.allChannels = data.data.channels
        },
        async onAdd (channel) {
            this.userChannels.push(channel)//添加频道，参数为数组下标
            //数据持久化，登录后数据存到线上（token），未登录，数据存到本地
            if (this.user) {
                await AddChannels({
                    channels:[
                        {id: channel.id , seq: this.userChannels.length}
                    ]
                })
            } else {
                setItem('user-channels', this.userChannels)
            }
        },
        isUserChannelClick (channel ,index) {
            if (this.isEdit && index !==0) {
                //编辑状态，删除频道
                this.deleteChannel(channel,index)
            } else {
                //费编辑状态，切换频道
                this.switchChannel (index)
            }  
        },
        async deleteChannel (channel,index) {
            //如果删除的频道是当前频道之前
            if(index <= this.active) {
                //更新频道索引
                this.$emit('update-active' , this.active - 1)
            }
            this.userChannels.splice(index , 1)
            if (this.user) {
                await DeleteUserChannels(channel.id)
            } else {
                setItem('user-channels', this.userChannels)
            }
        },
        switchChannel (index) {
            //点击任意我的频道，关闭弹出层。子传父，父组件监听接收
            this.$emit('close')
            //切换频道
            this.$emit('update-active' , index)
        }
    },
    computed:{
        //映射user
        ...mapState(['user']),
        //推荐频道列表
        recommendChannels () {
            //思路：所有频道 - 我的频道 = 推荐频道
            return this.allChannels.filter(channels => {
                //判断channel是否属于我的频道
                return !this.userChannels.find(userChannels => {
                    return userChannels.id ===channels.id
                })
                
            })
        }
    },
    props:{
        userChannels:{
            type:Array,
            required:true
        },
        active:{
            type: Number,
            required:true
        }
    }
}
</script>

<style scoped lang="less">
    .channel-edit{
        padding-top: 54px;
        .channel-title{
            font-size: px;
            color: #333333;
        }
        .grid-items{
            /deep/.van-grid-item__content{
                background-color: #f4f5f6;
                .van-grid-item__text{
                    font-size: 14px;
                    color: #222;
                    margin-top: 0;
                }
            }
            /deep/.van-grid-item__icon{
                position: absolute;
                right: -8px;
                top: -5px;
                font-size: 20px;
                color: #ccc;
            }
            width: 80px;
            height: 43px;
        }
        .active{
            /deep/.van-grid-item__text{
                color: red !important;
            }
        }
    }
</style>