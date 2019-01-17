<template>
  <div class="page-warp">
    <div class="bianti" :pass="pss">
      <div class="b-content">
        {{detail['float_text']}}
      </div>
      <div class="open-btn" v-if="open_content" @click="open_box()">{{open_btn_text}}</div>
    </div>
    <div class="add" v-if="!loading">
      <div class="f-title">
        <span :class="tips ? 'dou' : 'budou'" style="font-size:25rpx"> 请选择正反方</span>
        <div class="status">

          <div class="zheng-fan-vs" style="margin:0; margin-top: 25rpx;">
            <div :class="commentData.debatViewType == 1 ? 'zheng-selected' : 'zheng'" @click="seyDebat(1)">{{leftText}}</div>
            <div :class="commentData.debatViewType == 2 ? 'fan-selected' : 'fan'" @click="seyDebat(2)">{{rightText}}</div>

            <div class="vs">VS</div>
          </div>
        </div>

      </div>

    </div>
    <div class="add-form">
      <textarea @blur="checkForm" name="content" placeholder="我在等你的神评呢!" v-model="commentData.content" id="content" />

      <div v-if="allowSend  && !sending" class="submit nosend" @click="sendComment">发表</div>
      <div v-if="allowSend &&  sending" class="submit nosend">发表</div>
      <div v-if="!allowSend" @click="checkForm" class="submit" >发表</div>
    </div>
    <login-btn  :cb="callback" :showLogin="showLogin" :checkLogin="checkLogin" @setLogin="setLogin"> </login-btn>
    
  </div>
    
</template>
<script>
  import fly from '../../utils/fly'
  import '../../utils/Login'
    import utils from '../../utils'
  import navBar from '@/components/nav-bar'
  import LoginBtn from '@/components/login'
import { isLogin,login } from '../../utils/Login';
import { setTimeout } from 'timers';

  export default {
    data() {
      return {
        pageName: 'comment-add',
        // isLogin: false,
        sendData:{
          left:null,
          right:null,
          content:null
        },
        tips:false,
         detail: {},
        id: 0,
        leftText: null,
        rightText: null,
        leftBi: 50,
        rightBi: 50,
        leftId: 0,
        rightId: 0,
        selectedType: 0,
        allowSend:false,
        checkLogin:false,
        showLogin:false,
        callback:function(){},
        sending:false,
        id:0,
       commentData: {
          debateTopicId: this.id,
          debatViewType: 0,
          content: null
        },
        open_content:false,
        long_text:false,
        short_text:'',
        open_btn_text:'展开辩题',
        sending:false,
        loading:false
          
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

      open_box() {
          this.long_text = !this.long_text 

          if(this.long_text  == false) {
              this.open_btn_text = '展开辩题'
              this.detail['float_text'] = this.short_text
          }else{
              this.open_btn_text = "收起辩题"
             this.detail['float_text'] = this.detail['debateTopic'] 
          }
      },
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

        if(this.sendData.left.length > 6 || this.sendData.right.length >6) {
           wx.showToast({
                title: '观点不能大于6个',
                icon: 'none'
               })
               this.sending = false
               return false
        }
        //验证数据合法
        if (!postData.debateTopic || !postData.addDebateViewList[0].content || !postData.addDebateViewList[1].content) {
           console.log("请填写完整")
        } else {
           
           
           this.sending = true
          fly.request("/api/app/dabate-topic/add",postData,{
            method:"post",
           
          }).then(data=>{
             this.sending = false
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
                wx.navigateBack()
              },1000)
             
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
      },
       seyDebat(id) {
        this.commentData.debatViewType = id
        this.checkForm()
        
      },
      checkForm() {
          this.tips = false
          console.log(false)
          if (!this.commentData.debateTopicId || !this.commentData.debatViewType || !this.commentData.content) {
         if(!this.commentData.debatViewType) {
              this.tips = true
         }else{
             this.tips = false
         }
         this.allowSend = false
        }else{
          this.allowSend = true
           this.tips = false
          
        }
        console.log(this.commentData)
      },
      get_detail(id) {
        let data = {
          debateTopicId: id
        }
        let url = '/api/app/debate-view/info'
        fly.post(url, data).then(res => {
          if (res.retCode == 0) {
            this.detail['headImgUrl'] = res.result.sponsorHeadImgUrl
            this.detail['nickname'] = res.result.sponsorNickname
            this.detail['debateTopic'] = res.result.debateTopic
            
            if(res.result.debateTopic.length > 18) {
              this.detail['float_text'] = res.result.debateTopic.substr(0, 18) + '...'
              this.short_text = res.result.debateTopic.substr(0, 18) + '...'
              this.open_content = true
            }else{
              this.detail['float_text'] =  res.result.debateTopic
              this.open_content = false
            }
            this.detail['createTime'] = utils.formatTime(new Date(res.result.createTime))
            this.detail['forwardCount'] = res.result.forwardCount || '分享'
            this.detail['commentCount'] = res.result.commentCount || '评论'
            this.detail['id'] = res.result.debateTopicId
            this.detail['qrCodeUrl'] = res.result.qrCodeUrl
            this.detail['userId'] = res.result.userId
            this.detail['debateTag'] = res.result.debateTag


            this.leftText = res.result.leftViewContent
            this.rightText = res.result.rightViewContent
            this.leftBi = res.result.leftViewProportion
            this.piao_left = res.result.leftViewSupportNum
            this.piao_right = res.result.rightViewSupportNum
            this.rightBi = res.result.rightViewProportion
            this.leftId = res.result.leftViewId
            this.rightId = res.result.rightViewId
            this.selectedType = res.result.selectedType

            
              this.loading = false
            



          } else {
            wx.showToast({
              title: '数据异常',
              icon: 'none'
            })
          }
        }).catch(e => {
          console.log(e)
        })
      },

      sendComment() {

        this.callback = () => {
          this.sendComment()
        }
        if (!this.commentData.debateTopicId || !this.commentData.debatViewType || !this.commentData.content) {
          this.tips = true
          return false
        }
        this.tips = false
        console.log(111)
        let url = '/api/app/comment/add'
        this.sending = true
        fly.post(url, this.commentData).then(res => {

          if (res.retCode == 0) {
            console.log(res, '=====')
            wx.showToast({
              title: '评论成功！',
              icon: 'right'
            })
            
            this.sending = false
            this.nowPage = 1
            this.commentData.debatViewType = null
            this.commentData.debateTopicId = 0
            this.commentData.content = ''
            this.showLogin = false
            this.checkLogin = false
             wx.navigateBack()
          } else if (res.retCode == 2) {
            wx.setStorageSync('token', null)
            wx.setStorageSync('isLogin', false)
            // this.showLogin = true
            this.checkLogin = true

            
            console.log(res)
          } else {
            wx.showToast({
              title: retMsg,
              icon: 'none'
            })
          }

        }).catch(e => {
          console.log(e)
        })

      },
    },
    onShow() {
     //清空数据
     this.commentData = {
          debateTopicId: this.id,
          debatViewType: 0,
          content: null
        }
    },
    onLoad() {
      wx.setNavigationBarTitle({
        title: '辩题评论'
      })

      this.id = this.$root.$mp.query.id
      this.commentData.debateTopicId = this.id
      this.get_detail(this.id)
    }
   
  }
</script>


<style scoped>

.page-warp {
    background: #FFF;
    position: absolute;
    height: 100%;
    width: 100%;
}

  .add {
    padding: 10rpx 30rpx;
    margin-bottom: 10rpx;
    background: #FFF;
   

  }

  .add h1 {
    font-size: 34rpx;
    color: rgb(26 26 28);
    margin: 0rpx;
  }

  #content {
    margin-top: 39rpx;
    font-size: 27rpx;
    width: 96%;
    color: rgb(176, 178, 196);
    height: 240rpx;
    border-radius: 10rpx;
    padding: 2%;
    /* border: 1rpx solid #ddd; */
    color: #444;
    background: rgb(245, 246 ,248)
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
    margin-top: 30rpx;
  }
  .submit.nosend {
    background: rgb(25, 25, 26);
  }

  .bianti {
     
      border-bottom: 6rpx solid rgb(245, 246, 248); 
     
  }
   .form-post {
    padding: 20rpx 30rpx;
    background: #FFF;
    position: fixed;
    bottom: 10rpx;
    left: 0;
    right: 0;
    z-index: 1500;
    background: #FFF;

  }

  .f-title {
    font-size: 28rpx;
    color: #333;
    margin-top: 20rpx;
  }

  .page-main {
    background: rgb(245, 246, 248);
    margin-bottom: 150rpx;
  }

  .vs {
    font-size: 34rpx;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 400;
    color: #000;
    width: 44rpx;
    height: 26rpx;
    margin: 0 auto;
    line-height: 120rpx;
  }

  .bili {

    height: 80rpx;

  }

  .zheng-fan-vs {
    height: 100rpx;
    position: relative;
    margin: 32rpx;
  }

  div.zheng {
    width: 282rpx;
    height: 100rpx;
    position: absolute;
    line-height: 120rpx;
    left: 0rpx;
    top: 0rpx;
    font-size: 30rpx;
    background: url(../../../static/img/正方空@2x.png) 0rpx 0rpx no-repeat;
    background-size: auto 100%;
    text-align: center;
    color: rgb(255, 55, 56);

  }

  div.zheng-selected {
    width: 280rpx;
    height: 100rpx;
    position: absolute;
    line-height: 120rpx;
    left: 0rpx;
    top: 0rpx;
    font-size: 30rpx;
    background: url(../../../static/img/11@2x.png) no-repeat;
    background-size: auto 100%;
    text-align: center;
    color: #FFF;
  }



  div.fan {
    width: 280rpx;
    height: 100rpx;
    position: absolute;
    right: 0rpx;
    top: 0rpx;
    font-size: 30rpx;
    color: rgb(67, 112, 239);
    font-size: 30rpx;
    background: url(../../../static/img/反方空@2x.png) 0rpx 0rpx no-repeat;
    background-size: auto 100%;
    text-align: center;
    line-height: 120rpx;
  }

  div.fan-selected {
    width: 282rpx;
    height: 100rpx;
    position: absolute;
    line-height: 120rpx;
    right: 0rpx;
    top: 0rpx;
    font-size: 30rpx;
    background: url(../../../static/img/反方实@2x.png) no-repeat;
    background-size: auto 100%;
    text-align: center;
    color: #FFF;
  }

  .bili {
    position: relative;
    margin: 32rpx;
  }

  .zhengbi {
    position: absolute;

    height: 30rpx;
    background: red;
    color: #FFF;
    font-size: 26rpx;
    line-height: 30rpx;
    border-top-left-radius: 15rpx;
    border-bottom-left-radius: 15rpx;
    left: 0;
    top: 5rpx;
    padding-left: 1%;
  }

  .fanbi {
    position: absolute;

    height: 30rpx;
    background: linear-gradient(rgb(60, 126, 214), rgb(67, 112, 239));
    /* 标准的语法 */
    color: #FFF;
    font-size: 26rpx;
    right: 0;
    text-align: right;
    line-height: 30rpx;
    border-top-right-radius: 15rpx;
    border-bottom-right-radius: 15rpx;
    top: 5rpx;
    overflow: hidden;
    padding-right: 0%;
  }

  .mid-bar {
    height: 44rpx;
    /* background: rgb(39, 39, 43); */
    width: 10rpx;
    position: absolute;
    border-radius: 4rpx;
    top: -3rpx;
    overflow: hidden;
    background: url(../../../static/img/mid-bar.png);
    background-size: 100% 100%;
    /* border: 4rpx solid #fff; */

  }

  .comment-box {
    background: #FFF;
    padding-bottom: 160rpx;
    min-height: 800rpx;
    clear: both;
  }

  .layer {
    background: #666;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
  }

  .add-box {
    min-height: 98rpx;
    background: rgb(247, 247, 250);
    border-top: 1rpx solid #eee;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }

  .add-box .content {
    width: 582rpx;
    padding-left: 25rpx;
    height: 72rpx;
    border-radius: 35rpx;
    background: #FFF;
    line-height: 72rpx;
    font-size: 28rpx;
    /* color: #999; */
    margin: 30rpx 120rpx 10rpx 50rpx;

  }

  ::-webkit-input-placeholder {
    color: #EEE;
  }

  .add-box .submit {
    float: right;
    height: 72rpx;
    line-height: 72rpx;
    font-size: 28rpx;
    color: rgb(26, 26, 28);
    margin: 10rpx 27rpx 10rpx 27rpx;
  }

  .layer {
    background: rgba(0, 0, 0, .6);
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
  }

  .form-post {
    padding: 20rpx 30rpx;
    background: #FFF;
    position: fixed;
    bottom: 10rpx;
    left: 0;
    right: 0;
    z-index: 1500;
    background: #FFF;

  }

  .f-title {
    font-size: 32rpx;
    color: #333;
    margin-top: 25rpx;
  }

  .no-comment {
    padding-top: 50rpx;
  }

  .no-comment h2 {
    clear: both;
    border-radius: 10rpx;
    padding: 10rpx;
    background: none;
    margin: 40rpx;
    height: 90rpx;
    line-height: 90rpx;
    color: #ccc;
    /* margin-top: 90rpx!important; */

    text-align: center;

  }

  .phcolor {
    /* color: rgb(176, 178, 196) */
    color: red;
  }

  ::input-placeholder {
    color: red;
  }

  .text-box {
    width: 100%;
    position: relative;
    min-height: 80rpx;
    margin-top: 17rpx;
  }

  .text-box .text {
    display: block;
    visibility: hidden;
    word-break: break-all;
    word-wrap: break-word;
  }

  .text-box .weui-textarea {
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    overflow-y: hidden;
    word-break: break-all;
    word-wrap: break-word;
  }

  #canvas-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -100;
  }

  .add-box #say-btn {
    position: absolute;
    width: 60rpx;
    height: 60rpx;
    left: 16rpx;
    top: 19rpx;
    background: url(../../../static/img/say@2x.png);
    background-size: 100% 100%;
  }

  .add-box #fen-btn {
    position: absolute;
    width: 50%;
    height: 0rpx;
    right: 0rpx;
    top: 19rpx;
  }

  .add-box #ping-btn {
    position: absolute;
    width: 50%;
    height: 0rpx;
    left: 0rpx;
    top: 19rpx;
  }

  #ping-btn .p-btn {

    width: 56rpx;
    height: 32rpx;
    font-size: 28rpx;
    color: #999;
    line-height: 32rpx;
    margin: 0 auto;
    background: url(../../../static/img/评论@2x.png) no-repeat;
    background-size: auto 100%;
    padding-left: 46rpx;
    margin-top: 16rpx;
    margin-left: 142rpx;
  }

  #fen-btn .f-btn {

    width: 56rpx;
    height: 30rpx;
    font-size: 28rpx;
    color: #999;
    line-height: 30rpx;
    margin: 0 auto;
    background: url(../../../static/img/转发@2x.png) no-repeat;
    background-size: auto 94%;
    padding-left: 46rpx;
    margin-top: 16rpx;
    margin-right: 142rpx;
  }

  #say-add {
    background: #FFF;
    height: 518rpx;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99999;
  }

  .say-layer {
    background: rgba(0, 0, 0, .6);
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    position: fixed;
    z-index: 9999;
  }

  .say-bottom {
    height: 140rpx;
    bottom: 0rpx;
  }

  .say-bottom .button-1 {
    width: 70rpx;
    height: 34rpx;
    position: absolute;
    font-size: 36rpx;
    text-align: center;
    bottom: 63rpx;
    left: 92rpx;
    color: rgb(111, 111, 113);
  }


  .say-bottom .button-3 {
    width: 70rpx;
    height: 34rpx;
    position: absolute;
    font-size: 36rpx;
    text-align: center;
    bottom: 63rpx;
    color: rgb(76, 160, 72);
    right: 92rpx;
    color: rgb(111, 111, 113);
  }

  .say-bottom .button-2 {
    width: 110rpx;
    height: 110rpx;
    position: absolute;
    font-size: 36rpx;
    text-align: center;
    bottom: 30rpx;
    left: 50%;
    margin-left: -55rpx;

    color: rgb(111, 111, 113);
    background: url(../../../static/img/sayButton.png);
    background-size: 100% 100%;
  }

  .start_saying {
    width: 140rpx;
    height: 140rpx;
    position: absolute;
    font-size: 36rpx;
    text-align: center;
    bottom: 15rpx;
    left: 50%;
    margin-left: -70rpx;
    border-radius: 50%;
    color: rgb(111, 111, 113);
    background: rgba(0, 0, 0, .1)
  }

  .start_text {
    position: absolute;
    left: 0;
    bottom: 170rpx;
    width: 190rpx;
    left: 50%;
    margin-left: -90rpx;
    text-align: center;
    font-size: 20rpx;
    color: #555;
  }

  .say_content {
    position: absolute;
    top: 20rpx;
    left: 20rpx;
    right: 20rpx;
  }

  .noPage {
    background: rgba(245, 246, 248);
    position: absolute;
    top: 0rpx;
    left: 0rpx;
    right: 0rpx;
    bottom: 0rpx;
  }

  .delete_icon {
    width: 244rpx;
    height: 194rpx;
    position: absolute;
    left: 50%;
    margin-left: -122rpx;
    top: 50%;
    margin-top: -120rpx;
    background: url(../../../static/img/delete.png);
    background-size: 100% 100%;
  }

  .adding {
    color: #222;
  }

  .float-view {
    position: fixed;
    background: #FFF;
    left: 0;
    right: 0;
    z-index: 999999;
    display: none;
    height: 110rpx;
    padding: 10rpx 45rpx;
    animation-iteration-count: infinite;
    border-bottom: 10rpx solid rgb(245, 246, 248);
  }

  .float-view.hide {

    animation: slideup 1s;
    top: -300rpx;
  }

  .float-view.show {

    animation: slidedown 1s;
    top: 0;

  }

  @keyframes slideup {
    0% {
      top: 0rpx;
    }

    50% {
      top: -200rpx;
    }

    100% {
      top: -200rpx;
    }
  }


  @keyframes slidedown {
    0% {
      top: -200rpx;
    }

    50% {
      top: 0;
    }

    100% {
      top: 0;
    }
  }

  .content-1 {
    height: 130rpx;

    font-size: 28rpx;
    color: rgb(176, 178, 196);
  }

  .guandian {
    /* border: 1rpx solid #ddd; */
    position: absolute;
    top: 0rpx;
    right: 0rpx;
    left: 0rpx;
  }

  .guandian .left {
    height: 42rpx;
    width: 45%;
    position: absolute;
    left: 42rpx;
    top: 64rpx;
    padding-left: 52rpx;
    background: url(../../../static/img/小正@3x.png) no-repeat;
    background-size: auto 100%;
    font-size: 28rpx;
    color: rgb(255, 55, 56);
  }


  .guandian .right {
    height: 42rpx;
    width: 45%;
    position: absolute;
    right: 42rpx;
    top: 64rpx;
    padding-right: 52rpx;
    background: url(../../../static/img/小反@3x.png) top right no-repeat;
    background-size: auto 100%;
    font-size: 28rpx;
    text-align: right;
    color: rgb(67, 112, 239);
  }

  .piao-left {
    position: absolute;
    left: 0;
    top: 48rpx;
    font-size: 22rpx;
    color: rgb(117, 122, 151);
  }

  .piao-right {
    position: absolute;
    right: 0;
    top: 48rpx;
    font-size: 22rpx;
    color: rgb(117, 122, 151);
  }

  .b-content {
      margin: 31rpx;
      margin-bottom: 20rpx;
      color: rgb(26, 26, 28);
      font-size: 34rpx;
  }

  .open-btn {
      padding: 26rpx;
      padding-top: 0rpx;
      margin-top: 0rpx;
      color: rgb(67, 112, 239);
      text-align: center;
      font-size: 28rpx;
  }

  .add-form {
      padding: 30rpx;
      padding-top: 0rpx;
  }
  span.dou {
      color: red;
      animation: douya .2s;
  }
  span.budou {
      color: #666;
  }

  @keyframes douya
{
  0%   {margin-left: 0rpx}  
  20%  {margin-left: 8rpx}
   50%  {margin-left: 0rpx}
   80%  {margin-left: 8rpx}
  100% {margin-left: 0rpx}
}
</style>