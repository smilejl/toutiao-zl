<template>
  <div class="suggestion">
      <van-cell
      icon="search"
      :title="item"
      v-for="(item , index) in suggestions"
      :key="index"
      @click="$emit('search',item)"
      >
      <div slot="title" v-html="highlight(item)"></div>
      </van-cell>
  </div>
</template>

<script>
import { getSuggestions } from '@/api/search'
import { debounce } from 'lodash'

export default {
    name:"SearchSuggestion",
    data () {
        return {
            suggestions:[]
        }
    },
    props: {
        searchText: {
            type: String,
            required:true
        }
    },
    watch: {
        // searchText () {
        //     console.log('hello')
        // }
        //监视的完整 写法，上面是简写
        searchText: {
            handler: debounce(async function () {
                //请求联想接口数据
                //展示数据
                const { data } = await getSuggestions (this.searchText)
                this.suggestions = data.data.options
            },1000),
            //该回调在侦听开始后立即调用
            immediate : true
        }
    },
    methods: {
        highlight (item) {
            //正则表达式/中间的内容/都会当做正则匹配模式来对待
            //错误写法：/this.searchText/gi
            //RegExp是正则的构造函数
            //参数一，字符串
            //参数二，匹配模式
            //参数三，正则对象
            //console.log(item)
            return item.replace(new RegExp(this.searchText, 'gi'),
            `<span style="color: red">${this.searchText}</span>`
            )
        }
    }
}
</script>

<style scoped lang="less">

</style>