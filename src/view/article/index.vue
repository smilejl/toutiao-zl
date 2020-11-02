<template>
  <div class="article-item">
      <van-nav-bar
        class="app-nav-bar"
        title="文章详情"
        left-arrow
        @click-left="$router.back()"
      />
      <div class="article-wrap">
        <h1 class="title">{{article.title}}</h1>
        <van-cell class="user-info">
          <div slot="title" class="name">{{article.aut_name}}</div>
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"/>
            <div slot="label" class="label">{{article.pubdate | relativeTime}}</div>
            <van-button
              :loading="isLoading"
              @click="onFollow"
              round
              size="small"
              :type="article.is_followed ? 'default' : 'info'"
              class="btn"
              :icon="article.is_followed ? '' : 'plus'"
            >{{article.is_followed ? '已关注' : '关注'}}</van-button>
        </van-cell>
        <div class="content markdown-body">
          <div class="markdown-body" v-html="article.content" ref="article-content"></div>
        </div>
      </div>
      <div class="article-bottom">
        <van-button
          class="comment-btn"
          type="default"
          round
          size="small"
        >写评论</van-button>
        <van-icon
          name="comment-o"
          info="123"
          color="#777"/>
        <van-icon
          
          :color="article.is_collected ? 'orange' : '#777'"
          :name="article.is_collected ? 'star' : 'star-o'"
          @click="onCollect"
        />
        <van-icon
          color="#777"
          name="good-job-o"/>
        <van-icon name="share" color="#777777">

        </van-icon>
      </div>
  </div>
</template>

<script>
import './github-markdown.css'
import { getArticleByid,addCollect,deleteCollect } from '@/api/articles'

import { ImagePreview } from 'vant'
import { addFollow,deleteFollow,} from '@/api/user'

export default {
    name:"articleItem",
    data () {
      return {
        article:{},
        isLoading:false, //关注按钮的Loading状态
        isCollectLoading:false
      }
    },
    props:{
      articleId:{
        type: [String,Number,Object],
        required:true
      }
    },
    created () {
      this.loadArticle()
    },
    methods: {
      async loadArticle(){
        const { data } = await getArticleByid(this.articleId)
        this.article = data.data
        this.$nextTick(() =>{
          this.handlePreviewImg()
        })
      },
      handlePreviewImg () {
        //获取文章详情的DOM容器
        const articleContent = this.$refs['article-content']
        //得到所有的img标签
        const imgs = articleContent.querySelectorAll('img')
        const imgsPaths = []
        imgs.forEach(img=> {
          imgsPaths.push(img.src)
          img.onclick = function () {
            ImagePreview({
              images:imgsPaths,
              startPosition: 1,
            })
          }
        })
      },
      async onFollow() {
        this.isLoading = true
        if(this.article.is_follow){
          //已关注，点击取消关注
          await deleteFollow(this.article.aut_id)
        } else {
          //未关注，点击关注
          await addFollow(this.article.aut_id)
        }
        this.article.is_followed = !this.article.is_followed
        this.isLoading = false
      },
      async onCollect () {
        this.$toast.loading({
          message:'操作中。。。',
          forbidClick:true //禁止背景点击
        })
        if(this.article.is_collected){
          //已收藏，点击取消
          await deleteCollect(this.articleId)
        } else {
          //为收藏，点击收藏
          await addCollect(this.articleId)
        }
        //更新视图
         this.article.is_collected = !this.article.is_collected
         this.$toast.success(`${this.article.is_collected ? '' : '取消'}收藏成功`)
      }
    }
}
</script>

<style lang="less" scoped>
.article-item{
  .article-wrap{
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y:auto;
  }
  .article-bottom{
    height: 44px;
    width: 100%;
    background-color: white;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    .comment-btn{
      width: 120px;
      margin-right: 20px;
      //background-color: red;
    }
    .van-icon{
      
      flex: auto;
    }
   
  }
  .title{
    font-size: 20px;
    color: #3a3a3a;
    padding: 14px;
    margin: 0;
  }
  .user-info{
    .avatar{
      width: 35px;
      height: 35px;
      margin-right: 8px;
    }
    .name{
      font-size: 13px;
      color: #333333;
    }
    .label{
      font-size: 11px;
      color: #b4b4b4;
    }
    .btn{
      width: 85px;
      height: 29px;
    }
  }
  .markdown-body{
      padding: 14px;
  }
}
  

</style>

