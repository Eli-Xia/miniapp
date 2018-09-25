<template>
  <div class="item-box">
    <div class="item-top">
      <div class="face"><img :src="item.headImgUrl" /></div>
      <div class="like-btn">
        {{item.likeCount}}
      </div>
      <div class="name-date">
        <div class="nickname">{{item.nickname}}</div>
        <div class="add-date">{{item.createTime}}</div>
      </div>
    </div>
    <div class="item-mid" @click="goto(item.debateTopicId)">
      <p>{{item.content}}</p>

    </div>
    <div class="item-bottom" @click="goto(item.debateTopicId)" :style="item.debateTopic.length > 60 ? 'margin-bottom:20rpx': ''">
      <p>{{item.debateTopic}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item'],
    methods:{
      goto(id) {
          let url = "/pages/detail/main?id="+id
          wx.navigateTo({ url })
      }
    }
  }
</script>

<style scoped>
  .item-box {
    margin: 10rpx 0;
    border-radius: 0rpx;
    background: #FFF;
    padding-bottom: 30rpx;
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
    padding: 25rpx;
    border-radius: 10rpx;
    margin: 0 30rpx;
    font-size: 30rpx;
    line-height: 37rpx;
    background: rgb(245, 246, 248);
    color: rgb(176, 178, 196);
     overflow-y: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    max-height:128rpx;
  }

  .like-btn {

    float: right;
    text-align: left;
    padding-left: 40rpx;
    font-size: 24rpx;
    margin-top: 30rpx;
    background: url(../../static/img/空心赞@2x.png) no-repeat;
    background-size: auto 100%;
    color: rgb(176, 178, 196);
  }

  .btn-group {
    width: 110rpx;
    margin: 0 auto;
  }
</style>