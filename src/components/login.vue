<template>
  <div v-if="show">
    {{ck}}
    <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfo1">您需要授权登陆</button>
  </div>
</template>

<script>
  import fly from '../utils/fly'
  import { isLogin } from '../utils/Login';
  export default {
    props: ['checkLogin', 'cb'],
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
        return this.checkLogin
      }
    },
    mounted() {
      // 一进来看看用户是否授权过
      if (this.checkLogin) {
        this.getSetting()
      }
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
              self.show = true
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
            this.show = false
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
          this.login(function () {
            self.$emit('setLogin', true)
          })
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
      }
    }
  }
</script>