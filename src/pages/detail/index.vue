<template>
  <div>
    <div class="layer" v-if="adding"></div>
    <post-item></post-item>
    <div class="status">
      <div class="zheng-fan-vs">
        <div class="zheng">是</div>
        <div class="fan">不是</div>
        <div class="vs">VS</div>
      </div>
      <div class="bili">
        <div class="zhengbi">40%</div>
        <div class="fanbi">50%</div>
        <div class="mid-bar"></div>
      </div>
    </div>

    <div class="comment-box">
      <zheng-item></zheng-item>
      <fan-item></fan-item>
       <zheng-item></zheng-item>
      <fan-item></fan-item>
    </div>
    <div class="add-box">
         <div class="submit">发表</div>
   <input type="text" name="content" class="content" placeholder="我在得你的神评论" id="">
  
    </div>
  </div>
</template>

<script>
  import card from '@/components/card'
  import postItem from '@/components/post-item'
  import zhengItem from '@/components/zheng-item'
  import fanItem from '@/components/fan-item'
  export default {
    data() {
      return {
        pageName: 'detail',
        adding:false
      }
    },

    components: {
      card,
      postItem,
      zhengItem,
      fanItem
    },

    methods: {
      bindViewTap() {
        const url = '../logs/main'
        wx.navigateTo({
          url
        })
      },
      onGotUserInfo(e) {
        // 调用登录接口
        console.log(1)
        console.log(e.mp.detail.rawData)
        this.userInfo = JSON.parse(e.mp.detail.rawData)
        this.nihao = e.mp.detail.rawData['nikcName']
        console.log(this.userInfo)
      },
      clickHandle(msg, ev) {
        console.log('clickHandle:', msg, ev)
      }
    },

    created() {

      console.log(this.$mp)

    }
  }
</script>

<style scoped>
  .page-main {
    background: rgb(245, 246, 248);
    margin-bottom: 150rpx;
  }

  .vs {
    font-size: 34rpx;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    color: #000;
    width: 44rpx;
    height: 26rpx;
    margin: 0 auto;
    line-height: 120rpx;
  }

  .bili {

    height: 50rpx;

  }

  .zheng-fan-vs {
    height: 100rpx;
    position: relative;
    margin: 32rpx;
  }

  div.zheng {
    width: 280rpx;
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


  .bili {
    position: relative;
    margin: 32rpx;
  }

  .zhengbi {
    position: absolute;
    width: 49%;
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
    width: 49%;
    height: 30rpx;
    background: blue;
    color: #FFF;
    font-size: 26rpx;
    right: 0;
    text-align: right;
    line-height: 30rpx;
    border-top-right-radius: 15rpx;
    border-bottom-right-radius: 15rpx;
    top: 5rpx;
    padding-right: 1%;
  }

  .mid-bar {
    height: 44rpx;
    background: rgb(68, 68, 69);
    width: 4rpx;
    position: absolute;
    left: 48%;
    border-radius: 4rpx;
    top: -8rpx;
    border: 6rpx solid #fff;

  }

  .comment-box {
    background: #FFF;
    padding-bottom: 80rpx;
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
      height: 98rpx;
      background: rgb(247, 247, 250);
      border-top:1rpx solid #eee;
      position:fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1000;
  }
  .add-box .content {
      width: 590rpx;
      padding-left: 25rpx;
      height: 72rpx;
      border-radius: 35rpx;
      background: #FFF;
      line-height: 72rpx;
      font-size: 28rpx;
      margin: 10rpx 100rpx 10rpx 30rpx;
      
  }
  ::-webkit-input-placeholder{
      color: #EEE;
  }
  .add-box .submit{
      float: right;
      height: 72rpx;
      line-height: 72rpx;
      font-size: 28rpx;
      color: rgb(26, 26, 28);
      margin: 10rpx 27rpx 10rpx 27rpx;
  }
</style>
