//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.login({
      
    })

    // 登录
    // wx.login({
    //   success: res => {
    //     wx.request({
    //       url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx35974e912b5ddd37&secret=d749ebb07764b7eaea3d11f6e2c06740&js_code=' + res.code + '&grant_type=authorization_code',
    //       method:'GET',
    //       success: res => {
    //         // console.log(res.data.openid)
    //         this.globalData.openid = res.data.openid


    //       },
    //       fail (res) {
    //         console.log('fail!')
    //       }
    //     })
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openid: null,
    purchase: null,
    request_address: "https://cotton.fjy8018.xin",
    back_methods: 0,
    total_asset: 0,
    toManage: 0,
    examination_back: 0
  }
})