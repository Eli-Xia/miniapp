<template>
  <div class="page-warp">
    <div class="banner">
      <div class="info">
        欢迎来到来辩论，作为一个上线不久的产品，我们需要
        您的反馈以便更好完善产品，谢谢！
      </div>
      <div class="ban-img"></div>
    </div>
    <div class="add">
      <h1 :pass="pss">问题和建议 </h1>
      <textarea name="content" auto-focus placeholder="请输入意见反馈，我们将不断改进!" v-model="sendData.content" id="content" />
      </div>
    <div class="add" style="height:220rpx;">
     
      
      <div v-if="!allowSend" class="submit" >确定</div>
    </div>
    <login-btn  :cb="callback" :showLogin="showLogin" :checkLogin="checkLogin" @setLogin="setLogin"> </login-btn>
    
  </div>
    
</template>
<script>
  import fly from '../../utils/fly'
  import '../../utils/Login'
  import navBar from '@/components/nav-bar'
  import LoginBtn from '@/components/login'
import { isLogin,login } from '../../utils/Login';
import { setTimeout } from 'timers';

  export default {
    data() {
      return {
        pageName: 'feedback',
        // isLogin: false,
        sendData:{
          left:null,
          right:null,
          content:null
        },
        allowSend:false,
        checkLogin:false,
        showLogin:false,
        callback:function(){},
        sending:false
        
      }
    },
    components: {
      LoginBtn
    },

    methods: {

      setLogin(loginStatus) {
        this.isLogin = loginStatus
      }
    },
    onShow() {
     //清空数据
     this.sendData={
          left:null,
          right:null,
          content:null
        }
    },
    onLoad() {
      wx.setNavigationBarTitle({
        title: '意见反馈'
      })
    }
   
  }
</script>


<style scoped>
  .add {
    padding: 30rpx;
    margin-bottom: 10rpx;
    background: #FFF;
    height: 190rpx;

  }

  .add h1 {
    font-size: 34rpx;
    color: rgb(26 26 28);
    margin: 0rpx;
  }

  #content {
    margin-top: 29rpx;
    font-size: 30rpx;
    width: 100%;
    height: 132rpx;
    /* border: 1rpx solid #ddd; */
    color: #444;
  }

  #content:focus {
    color: #444;
  }

  input {
    font-size: 30rpx;
    margin-left: 50rpx;
    margin-top: 8rpx;
  }

  .title {
    height: 42rpx;
    line-height: 44rpx;
    font-size: 34rpx;
    padding-left: 50rpx;
    color: rgb(26, 26, 28);
  }

  div.fan {
    width: 280rpx;
    float: right;
    text-align: left;
    height: 130rpx;
  }

  .zheng .title {
    background: url(../../../static/img/小正.png) 0rpx 0rpx no-repeat;
    background-size: auto 100%;
  }

  .fan .title {
    background: url(../../../static/img/小反.png) 0rpx 0rpx no-repeat;
    background-size: auto 100%;
  }

  div.zheng {
    width: 280rpx;
    float: left;
    height: 130rpx;
  }

  div.submit {
    height: 80rpx;
    border-radius: 40rpx;
    background: rgb(176, 178, 196);
    line-height: 80rpx;
    font-size: 34rpx;
    color: #FFF;
    clear: both;
    text-align: center;
    margin-top: 80rpx;
  }
  .submit.nosend {
    background: rgb(25, 25, 26);
  }

  .banner{
     height: 372rpx;
     background: #000;
     position: relative;
  }
  .info {
    padding: 40rpx;
    color: #FFF;
    font-size: 28rpx;
  }
  .ban-img {
    width: 372rpx;
    height: 225rpx;
    position: absolute;
    bottom: 0rpx;
    margin-left: -186rpx;
    left: 50%;
    background: url(../../../static/img/feedbg.png) 0rpx 0rpx no-repeat;
    background-size: auto 100%;
  }
</style>