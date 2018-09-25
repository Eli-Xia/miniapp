<template>
  <div class="page-warp">
    <div class="add">
      <h1 :pass="pss">发起辩题 </h1>
      <textarea name="content" auto-focus placeholder="例：该不该看情侣手机" v-model="sendData.content" id="content" />
      </div>
    <div class="add" style="height:220rpx;">
      <div class="fan">
        <div class="title">反方观点</div>
        <input  type="text" v-model="sendData.right"  placeholder="例：不该">
       </div>
         <div class="zheng">
        <div class="title">正方观点</div>
        <input type="text" v-model="sendData.left" placeholder="例：该">
      </div>
      
      <div v-if="allowSend" class="submit nosend" @click="sendPost">发表</div>
      <div v-if="!allowSend" class="submit" >发表</div>
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
        pageName: 'add',
        // isLogin: false,
        sendData:{
          left:null,
          right:null,
          content:null
        },
        allowSend:false,
        checkLogin:false,
        showLogin:false,
        callback:function(){}
        
      }
    },
    components: {
      LoginBtn
    },
    computed:{
      pss(){
        if(this.sendData.left && this.sendData.right && this.sendData.content){
          this.allowSend = true
        }else{
          this.allowSend = false
        }
        return 0
      }
    },
    methods: {
      sendPost() {
        this.callback = ()=>{
          this.sendPost()
        }
        let postData= {
          debateTopic: this.sendData.content,
          addDebateViewList: [
            { type: 1, content: this.sendData.left },
            { type: 2, content: this.sendData.right }
          ]
        }
        //验证数据合法
        if (!postData.debateTopic || !postData.addDebateViewList[0].content || !postData.addDebateViewList[1].content) {
           console.log("请填写完整")
        } else {
          fly.request("/api/app/dabate-topic/add",postData,{
            method:"post",
           
          }).then(data=>{
            if(data.retCode ==0) {

               wx.showToast({
                title: '发表成功',
                icon: 'right'
               })
               this.showLogin = false
               this.checkLogin = false
              //发布成功跳转首页
              setTimeout(()=>{
                let url ="/pages/index/main"
                 wx.navigateTo({url})
              },2000)
             
            }
            if(data.retCode == 2) {
              //重新登陆
              console.log('重新登录区哦')
                wx.setStorageSync('token', null)
                wx.setStorageSync('isLogin', false)
                this.checkLogin = true
            }
          })


        }
      },
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
        title: '发表辩题'
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

</style>