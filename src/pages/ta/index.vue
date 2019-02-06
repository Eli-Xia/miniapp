<template>
  <div class="counter-warp">
    <div class="my-card" :style="!has_medal ? 'height:195rpx':''">

      <div class="xunzhang-box" v-if="has_medal">
        <div :key="index" class="xunzhang" :class="'xun_'+item.code+(item.light ? ' light' : ' hui') " v-for="(item,index) in info.lightMedalCodeList">
        </div>
        <div class="right-btn" @click="goto('/pages/xunzhang/main')"></div>
      </div>

      <div class="face-name">
        <div class="face"><img :src="info.headImgUrl" alt=""></div>
        <div class="name">
          <div class="nick">{{info.nickname}}</div>
          <div class="like-count">获赞{{info.supportCount}}</div>
        </div>
      </div>

    </div>


    <div class="my-post" @click="goto('/pages/ta-post/main?id='+id)">
      <div class="my-post-icon"></div>
      <div class="my-post-title">ta的辩题</div>
    </div>

    <div class="my-post" @click="goto('/pages/ta-comment/main?id='+id)">
      <div class="my-post-icon"></div>
      <div class="my-comment-title">ta的评论</div>
    </div>
    <!-- <nav-bar :pageName="pageName"></nav-bar> -->
  </div>
</template>

<script>
  import fly from '../../utils/fly'
  import navBar from '@/components/nav-bar'
  export default {
    data() {
      return {
        pageName: 'ta',
        info: {

        },
        callback: function () {},
        showLogin: false,
        checkLogin: false,
        id: 0,
        has_medal: false
      }
    },

    components: {
      navBar
    },
    methods: {
      get_user() {
        this.callback = () => {
          this.get_user()
        }
        fly.post('/api/app/user/person-info', { id: this.id }).then(res => {
          if (res.retCode == 0) {
            this.info = res.result

            this.info.lightMedalCodeList.map(item => {
              if (item.light) {
                this.has_medal = true
              }
            })

          }
          if (res.retCode == 2) {

          }
        }).catch(e => {
          console.log(e)
        })

      },
      setLogin() {

      },
      goto(url) {
        wx.navigateTo({ url })

      }
    },
    onPullDownRefresh() {
      wx.stopPullDownRefresh();
    },
    onShow() {
      this.has_medal = false
      this.id = this.$root.$mp.query.id
      this.get_user()
    },
    onLoad() {
      wx.setNavigationBarTitle({
        title: 'ta的主页'
      })


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
    padding: 17rpx 25rpx;
    color: rgb(26, 26, 28)
  }

  .face-name .name .nick {
    font-size: 30rpx;
    font-weight: bold;
  }

  .face-name .name .like-count {
    font-size: 24rpx;
    padding-top: 3rpx;
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
</style>