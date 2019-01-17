<template>
  <div class="counter-warp">
    <div class="my-card">
      <div class="like">
        <div class="like-count">{{info.supportCount}}</div>
        <div class="like-icon">获赞</div>
      </div>
      <div class="face-name">
        <div class="face"><img :src="info.headImgUrl" alt=""></div>
        <div class="name">{{info.nickname}}</div>
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
        id:0
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
</style>