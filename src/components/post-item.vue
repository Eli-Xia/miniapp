<template>
  <div class="item-box">
    <div class="item-top">
      <div class="face"><img  src="../../static/img/face-1.png" /></div>
      <div class="name-date">
        <div class="nickname">神奇的大蘑菇</div>
        <div class="add-date">09/12</div>
      </div>
    </div>
    <div class="item-mid">
      <p>不给别人添麻烦是不是一种美德啊到底是谁不是呢，我现在很想知道？</p>

    </div>
    <div class="item-bottom">
      <div class="comment_count btn">
        <div class="btn-group">
          <div class="icon"></div>
          <div class="count">122</div>
        </div>
      </div>
      <div class="share_count btn">
        <div class="btn-group">
          <div class="icon"></div>
          <div class="count">1225</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item']
  }
</script>

<style scoped>
  .item-box {
    margin: 30rpx;
    border-radius: 20rpx;
    background: #FFF;
  }

  .item-box .item-top {
    padding: 24rpx;
    height: 42rpx;
  }

  .item-top .face {
    width: 72rpx;
    height: 72rpx;
    float: left;
  }

  .item-top .face img {
    width: 72rpx;
    height: 72rpx;
    border-radius: 50%;
  }

  .item-top .name-date {
    float: left;
    margin-left: 11rpx;
    line-height: 30rpx;
    margin-top: 8rpx;
  }

  .item-mid {
    clear: both;
    font-size: 32rpx;
    color: rgb(26, 26, 28);
    padding: 24rpx;
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
    height: 32rpx;
    padding: 16rpx;
    border-top: 1rpx solid rgb(239, 239, 244);
    display: inline-block;

    /* Firefox */

    display: -moz-box;

    -moz-box-orient: horizontal;

    /* Safari, Opera, and Chrome */

    display: -webkit-box;

    -webkit-box-orient: horizontal;

    /* W3C */

    display: box;
    text-align: center;

    box-orient: horizontal;

  }

  .item-bottom .btn {
    -webkit-box-flex: 1.0;

    -moz-box-flex: 1.0;

    box-flex: 1.0;
    height: 32rpx;
    line-height: 32rpx;
  }
  .btn-group { text-align: center}
  .comment_count .icon {
      width: 37rpx;
      height: 35rpx;
      background-image: url(../../static/img/评论@2x.png);
      background-size: 100% 100%;
      float: left;
  }

  .share_count .icon {
      width: 37rpx;
      height: 32rpx;
      background-image: url(../../static/img/转发@2x.png);
      background-size: 100% 100%;
      float: left;
  }
 .item-bottom .count{
      font-size:24rpx;
      color:rgb(176, 178, 196);
      float: left;
      margin-left: 10rpx;
  }
  .btn-group {
      width: 110rpx;
      margin: 0 auto;
  }
</style>