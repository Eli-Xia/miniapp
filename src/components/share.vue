<template>
  <div class="share-box">
    <div class="layer" @click="close"></div>
    <div class="bottom-box">
      <div class="share-type">
        <div class="to-one">
          <button class="share-btn" open-type='share' :data-share="shareData"></button>
          <div class="icon"></div>
          <div class="text">微信好友</div>
        </div>
        <div class="to-haibao">
          <div class="icon"></div>
          <div class="text">生成海报</div>
        </div>
      </div>
      <div class="cancel-btn" @click="close">取消</div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['shareData'],
    data() {
      return {
        pageName: 'share',
      }
    },
    methods: {
      close() {
        this.$emit('closeShare',true)
      }
    }

  }
</script>

<style>
  .share-box {}

  .layer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0, 0, 0, .7);
    z-index: 9999999;
  }

  .bottom-box {
    height: 320rpx;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgb(247, 247, 250);
    z-index: 9999999;
    border-top-left-radius: 20rpx;
    border-top-right-radius: 20rpx;

  }

  .cancel-btn {
    position: absolute;
    height: 98rpx;
    line-height: 98rpx;
    text-align: center;
    font-size: 30rpx;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1rpx solid rgba(0, 0, 0, 0.1);

  }

  .to-one {
    width: 110rpx;
    height: 130rpx;
    left: 149rpx;
    position: absolute;
    font-size: 26rpx;
    top: 45rpx;
  }

  .to-haibao {
    right: 149rpx;
    width: 110rpx;
    height: 130rpx;
    position: absolute;
    font-size: 26rpx;
    top: 45rpx;
  }

  .to-one .icon {
    height: 98rpx;
    width: 98rpx;
    background: url('../../static/img/wechat@2x.png');
    background-size: 100% 100%;
  }

  .to-haibao .icon {
    height: 98rpx;
    width: 98rpx;
    background: url('../../static/img/haibao@2x.png');
    background-size: 100% 100%;
  }

  .to-one .text,
  .to-haibao .text {
    line-height: 40rpx;
    padding-top: 10rpx;
    color: rgb(117, 122, 151);
  }
  .share-btn {
      width: 100%;
      height: 100%;
      position: absolute;
      opacity: 0;
  }
</style>