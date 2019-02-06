<template>
  <div>
    <div class="medal-item" :key="index" v-for="(item,index) in lists">
      <div class="icon" :class="'xun_'+item.code"></div>
      <div class="right-box">
        <div class="title">{{item.name}}</div>
        <div class="info">{{item.desc}}</div>
        <div class="jindu-bg">
          <div class="jindu-bar" :style="'width:'+item.width"></div>
        </div>
        <div class="count">
          <span class="right" style="float:right">{{item.needScore}}</span>
          <span class="left">0</span>

        </div>
      </div>
      <div class="done-1" v-if="item.light"></div>
    </div>
  </div>
</template>
<script>
  import fly from '../../utils/fly'
  import utils from '../../utils'
  export default {
    data() {
      return {
        pageName: 'my-wall',
        lists: [],
        callback: function () {},
        showLogin: false,
        checkLogin: false,
        msg_count: 0,
        xun_list: [{ code: 1, light: true }, { code: 2, light: false }]
      }
    },
    methods: {
      get_wall() {
        fly.post('/api/app/medal/list-wall').then(res => {
          if (res.retCode == 0) {
            res.result.map(item => {

              let w = item.currentScore / item.needScore
              if (w >= 1) {
                item.width = '100%'
                item.done = 1
              } else {
                item.width = w * 100 + '%'
              }
            })
            this.lists = res.result
          } else if (res.retCode == 2) {

          } else {
            console.log(res)
          }
        })
      }
    },
    onLoad() {
      this.get_wall()
      wx.setNavigationBarTitle({
        title: '勋章墙'
      })
    }
  }
</script>

<style lang="">
  .icon {
    height: 120rpx;
    width: 120rpx;
    overflow: hidden;
    clear: both;
    margin-left: 30rpx;
    float: left;
  }

  .xun_1 {

    background: url(../../../static/img/-e-huozan.png);
    background-size: 100% auto;

  }

  .xun_2 {

    background: url(../../../static/img/-e-fabian.png);
    background-size: 100% auto;

  }

  .medal-item {
    padding-top: 62rpx;
    height: 190rpx;
    background: #FFF;
    margin: 30rpx;
    position: relative;
    border-radius: 10rpx;
  }

  .right-box {
    position: absolute;
    top: 62rpx;
    left: 181rpx;
  }

  .right-box .title {
    font-size: 34rpx;
    height: 34rpx;
    line-height: 34rpx;
    overflow: hidden;
  }

  .right-box .info {
    color: rgb(26, 26, 28);
    font-size: 24rpx;
    margin-top: 16rpx;
  }

  .jindu-bg {
    width: 460rpx;
    background: #eee;
    height: 16rpx;
    border-radius: 8rpx;
    margin-top: 30rpx;
  }

  .count {
    height: 24rpx;
    font-size: 24rpx;
  }

  .jindu-bar {

    height: 16rpx;
    background: linear-gradient(to right, rgb(255, 245, 157), rgb(253, 216, 53));
    border-radius: 8rpx;
  }

  .done-1 {
    width: 66rpx;
    height: 75rpx;
    background: url(../../../static/img/done-1.png);
    position: absolute;
    right: 20rpx;
    top: 0;
    background-size: 100% 100%;
  }
</style>