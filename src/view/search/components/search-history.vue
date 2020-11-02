<template>
  <div class="history">
      <van-cell title="搜索历史">
          <div v-if="isDeleteShow">
              <span @click="$emit('update-histories',[])">全部删除</span>
              <span @click="isDeleteShow=false">完成</span>
          </div>
      <van-icon v-else name="delete" @click="isDeleteShow=true"/>
      </van-cell>
      <van-cell
      :title="item"
      v-for="(item , index) in searchHistories"
      :key="index"
      @click="onDelete(item,index)"
      >
          <van-icon name="close" v-show="isDeleteShow"></van-icon>
      </van-cell>
      <!-- <van-icon name="close" v-show="isDeleteShow"></van-icon> -->
  </div>
</template>

<script>
//import { setItem } from '@/utils/storage'

export default {
    name:"SearchHistory",
    data () {
        return {
            isDeleteShow:false
        }
    },
    props:{
        searchHistories:{
            type:Array,
            required:true
        }
    },
    methods:{
        onDelete (item,index) {
            if(this.isDeleteShow) {
                this.searchHistories.splice(index,1)
                //持久化处理
                //修改本地数据
                //请求接口删除线上的数据
                //无论是否登录都把数据存在本地
                //如果已登录，则删除线上数据，
                //没有删除单个数据的接口，只有删除全部数据的接口
                // setItem('search-histories',this.searchHistories)
                return

            } else {
                //不在删除状态，点击选项是搜索，
                this.$emit('search',item)
            }
        }
    }
}
</script>

<style scoped lang="less">

</style>