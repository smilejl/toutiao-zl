<template>
  <div class="my-container">
    <van-cell-group v-if="user" class="my-info">
      <van-cell
      center
      class="base-info" 
      :border = false
      >
        <van-image
        class="avatar"
        slot="icon"
        round
        fit="cover"
        :src="currentUser.photo"
        />
        <div slot="title" class="name">{{currentUser.name}}</div>
        <van-button round size="small" class="update-info">编辑资料</van-button>
      </van-cell>
      <van-grid class="data-info" :border = false>
        <van-grid-item class="data-info-item">
          <div class="text-warp" slot="text">
            <div class="cont">{{currentUser.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-warp" slot="text">
            <div class="cont">{{currentUser.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-warp" slot="text">
            <div class="cont">{{currentUser.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-warp" slot="text">
            <div class="cont">{{currentUser.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
      <van-grid class="nav-grid" :column-num="2">
        <van-grid-item class="nav-grid-item-star" icon="star-o" text="收藏" />
        <van-grid-item class="nav-grid-item-his" icon="browsing-history-o" text="历史" />
      </van-grid>
      <van-cell title="消息通知" is-link url="" />
      <van-cell title="小智同学" is-link to="" />
      <van-cell
      title="退出登录"
      class="logout"
      v-if="user"
      @click="onLogout"
      ></van-cell>
    </van-cell-group>
    <div v-else class="no-loging">
      <div class="img" @click="$router.push('/login')">
        <van-image
        height="66px"
        width="66px"
        round
        fit="cover"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
      <div class="loging-text">登录/注册</div>
    </div>
    <!-- <div class="user-info">
      <div class="base-info"></div>
      <div class="data-inflo"></div>
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user'

export default {
  name: 'my',
  data(){
    return{
      currentUser:{}
    }
  },
  created(){
    this.loadCurrentUser()
  },
  methods: {
    async loadCurrentUser(){
      const { data } = await getCurrentUser()
      console.log(data)
      this.currentUser = data.data
    },
    onLogout(){
      //提示用户退出
      this.$dialog.confirm({
        title: '确认退出',
        message: '一定要走吗'
      })
        .then(() => {//确认执行这里
          // on confirm
          this.$store.commit('setUser',null)
        })
        .catch(() => {//退出执行这里
          // on cancel
        })
    }
  },
  computed:{
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
.my-container{
  .my-info{
  background-color: aqua;
  background-size: cover;
  .base-info{
    box-sizing: border-box;
    height: 115px;
    padding-top: 38px;
    padding-bottom: 11px;
    background-color: unset;
    .avatar{
      box-sizing: border-box;
      width: 66px;
      height: 66px;
      margin-right: 11px;
      border: 1px solid #fff;
    }
    .name{
      color: #fff;
      font-size: 15px;
    }
    .update-info{
      height: 16px;
      font-size: 10px;
      color: #666666;
    }
  }
  .data-info{
    .data-info-item{
      height: 65px;
      color: #fff;
      .text-warp{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .cont{
          font-size: 11px;
        }
        .text{
          font-size: 18px;
        }
      }
      
    }
  }
  }
  .no-loging{
    height: 180px;
    background-color:greenyellow;
    background-size: cover;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .loging-text{
      color: white;
      font-size: 20px;
    }
  }
  /deep/ .van-grid-item__content {
    background-color: unset;
  }
  .nav-grid{
    .nav-grid-item-star{
      height: 70px;
      color: #eb5253;
    }
    .nav-grid-item-his{
      color: #ff9d1d;
    }
  }
  .logout{
      text-align: center;
      color: #d86262;
  }
  .mb-4{
    margin-bottom: 4px;
  }
}

</style>