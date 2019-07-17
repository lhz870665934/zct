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
    recommend_list: [
      {
        data_type: 0,
        product_name: "证券名",
        earn: 59.31,
        data_type_name: "",
        text_color: "",
      }
    ],
    hot_list: [
      {
        data_type: 1,
        product_name: "证券名",
        earn: 59.31,
        data_type_name: "",
        text_color: "",
      }
    ],
    product_list: [
      {
        product_name: "定投产品名称",
        earn: 59.3100,
        close_period: 0
      }
    ],
    fund_list: [
      {
        product_name: "基金产品名称",
        earn: 59.3100,
        close_period: 28
      }
    ],
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

  // sendOpenid: function () {
  //   wx.request({
  //     url: 'http://10.1.253.12:8081/invest/test/login/' + app.globalData.openid,
  //     method: 'GET',
  //     success: res => {
  //       console.log(res.data)
  //     },
  //     fail(res) {
  //       console.log('fail!')
  //     }
  //   })
  // },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  toProductDetails: function (e) {
    if (app.globalData.openid == null) {
      wx.showToast({
        title: "请稍后重试！",
        icon: "loading",
        mask: true
      })
      return
    }
    wx.navigateTo({
      url: '../details/details',
    })
  },

  wechatLogin: function () {
    var that = this;
    wx.login({
      success: res => {
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx35974e912b5ddd37&secret=d749ebb07764b7eaea3d11f6e2c06740&js_code=' + res.code + '&grant_type=authorization_code',
          method: 'GET',
          success: res => {
            app.globalData.openid = res.data.openid
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
                  console.log("false")
                  wx.request({
                    url: app.globalData.request_address + "/invest/user/product/info/" + app.globalData.openid,
                    method: "GET",
                    data: {},
                    success(res) {
                      console.log(res.data)
                      var latest_revenue_string = res.data.data.userAsset.latestRevenue >= 0 ? "+" + res.data.data.userAsset.latestRevenue : "-" + res.data.data.userAsset.latestRevenue
                      var accu_revenue_string = res.data.data.userAsset.accuRevenue >= 0 ? "+" + res.data.data.userAsset.accuRevenue : "-" + res.data.data.userAsset.accuRevenue
                      that.setData({
                        total_asset: res.data.data.userAsset.totalAsset,
                        latest_revenue: latest_revenue_string,
                        latest_ration: res.data.data.userAsset.latestRation,
                        accu_revenue: accu_revenue_string,
                        accu_ration: res.data.data.userAsset.accuRation
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
    console.log("a")
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
        }
      })
      this.wechatLogin()
    }
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
