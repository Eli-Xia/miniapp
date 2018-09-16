<template>
  <div class="item-box">
    <div class="item-top">
      <div class="face">
          <div class="zheng-icon"></div>
          <img src="../../static/img/face-1.png" />
          </div>
      <div class="like-btn">
        344
      </div>
      <div class="name-date">
        <div class="nickname">神奇的大蘑菇</div>
        <div class="add-date">09/12</div>
      </div>
    </div>
    <div class="item-bottom">
      <p>诚实，谦虚是我们众所周知的美德，而
        这些美德的目标是“不给别人添麻烦。”</p>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
  export default {
    props: ['item']
  }
</script>

<style scoped>
  .item-box {
    margin: 10rpx 0rpx;
    border-radius: 0rpx;
    background: none;

    padding-bottom: 0rpx;
   
    
  }

  .item-box .item-top {
    padding: 24rpx;
    padding-left: 0rpx;
    height: 42rpx;
  }

  .item-top .face {
    width: 72rpx;
    height: 72rpx;
    float: right;
    position: relative;
  }

  .item-top .face img {
    width: 72rpx;
    height: 72rpx;
    border-radius: 50%;
  }

  .item-top .name-date {
    float: right;
    margin-right: 11rpx;
    line-height: 30rpx;
    margin-top: 8rpx;
    text-align: right;
  }

  .item-mid {
    clear: both;
    font-size: 32rpx;
    color: rgb(26, 26, 28);
    padding: 24rpx 58rpx;
    line-height: 37rpx;
  }



  .nickname {
    font-size: 24rpx;
    color: rgb(158, 160, 181);

  }

  .add-date {
    font-size: 22rpx;
    color: rgb(158, 160, 181);
  }

  .item-bottom {
    padding: 22rpx;
    border-radius: 10rpx;
    margin-left: 81rpx;
     margin-right: 100rpx;
    margin-top: 18rpx;
    font-size: 26rpx;
    line-height: 38rpx;
    background: rgb(227,234, 255);
    color: rgb(26, 26, 28);
  }

  .like-btn {

    float: left;
    text-align: right;
    padding-left: 40rpx;
    font-size: 24rpx;
     margin-left: 81rpx;
    margin-top: 30rpx;
    background: url(../../static/img/空心赞@2x.png) no-repeat;
    background-size: auto 100%;
    color: rgb(176, 178, 196);
  }
.line {
    height: 10rpx;
    /* border-top: 1rpx solid rgb(239, 239, 244); */
    margin: 30rpx;
    margin-bottom: 0;
}
.zheng-icon {
    position: absolute;
    width: 30rpx;
    height: 30rpx;
    right: -8rpx;
    top:-8rpx;
    background: url(../../static/img/小反.png) no-repeat;
    background-size: 100% 100%;
}
</style>