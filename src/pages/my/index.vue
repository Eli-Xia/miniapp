<template>
  <div class="counter-warp">
    <login-btn :cb="callback" :showLogin="showLogin" :checkLogin="checkLogin" @setLogin="setLogin"> </login-btn>
    <div class="my-card">
      <div class="xunzhang-box" @click="goto('/pages/xunzhang/main')">
        <div :key="index" class="xunzhang" :class="'xun_'+item.code+(item.light ? ' light' : ' hui') " v-for="(item,index) in info.lightMedalCodeList">
        </div>
        <div class="right-btn" ></div>
      </div>

      <div class="face-name">
        <div class="face"><img :src="info.headImgUrl" alt=""></div>
        <div class="name">
          <div class="nick">{{info.nickname}}</div>
          <div class="like-count">获赞{{info.supportCount}}</div>
        </div>
      </div>

      <!-- 点亮勋章 -->

    </div>

    <div class="my-post " id="message" @click="goto('/pages/my-msg/main')">
      <div class="my-post-icon msg"></div>
      <div class="my-post-title msg">消息</div>
      <div class="sm-count" v-if="msg_count"> {{  msg_count }}</div>
      </div>

      <div class="my-post" @click="goto('/pages/my-post/main')">
        <div class="my-post-icon"></div>
        <div class="my-post-title">我的辩题</div>
      </div>

      <div class="my-post" @click="goto('/pages/my-comment/main')">
        <div class="my-post-icon"></div>
        <div class="my-comment-title">我的评论</div>
      </div>

      <div class="my-post" @click="goto('/pages/feedback/main')">
        <div class="my-post-icon"></div>
        <div class="my-feedback-title">意见反馈</div>
      </div>


      <login-btn @setLogin="setLogin"> </login-btn>
      <nav-bar :pageName="pageName"></nav-bar>
    </div>
</template>

<script>
  import fly from '../../utils/fly'
  import navBar from '@/components/nav-bar'
  import LoginBtn from '@/components/login'
  import { isLogin, login } from '../../utils/Login';
  export default {
    data() {
      return {
        pageName: 'my',
        info: {

        },
        callback: function () {},
        showLogin: false,
        checkLogin: false,
        msg_count: 0,
        xun_list: [{ code: 1, light: true }, { code: 2, light: false }]
      }
    },

    components: {
      navBar,
      LoginBtn
    },
    methods: {
      get_user() {
        this.callback = () => {
          this.get_user()
        }
        fly.post('/api/app/user/info', {}).then(res => {
          if (res.retCode == 0) {
            this.info = res.result

            this.showLogin = false
            this.checkLogin = false
          }
          if (res.retCode == 2) {
            wx.setStorageSync('token', null)
            wx.setStorageSync('isLogin', false)
            // this.showLogin = true
            this.checkLogin = true
          }
        }).catch(e => {
          console.log(e)
        })

      },
      get_my_msg() {
        fly.post('/api/app/user/info', {}).then(res => {
          if (res.retCode == 0) {
            this.info = res.result
            this.showLogin = false
            this.checkLogin = false
          }
          if (res.retCode == 2) {
            wx.setStorageSync('token', null)
            wx.setStorageSync('isLogin', false)
            // this.showLogin = true
            this.checkLogin = true
          }
        }).catch(e => {
          console.log(e)
        })
      },
      get_msg_count() {
        fly.post('/api/app/msg/count/total').then(res => {
          if (res.retCode == 0) {
            this.msg_count = res.result


          } else if (res.retCode == 2) {

          } else {
            console.log(res)
          }
        })


      },
      go_wall() {

      },
      setLogin() {

      },
      goto(url) {
        wx.navigateTo({ url })
      },
      set_css(item) {
        return `xun_${item.code}_${item.light}`
      }
    },
    onPullDownRefresh() {
      wx.stopPullDownRefresh();
    },
    onShow() {
      this.get_msg_count()
    },
    onLoad() {
      wx.setNavigationBarTitle({
        title: '个人中心'
      })
      this.get_user()

    }


  }
</script>

<style scoped>
  .my-card {
    height: 235rpx;
    background: #FFF;
    border-radius: 10rpx;
    margin: 30rpx;
    position: relative;
  }

  .my-card .face-name {
    padding-top: 34rpx;
    margin-left: 32rpx;
    float: left;
  }

  .face-name .face {
    width: 100rpx;
    height: 100rpx;
    padding-bottom: 26rpx;
    float: left;
  }

  .face-name .name {

    height: 190rpx;

    float: left;
    padding: 18rpx 20rpx;
    color: rgb(26, 26, 28)
  }

  .face-name .name .nick {
    font-size: 29rpx;
    font-weight: bold;
  }

  .face-name .name .like-count {
    font-size: 24rpx;
    padding-top: 6rpx;
    color: rgb(176, 178, 196);
  }

  .my-card .face img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .my-card .like {
    float: left;
    padding-right: 40rpx;
    padding-top: 70rpx;
  }

  .my-card .like .like-count {
    font-size: 10rpx;
    color: rgb(117, 122, 151);
    font-family: Arial, Helvetica, sans-serif;
    text-align: left;


  }

  .my-card .like .like-icon {
    height: 32rpx;
    color: rgb(176, 178, 196);
    font-size: 28rpx;
    width: 76rpx;
    padding-left: 30rpx;
    text-align: right;
    padding-top: 12rpx;
    background: url(../../../static/img/灰赞@2x.png) 5rpx 14rpx no-repeat;
    background-size: auto 80%;
  }

  .my-post {
    background: #FFF;
    border-radius: 10rpx;
    margin: 30rpx;
    padding: 36rpx 25rpx;
    position: relative;
  }

  .my-post-title {
    height: 38rpx;
    width: 200rpx;
    background: url(../../../static/img/辩题@2x.png) 10rpx 4rpx no-repeat;
    background-size: auto 90%;
    font-size: 28rpx;
    line-height: 40rpx;
    padding-left: 66rpx;
    color: rgb(26, 26, 28);
  }

  .my-post-title.msg {
    height: 38rpx;
    width: 200rpx;
    background: url(../../../static/img/message@2x.png) 10rpx 6rpx no-repeat;
    background-size: auto 80%;
    font-size: 28rpx;
    line-height: 40rpx;
    padding-left: 66rpx;
    color: rgb(26, 26, 28);
  }

  .my-post-icon {
    float: right;
    height: 25rpx;
    width: 14rpx;
    margin-top: 10rpx;
    background: url(../../../static/img/箭头@2x.png) right 0rpx no-repeat;
    background-size: 100% 100%;
  }



  .my-comment-title {
    height: 38rpx;
    width: 200rpx;
    background: url(../../../static/img/评论@2x.png) 10rpx 4rpx no-repeat;
    background-size: auto 90%;
    font-size: 28rpx;
    line-height: 40rpx;
    padding-left: 66rpx;
    color: rgb(26, 26, 28);
  }

  .my-feedback-title {
    height: 38rpx;
    width: 200rpx;
    background: url(../../../static/img/fankui.png) 10rpx 4rpx no-repeat;
    background-size: auto 90%;
    font-size: 28rpx;
    line-height: 40rpx;
    padding-left: 66rpx;
    color: rgb(26, 26, 28);
  }

  .sm-count {
    position: absolute;
    top: 10rpx;
    width: 36rpx;
    height: 36rpx;
    border-radius: 18rpx;
    font-size: 22rpx;
    line-height: 36rpx;
    text-align: center;
    background: rgb(241, 44, 32);
    color: #FFF;
    right: 60rpx;
    top: 37rpx;
  }

  .xunzhang-box {
    height: 52rpx;
    position: absolute;
    bottom: 5rpx;
    z-index: 100;
    padding-left: 32rpx;
    border-top: 1rpx solid rgb(245, 246, 248);
    left: 0;
    right: 0;
    padding-top: 12rpx;
    background: #FFF;
  }

  .xun_1 {
    background: url(../../../static/img/huozanlittle.png)
  }

  .xun_2 {
    background: url(../../../static/img/fabianlittle.png)
  }

  .light {}

  .hui {
    filter: grayscale(100%);
  }

  .xunzhang {
    width: 46rpx;
    height: 45rpx;
    float: left;
    margin-right: 16rpx;
    background-size: 100%;
  }

  .right-btn {
    float: right;
    height: 25rpx;
    width: 14rpx;
    margin-top: 10rpx;
    background: url(../../../static/img/箭头@2x.png) right 0rpx no-repeat;
    background-size: 100% 100%;
    margin-right: 25rpx;
  }
</style>