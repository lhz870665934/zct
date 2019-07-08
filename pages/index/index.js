//index.js
//获取应用实例
const app = getApp()

var sliderWidth = 95; // 需要设置slider的宽度，用于计算中间位置
var varbarWidth = 352.5;

Page({
  data: {
    motto: '欢迎使用智存投！',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canSee: "../../img/icon_see.png",
    tabs: ["闲钱定投", "基金定投"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  //事件处理函数
  changeSee: function () {
    if (this.data.canSee == "../../img/icon_see.png")
      this.setData({
        canSee: "../../img/icon_unsee.png"
      })
    else 
      this.setData({
        canSee: "../../img/icon_see.png"
      })
  },

  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  ToExamination: function () {
    wx.redirectTo({
      url: '../examination/examination?id=0',
    })
  },

  sendOpenid: function () {
    wx.request({
      url: 'http://10.1.253.12:8081/invest/test/login/' + app.globalData.openid,
      method: 'GET',
      success: res => {
        console.log(res.data)
      },
      fail(res) {
        console.log('fail!')
      }
    })
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })

        //于此向后端发送登录信息
        //console.log(app.globalData.userInfo)
        this.sendOpenid()

      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (varbarWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: varbarWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  getUserInfo: function(e) {
    console.log(e)
    // console.log("test")
    this.sendOpenid()
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
