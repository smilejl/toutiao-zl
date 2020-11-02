<template>
  <div class="login-container">
    <!-- 导航栏 -->
      <van-nav-bar
      title="登录"
      left-arrow
      @click-left="$router.back()"
      class="navbar"
      />
      <!-- 登录表单 -->
      <!-- 基于Vant的表单验证 -->
      <van-form
      :show-error="false" 
      :show-error-message="false" 
      @failed="onFailed"
      @submit="onLogin" 
      validate-first
      ref="login-form"
      >
        <van-field
          v-model="user.mobile"
          icon-prefix="icon"
          left-icon="shouji"
          placeholder="请输入手机号"
          :rules="formRules.mobile"
          name="mobil"
        />
        <van-field
          center
          v-model="user.code"
          clearable
          icon-prefix="icon"
          left-icon="yanzhengma"
          placeholder="请输入验证码"
          :rules="formRules.code"
          name="code"
          >
          <template #button>
            <van-count-down
              :time="1000*6"
              format="ss 秒"
              v-if = "isContShow"
              @finish="isContShow = false"
            ></van-count-down>
            <van-button
            class="send"
            size="mini"
            round
            @click.prevent="onSend"
            v-else
            :loading = "isLoadingShow"
            >发送验证码</van-button>
          </template>
        </van-field>
        <div class="login-button">
          <van-button class="btn" type="info" block>登录 / 注册</van-button>
        </div>
      </van-form>
      
  </div>
</template>

<script>

import { login, send } from '@/api/user'
import { Toast } from 'vant'
import store from '@/store/index'

export default {
    name: "loginIndex",
    components:{

    },
    props: {

    },
    data () {
      return {
        user:{
           mobile:'',//手机号
           code:''//验证码
        },
        formRules:{

          mobile:[{ required: true , message: '请输入用户名'},
                  { pattern: /^1[3|5|7|8|9]\d{9}$/,message:'请输入正确的手机号' }//手机号正则表达式验证规则
          ],
          code:[{ required: true , message: '请输入验证码'},
                { pattern: /^\d{6}$/, message:'验证码错误' }
          ]
        },
        isContShow :false,//倒计时显示判断
        isLoadingShow : false //发送验证码加载状态,防止网络慢用户多次点击发送行为
      }
    },
    methods:{
      async onLogin () {
        //加载动画
        Toast.loading({
          message: '登录中...',
          forbidClick: true,//禁止背景点击
          duration: 0 //展示时长，值为0时，toast不会消失
        })
                //1找到数据接口
        //2封装请求方法
        try{
          const res = await login(this.user)
            Toast.success('登录成功')

            //登录成功 ，返回原来页面
            this.$router.back()//这种方式不太好，
            //将后端的数据（token）放入vuex中
            this.$store.commit('setUser', res.data.data)
            
        } catch(err) {
            Toast.fail('登录失败')
          } 
      },
      onFailed (error) {
        if(error.errors[0]){
          this.$toast({
            message:error.errors[0].message,
            position:'top'
          })
        }
    },
      async onSend (){
        
      //校验验证码
      try{
        await this.$refs['login-form'].validate('mobil')
        //
        this.isContShow = true
        this.isLoadingShow = true
        //验证通过 请求发送验证码
        const res = await send(this.user.mobile)
        //try里任何错误都会进入catch
        
      } catch (err){
        //发送短信失败的错误提示
          let message = ''
          if(err && err.response && err.response.status === 429){
            message = '发送太频繁了，请稍后重试'
          } else if(err.name === 'mobile'){
            //手机号错误提示
            message = err.message
          } else {
            //未知错误
            message = '发送失败，请重试'
          }
          this.$toast({
            message,
            position: 'top'
          })
      }
      //无论发送成功或者失败，都要关闭Loading状态
      this.isLoadingShow = false
      //验证通过=》请求发送验证码=》用户接受短信=》输入验证码=》登录请求
      //请求发送验证码-》隐藏发送按钮=》显示倒计时=》倒计时结束=》显示发送按钮
      }
    }
   

}
</script>

<style scoped lang="less">
  @import url('../../styles/index.less');
  .login-container{
    .send{
      //width: 76px;
      height: 23px;
      background-color: #ededed;
      van-button__text{
        font-size: 11px;
        color: #666666;
      }
    }
    .login-button{
      padding: 26px 16px ;
      .btn{
        background-color: #6db4fb;
        border: none;
        van-button__text{
          font-size: 15px;
        }
      }
    }
  }
    
  
  
</style>