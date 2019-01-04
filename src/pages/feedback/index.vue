<template>
  <div class="page-warp">

    <div class="ok-box" v-if="send_ok">
      <div class="ok-img">

      </div>
      <div class="ok-text">
        已经收到您的反馈，我们会认真
        处理，尽快修复和完善相关功能
      </div>

    </div>



    <div class="form-box" v-if="!send_ok">
      <div class="banner">
        <div class="info">
          欢迎来到来辩论，作为一个上线不久的产品，我们需要
          您的反馈以便更好完善产品，谢谢！
        </div>
        <div class="ban-img"></div>
      </div>
      <div class="add">
        <h1 :pass="pss">问题和建议 </h1>
        <textarea name="content" auto-focus placeholder="请输入意见反馈，我们将不断改进!" v-model="content" id="content" />
        </div>
    <div class="add" style="height:260rpx;">
     
      
      <div  @click="send()" class="submit" >确定</div>
    </div>
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
        content:'',
        allowSend:false,
        checkLogin:false,
        showLogin:false,
        callback:function(){},
        sending:false,
        send_ok:false
      }
    },
    components: {
      LoginBtn
    },

    methods: {

      setLogin(loginStatus) {
        this.isLogin = loginStatus
      },
      send() {
          let url = '/api/app/feedback/add'
          let data = {
              content:this.content
          }

          if(data.content.length < 4) {
               wx.showToast({
              title: '请填认真填写',
              icon: 'none'
            })

            return false
          }
           this.sending = true
          fly.post(url,data).then(res=>{
              if(res.retCode == 0) {
                  //条追an页面
                  
                 this.send_ok = true
                 this.sending = false
              }
          })
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
    },
    onShow() {
        this.content = ''
        this.send_ok = false
        this.sending = false
    }
   
  }
</script>


<style scoped>

.page-warp {
    background: #FFF;
    position: absolute;
    bottom: 0rpx;
    top: 0rpx;
    left: 0;
    right: 0;
}
.ok-box {
   background: #FFF;
   left: 0;
   right: 0;
   bottom: 0;
   top:0;
}
.ok-img {
    width: 292rpx;
    height: 293rpx;
    background: url(../../../static/img/yijian.jpg) 0rpx 0rpx no-repeat;
    background-size: auto 100%;
    margin: 0 auto;
    margin-top: 116rpx;

}
.ok-text{
    width: 404rpx;
    height: 65rpx;
    font-size: 28rpx;
    margin: 40rpx auto;
}
  .add {
    padding: 30rpx;
   
    background: #FFF;
    height: 190rpx;

  }
  .done-img {
      width: 292rpx;
      height: 293rpx;
      background: url(../../../static/img/yijian@2x.png) 0rpx 0rpx no-repeat;
      background-size: auto 100%;
      position: absolute;
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
    background: #000;
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