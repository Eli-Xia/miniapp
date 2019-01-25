<template>
  <div :style="showLogin ? 'display:block' : 'display:none'" di="ck" class="login-layer">

    <div class="window-box">
      <div class="info">您需要登陆才完成操作哦</div>
      <div class="close-btn" @click="close()">关闭</div><button class="login-btn" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfo1">点击授权登陆</button>
    </div>
  </div>
</template>

<script>
  import fly from '../utils/fly'
  import { isLogin } from '../utils/Login';
  export default {
    props: ['checkLogin', 'cb', 'showLogin', 'pageName'],
    data() {
      return {
        too: null,
        show: false
      }
    },
    onload() {
      // 这个时候 不行，可能与生命周期有关系
      // this.getSetting()
    },
    computed: {
      ck() {
        if (this.checkLogin) {
          this.getSetting()
        }
        return this.checkLogin
      }
    },
    mounted() {
      // 一进来看看用户是否授权过



    },
    created() {

    },
    methods: {
      getSetting() {
        const self = this
        wx.getSetting({
          success: function (res) {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: function (res) {
                  console.log('用户已经授权过了')
                  //用户已经授权过,则不显示组件
                  if (!self.isLogin()) {


                    self.login(self.cb)

                  }
                  self.show = false

                }
              })
            } else {
              console.log('用户还未授权过')
              // 显示组件
              console.log('当前页面是什么，如果当前页面首页不出发说完全操作', self.pageName)
              if (self.pageName != 'home')
              {
                self.showLogin = true
              }
            }
          }
        })

      },
      login(callback) {
        const self = this
        wx.login({
          success(res) {
            if (res.code) {
              // 登录成功，获取用户信息
              self.getUserInfo(res.code, callback)
            } else {
              // 否则弹窗显示，showToast需要封装

            }
          },
          fail() {

          }
        })
      },
      getUserInfo(code, callback) {
        const self = this
        wx.getUserInfo({
          // 获取成功，全局存储用户信息，开发者服务器登录
          success(res) {
            // 全局存储用户信息
            self.postLogin(code, res.iv, res.encryptedData, callback)
          },
          // 获取失败，弹窗提示一键登录
          fail() {


          }
        })
      },
      getUserInfo1() {
        console.log('click事件首先触发')
        this.showLogin = false
        // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
        // console.log(wx.canIUse('button.open-type.getUserInfo'))
        if (wx.canIUse('button.open-type.getUserInfo')) {
          // 用户版本可用
        } else {
          console.log('请升级微信版本')
        }
      },
      postLogin(code, iv, encryptedData, callback) {
        let params = {
          code: code,
          iv: iv,
          encryptedData: encryptedData
        }
        console.log(params)
        fly.post('/api/app/user/auth-register', params).then(res => {

          if (res.retCode == 0) {
            // wx.hideLoading()
            wx.setStorageSync('isLogin', true)
            wx.setStorageSync('token', res.result.token)
            this.checkLogin = false
            // this.show = false
            callback && callback()
          } else {
            console.log(res)
          }
        }).catch(e => console.log(e))
      },
      wxLogin(code, callback) {
        let params = {
          jscode: code
        }
        fly.post('/api/app/user/login', params).then(res => {

          if (res.retCode == 0) {
            wx.hideLoading()
            wx.setStorageSync('isLogin', true)
            wx.setStorageSync('token', res.result.token)

            callback && callback()
          } else {
            wx.showToast({
              title: '登陆失败请稍后再试',
              icon: 'none'
            })
          }
        }).catch(e => console.log(e))
      },
      bindGetUserInfo(e) {
        const self = this
        // console.log(e.mp.detail.rawData)
        if (e.mp.detail.rawData) {
          //用户按了允许授权按钮

          console.log('用户按了允许授权按钮', e.mp.detail.rawData, '去登陆')
          wx.showLoading()
          this.login(this.cb)
        } else {
          //用户按了拒绝按钮
          console.log('用户按了拒绝按钮')

        }
      },
      isLogin() {
        const token = wx.getStorageSync('token') || false
        if (token) {
          return true
        } else {
          return false
        }
      },
      close() {
        this.checkLogin = false
        this.showLogin = false

      }
    }
  }
</script>

<style scoped>
  .login-layer {
    position: fixed;
    top: 0rpx;
    left: 0rpx;
    right: 0rpx;
    bottom: 0rpx;
    z-index: 3000;
    background: rgba(0, 0, 0, .7)
  }

  .login-btn {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 50%;
    font-size: 30rpx;
    color: #333;
    border: 1rpx solid #ddd !important;
    height: 90rpx;
    border-radius: 0;
    background: #FFF;
    line-height: 90rpx;
    z-index: 3000;
    color: green;

  }

  button::after {
    border: none;
  }

  .window-box {
    background: #FFF;
    border-radius: 10rpx;
    margin: 0 60rpx;
    margin-top: 260rpx;
    position: relative;
    height: 300rpx;
    z-index: 2000;
    overflow: hidden;
  }

  .window-box .info {
    height: 200rpx;
    line-height: 200rpx;
    font-size: 30rpx;
    text-align: center;
    color: #222;
  }

  .close-btn {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50%;
    color: #333;
    text-align: center;
    height: 87rpx;
    line-height: 87rpx;
    font-size: 30rpx;
    border: 1rpx solid #ddd;
  }
</style>