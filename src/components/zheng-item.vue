<template>
  <div class="item-box">
    <div class="item-top">
      <div class="face">
        <div class="zheng-icon"></div>
        <img :src="item.headImgUrl" />
      </div>
      <div class="like-btn" :class="item.likeState == 1 ? 'liked': ''"  @click="like(item)">
        {{ item.likeCount}}
      </div>
        <div class="name-date">
          <div class="nickname">{{item.nickname}}</div>
          <div class="add-date">{{item.createTime}}</div>
        </div>
      </div>
      <div class="item-bottom">
        <p>{{item.content}}</p>
      </div>
      <div class="line"></div>
    </div>
</template>

<script>
  export default {
    props: ['item'],
    methods: {
      like(id) {
        this.$emit('doLike',id)
      }
    }
  }
</script>

<style scoped>
  .item-box {
    margin: 10rpx 0rpx;
    border-radius: 0rpx;
    background: none;
    margin-top: 0rpx;

    padding-bottom: 0rpx;


  }

  .item-box .item-top {
    padding: 24rpx;
    padding-right: 0rpx;
    height: 42rpx;
  }

  .item-top .face {
    width: 72rpx;
    height: 72rpx;
    float: left;
    position: relative;
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
    margin-left: 100rpx;
    margin-right: 81rpx;
    margin-top: 18rpx;
    font-size: 26rpx;
    line-height: 38rpx;
    background: rgb(255, 221, 221);
    color: rgb(26, 26, 28);
  }

  .like-btn {

    float: right;
    text-align: right;
    padding-left: 40rpx;
    font-size: 24rpx;
    margin-right: 81rpx;
    margin-top: 30rpx;
    background: url(../../static/img/空心赞@2x.png) no-repeat;
    background-size: auto 100%;
    color: rgb(176, 178, 196);
  }
  
   .like-btn.liked {

    background: url(../../static/img/正赞@2x.png) no-repeat;
     background-size: auto 100%;
     color: rgb( 255, 55, 56);
  }
  .line {
    height: 10rpx;
    border-top: 1rpx solid rgb(239, 239, 244);
    margin: 30rpx;
    margin-bottom: 0;
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
</style>