import fly from './fly'
export function login (callback) {
    // wx.showLoading()
    wx.login({
      success (res) {
        if (res.code) {
          // 登录成功，获取用户信息
          getUserInfo(res.code, callback)
        } else {
          // 否则弹窗显示，showToast需要封装
          showToast()
        }
      },
      fail () {
        showToast()
      }
    })
  }
  
  // 获取用户信息
  export function getUserInfo (code, callback) {
    wx.getUserInfo({
      // 获取成功，全局存储用户信息，开发者服务器登录
      success (res) {
        // 全局存储用户信息
        wx.setStorageSync('profile', res.userInfo)
        postLogin(code, res.iv, res.encryptedData, callback)
      },
      // 获取失败，弹窗提示一键登录
      fail () {
        wx.hideLoading()
        // 获取用户信息失败，清楚全局存储的登录状态，弹窗提示一键登录
        // 使用token管理登录态的，清楚存储全局的token
        // 使用cookie管理登录态的，可以清楚全局登录状态管理的变量
        wx.setStorageSync('token', null)
        // 获取不到用户信息，说明用户没有授权或者取消授权。弹窗提示一键登录，后续会讲
        showLoginModal()
      }
    })
  }
  
  // 开发者服务端登录
  export function postLogin (code, iv, encryptedData, callback) {
    let params = {
      code: code,
      iv: iv,
      encryptedData: encryptedData
    }
    fly.post('/api/app/user/auth-register', params).then((res) => {
      if (res.retCode == 0) {
        // wx.hideLoading()
        // 登录成功，
        // 使用token管理登录态的，存储全局token，用于当做登录态判断，
        // 使用cookie管理登录态的，可以存任意变量当做已登录状态
        wx.setStorageSync('token', res.result.token)
        callback && callback()
      } else {
        showToast()
      }
    }).catch((err) => {
      showToast()
    })
  }
  
  // 显示toast弹窗
  export function showToast (content = '登录失败，请稍后再试') {
    wx.showToast({
      title: content,
      icon: 'none'
    })
  }

  export function isLogin (callback) {
    const token = wx.getStorageSync('token') || false
    if (token) {
      // 如果有全局存储的登录态，暂时认为他是登录状态
      callback && callback()
    } else {
      // 如果没有登录态，弹窗提示一键登录
      showLoginModal()
    }
  }
  
  // 接口调用失败处理，
  export function handleError (res, callback) {
    // 规定-3041和-3042分别代表未登录和登录态失效
    if (res.code == -3041 || res.code == -3042) {
      // 弹窗提示一键登录
      showLoginModal()
    } else if (res.msg) {
      // 弹窗显示错误信息
      showToast(res.msg)
    }
  }

  export function showLoginModal (callback) {
    wx.showModal({
      title: '提示',
      content: '你还未登录，登录后可获得完整体验 ',
      confirmText: '一键登录',
      success (res) {
        // 点击一键登录，去授权页面
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/login/main',
          })
        }
      }
    })
  }

