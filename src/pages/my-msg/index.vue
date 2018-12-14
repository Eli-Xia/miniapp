<template>
  <div class="counter-warp">
    <login-btn :cb="callback" :showLogin="showLogin" :checkLogin="checkLogin" @setLogin="setLogin"> </login-btn>


    <div class="my-post" @click="goto('/pages/my-msg-ping/main')">
      <div class="my-post-icon"></div>
      <div class="my-comment-title">评论</div>
      <div class="sm-count" v-if="comments_count > 0">{{comments_count}}</div>
    </div>
    <div class="my-post" style="margin-top:-10rpx" @click="goto('/pages/my-msg-zan/main')">
      <div class="my-post-icon"></div>
      <div class="my-post-title">赞</div>
      <div class="sm-count" v-if="like_count > 0">{{like_count}}</div>
    </div>
    <login-btn @setLogin="setLogin"> </login-btn>

  </div>
</template>

<script>
  import fly from '../../utils/fly'
  import LoginBtn from '@/components/login'
  export default {
    data() {
      return {
        pageName: 'my-msg',
        info: {

        },
        callback: function () {},
        showLogin: false,
        checkLogin: false,
        like_count: 0,
        comments_count: 0
      }
    },
    methods: {

      setLogin() {

      },
      get_msg_count() {
        fly.post('/api/app/msg/count/comment').then(res => {
          if (res.retCode == 0) {
            this.comments_count = res.result
          

          } else if (retCode == 2) {

          } else {
            console.log(res)
          }
        })

          fly.post('/api/app/msg/count/like').then(res => {
          if (res.retCode == 0) {
            this.like_count = res.result
          

          } else if (retCode == 2) {

          } else {
            console.log(res)
          }
        })
      },
      goto(url) {
        wx.navigateTo({ url })

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
        title: '消息'
      })
      
    }


  }
</script>

<style scoped>
  .my-card {
    height: 245rpx;
    background: #FFF;
    border-radius: 10rpx;
    margin: 30rpx;
  }

  .my-card .face-name {
    padding-top: 34rpx;
    margin-left: 32rpx;
    width: 180rpx;
  }

  .my-card .face {
    width: 100rpx;
    height: 100rpx;
    padding-bottom: 26rpx;
  }

  .my-card .name {
    width: 590rpx;
    height: 190rpx;
    font-size: 29rpx;
    color: rgb(26, 26, 28)
  }

  .my-card .face img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .my-card .like {
    float: right;
    padding-right: 40rpx;
    padding-top: 70rpx;
  }

  .my-card .like .like-count {
    font-size: 60rpx;
    color: rgb(117, 122, 151);
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    font-weight: bold;

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
    padding: 20rpx 25rpx;
    position: relative;
  }

  .my-post-title {
    height: 80rpx;
    width: 200rpx;
    background: url(../../../static/img/good@2x.png) 0 0 no-repeat;
    background-size: auto 100%;
    font-size: 28rpx;
    line-height: 80rpx;
    padding-left: 110rpx;
    color: rgb(26, 26, 28);
  }

  .my-post-title.msg {
    height: 38rpx;
    width: 200rpx;
    background: url(../../../static/img/message@2x.png) 10rpx 4rpx no-repeat;
    background-size: auto 90%;
    font-size: 28rpx;
    line-height: 40rpx;
    padding-left: 66rpx;
    color: rgb(26, 26, 28);
  }

  .my-post-icon {
    float: right;
    height: 25rpx;
    width: 14rpx;
    margin-top: 30rpx;
    background: url(../../../static/img/箭头@2x.png) right 0rpx no-repeat;
    background-size: 100% 100%;
  }



  .my-comment-title {
    height: 80rpx;
    width: 200rpx;
    background: url(../../../static/img/pinglun0@2x.png) 0 0 no-repeat;
    background-size: auto 100%;
    font-size: 28rpx;
    line-height: 80rpx;
    padding-left: 110rpx;
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
    top: 44rpx;
  }
</style>