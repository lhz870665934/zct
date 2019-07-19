// pages/introduction/introduction.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  purchase1: function () {
    app.globalData.back_methods = 0;
    wx.navigateTo({
      url: "../details/details",
    })
  },

  purchase2: function () {
    this.toExamination();
  },

  toExamination: function () {
    wx.request({
      url: app.globalData.request_address + "/invest/login/first/" + app.globalData.openid,
      method: "GET",
      data: {},
      success(res) {
        console.log(res.data.data)
        if (res.data.data == true) {
          app.globalData.back_methods = 0;
          app.globalData.purchase = 0;
          app.globalData.examination_back = 0;
          wx.navigateTo({
            url: '../examination/examination'
          })
        }
        else {
          wx.navigateTo({
            url: '../purchase/purchase'
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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