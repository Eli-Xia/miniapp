<template>
  <div class="share-box">
    <canvas :style="'width:'+img_w+'px;height:'+img_h+'px;'" canvas-id='haibao-canvas' class="haibao-can"></canvas>
    <div class="layer" @click="close"></div>

    <div class="haibao-box haibao-img" v-if="showHaibao">
      <img width="100%" :src="haibao_src" alt="">
      <div class="succss-text"> {{success_text}}</div>
    </div>

    <div class="bottom-box" :style="'height:'+(320+bottom)+'rpx'">
      <div class="share-type">
        <div class="to-one">
          <button class="share-btn" open-type='share' :data-share="shareData"></button>
          <div class="icon"></div>
          <div class="text">微信好友</div>
        </div>
        <div class="to-haibao" @click="mk_haibao()">
          <div class="icon"></div>
          <div class="text">生成海报</div>
        </div>
      </div>
      <div :style="'height:'+(98+bottom)+'rpx'" class="cancel-btn" @click="close">取消</div>
    </div>

  </div>
</template>
<script>
  import mkimg from '../utils/mkimg';
  export default {
    props: ['shareData'],
    data() {
      return {
        pageName: 'share',
        showHaibao: false,
        haibao_src: "",
        img_w: 0,
        img_h: 0,
        bottom: 0,
        success_text: ''
      }
    },
    methods: {
      close() {
        this.$emit('closeShare', true)
      },
      mk_haibao() {

        this.showHaibao = true
        const self = this
        wx.getSystemInfo({
          success: function (res) {
            // self.img_w = res.windowWidth * 2
            // self.img_h = res.windowHeight * 2
            console.log(res.windowHeight * 2, 'iiii')
            self.img_w = 750
            self.img_h = 1336
            console.log(self.img_w, self.img_h)
            mkimg.sheng(self.shareData, self.img_w, self.img_h, function (src) {
              self.haibao_src = src
              wx.saveImageToPhotosAlbum({
                filePath: src,
                success(res) {
                  self.success_text = '已经保存相册，记得分享哟！'
                },
                fail: function (res) {
                  console.log(res)
                  wx.showToast({
                    title: res.errMsg,
                    icon: 'none',
                    duration: 2000
                  })
                }
              })
            })
          },
        })


      }
    },
    created() {
      if (wx.getSystemInfoSync().windowHeight > 720) {
        this.bottom = 50
      }
    },

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
    font-size: 24rpx;
    top: 45rpx;
  }

  .to-haibao {
    right: 149rpx;
    width: 110rpx;
    height: 130rpx;
    position: absolute;
    font-size: 24rpx;
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

  .haibao-img {
    width: 401rpx;
    height: 714rpx;
    position: fixed;
    left: 50%;
    margin-left: -200rpx;
    top: 80rpx;
    z-index: 9999999;
    background: #FFF;
  }

  .haibao-img img {
    width: 100%;
    height: 100%;
  }

  .succss-text {
      text-align: center;
      z-index: 8000;
      font-size: 26rpx;
      color: #FFF;
      padding-top: 40rpx;
  }
</style>