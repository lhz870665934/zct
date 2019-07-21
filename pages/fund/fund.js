// pages/fund/fund.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    total_asset: "--",
    latest_revenue: "--",
    latest_ration: "--",
    accu_revenue: "--",
    accu_ration: "--",

    canSee: true,
    canSeePath: "../../img/icon_see.png",

    holdAmount: "--",
    ration: "--"
  },

  changeSee: function () {
    this.setData({
      canSee: this.data.canSee ? false : true
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

  toProductManage: function () {
    wx.navigateTo({
      url: "../productManage/productManage",
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.toManage == 1) {
      wx.navigateTo({
        url: "../productManage/productManage",
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
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
            accu_ration: "--",
            holdAmount: "--",
            ration: "--"
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
              var latest_revenue_tmp = res.data.data.userAsset.latestRevenue
              var latest_revenue_string = latest_revenue_tmp >= 0 ? "+" + latest_revenue_tmp : "-" + latest_revenue_tmp

              var accu_revenue_tmp = res.data.data.userAsset.accuRevenue
              var accu_revenue_string = accu_revenue_tmp >= 0 ? "+" + accu_revenue_tmp : "-" + accu_revenue_tmp

              var holdAmount_tmp = res.data.data.userAsset.userAssetDetails.holdAmount
              var holdAmount_string = holdAmount_tmp >= 0 ? "+" + holdAmount_tmp : "-" + holdAmount_tmp

              that.setData({
                total_asset: res.data.data.userAsset.totalAsset,
                latest_revenue: latest_revenue_string,
                latest_ration: res.data.data.userAsset.latestRation * 100,
                accu_revenue: accu_revenue_string,
                accu_ration: res.data.data.userAsset.accuRation * 100,
                holdAmount: holdAmount_string,
                ration: res.data.data.userAsset.userAssetDetails.ration * 100.0
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})