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
    canSee: true,
    canSeePath: "../../img/icon_see.png",
    tabs: ["闲钱定投", "基金定投"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    total_asset: "--",
    latest_revenue: "--",
    latest_ration: "--",
    accu_revenue: "--",
    accu_ration: "--",
    trading_num: 0,

    recommend_list: [],
    hot_list: [],
    product_list: [],
    fund_list: [],
  },
  //事件处理函数
  changeSee: function () {
    this.setData({
      canSee : this.data.canSee ? false : true
    });
    if (this.data.canSeePath == "../../img/icon_see.png")
      this.setData({
        canSeePath: "../../img/icon_unsee.png"
      })
    else 
      this.setData({
        canSeePath: "../../img/icon_see.png"
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

  toFund: function () {
    wx.switchTab({
      url: "../fund/fund",
    })
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  toProductDetails: function (e) {
    wx.navigateTo({
      url: '../introduction/introduction',
    })
  },

  wechatLogin: function () {
    wx.showLoading({
      title: "加载数据中...",
      mask: true
    })

    var that = this;
    wx.login({
      success: res => {
        console.log("wechatLogin")
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx35974e912b5ddd37&secret=d749ebb07764b7eaea3d11f6e2c06740&js_code=' + res.code + '&grant_type=authorization_code',
          method: 'GET',
          success: res => {
            app.globalData.openid = res.data.openid
            wx.hideLoading();
            wx.showToast({
              title: "数据获取成功！",
              mask: true
            })

            wx.request({
              url: app.globalData.request_address + "/invest/login/first/" + app.globalData.openid,
              method: "GET",
              data: {},
              success(res) {
                //console.log(res.data)
                if (res.data.data == true) {
                  //console.log("true")
                  that.setData({
                    total_asset: "--",
                    latest_revenue: "--",
                    latest_ration: "--",
                    accu_revenue: "--",
                    accu_ration: "--"
                  })
                }
                else {
                  // console.log("false")
                  wx.request({
                    url: app.globalData.request_address + "/invest/trade/record/count/doing/" + app.globalData.openid,
                    method: "GET",
                    data: {},
                    success(res) {
                      console.log(res.data)
                      that.setData({
                        trading_num: res.data.data
                      })
                    },
                    fail(res) {
                      console.log("fail")
                    }
                  })
                  wx.request({
                    url: app.globalData.request_address + "/invest/user/product/info/" + app.globalData.openid,
                    method: "GET",
                    data: {},
                    success(res) {
                      console.log(res.data)
                      app.globalData.total_asset = res.data.data.userAsset.totalAsset;

                      var latest_revenue_string = res.data.data.userAsset.latestRevenue >= 0 ? "+" + res.data.data.userAsset.latestRevenue : "-" + res.data.data.userAsset.latestRevenue

                      var accu_revenue_string = res.data.data.userAsset.accuRevenue >= 0 ? "+" + res.data.data.userAsset.accuRevenue : "-" + res.data.data.userAsset.accuRevenue

                      that.setData({
                        total_asset: res.data.data.userAsset.totalAsset,
                        latest_revenue: latest_revenue_string,
                        latest_ration: res.data.data.userAsset.latestRation * 100,
                        accu_revenue: accu_revenue_string,
                        accu_ration: res.data.data.userAsset.accuRation * 100
                      })
                    },
                    fail(res) {
                      console.log("fail!")
                    }
                  })
                }
              },
              fail(res) {
                console.log("fail!")
              }
            })
          },
          fail(res) {
            console.log('fail!')
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },

  onLoad: function () {
    var dataFile = require("data.js")
    this.setData({
      recommend_list: dataFile.recommend_list,
      hot_list: dataFile.hot_list,
      product_list: dataFile.product_list,
      fund_list: dataFile.fund_list
    })

    wx.getSetting({
      success: res => {
        console.log(res.authSetting)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo
              this.onShow();
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
                this.onShow();
              }
            }
          })
        }
      }
    })


    console.log("test")
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (varbarWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: varbarWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

    //请求获取用户数据

    console.log(this.data.recommend_list)

    //请求后做的事情
    for (var i = 0; i < this.data.recommend_list.length; i++) {
      var temp_list = this.data.recommend_list;

      if (this.data.recommend_list[i].data_type == 0) {
        temp_list[i].data_type_name = "稳健投资";
        temp_list[i].text_color = "#F8633B";
        this.setData({
          recommend_list: temp_list
        })
      }
      else {
        temp_list[i].data_type_name = "优选基金";
        temp_list[i].text_color = "#319A80";
        this.setData({
          recommend_list: temp_list
        })
      }
    }
    for (var i = 0; i < this.data.hot_list.length; i++) {
      var temp_list = this.data.hot_list;

      if (this.data.hot_list[i].data_type == 0) {
        temp_list[i].data_type_name = "稳健投资";
        temp_list[i].text_color = "#F8633B";
        this.setData({
          hot_list: temp_list
        })
      }
      else {
        temp_list[i].data_type_name = "优选基金";
        temp_list[i].text_color = "#319A80";
        this.setData({
          hot_list: temp_list
        })
      }
    }
  },

  onShow: function () {
    var that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.wechatLogin()
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log(app.globalData.opneid)
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.wechatLogin()
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
          this.wechatLogin()
        }
      })
    }
  },

  // getUserInfo: function(e) {
  //   console.log(e)
  //   // console.log("test")
  //   this.sendOpenid()
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
