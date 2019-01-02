<template>
  <div class="item-box">
    <div class="item-mid" @click="go_feed">
      <div class="img">

      </div>

      <h2>意见反馈</h2>
      <div class="info">
        听说，您提供的建议我们都改了呢!
      </div>

      <div class="btn"></div>
    </div>

  </div>
</template>

<script>
  export default {
    props: ['item'],
    data() {
      return {
        clicked: false
      }
    },
    methods: {
      like(id) {

      },
      go_feed() {
        let url = '/pages/feedback/main'
        wx.navigateTo({ url })
      }
    }
  }
</script>

<style scoped>
  .item-box {
    margin: 10rpx 0rpx;
    border-radius: 0rpx;
    background: none;
    margin-top: -6rpx;
    padding-bottom: 0rpx;
    height: 205rpx;
    /* border: 1rpx solid #000; */
  }

  .item-mid {
    margin: 30rpx 0rpx 27rpx 38rpx;

  }

  .item-mid h2 {
    font-size: 34rpx;
    color: rgb(26, 26, 28);
    padding-top: 50rpx;
  }

  .item-mid .info {
    padding-top: 4rpx;
    font-size: 22rpx;
    color: rgb(95, 95, 95);
  }

  .item-mid .img {
    width: 273rpx;
    height: 217rpx;
    position: absolute;
    right: 0;
    bottom: 0;
    background: url(../../static/img/rentou1.png) no-repeat;
    background-size: 100% 100%;
  }

  .zheng-icon {
    position: absolute;
    width: 30rpx;
    height: 30rpx;
    left: -8rpx;
    top: -8rpx;
    background: url(../../static/img/小正.png) no-repeat;
    background-size: 100% 100%;
  }

  .btn {
    width: 54rpx;
    height: 21rpx;
    background: url(../../static/img/jiantou1.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 30rpx;
  }
</style>