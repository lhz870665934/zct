// pages/sell/sell.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    all_amount: 0,
    amount: null,
    isOverflow: false,
    finalDate: "7月27日(三日后)23:59",
    today: "7月24日",
    finalDay: "7月27日",
    isTooLow: false,
    unClick: false
  },

  bindAmountValue: function (e) {
    this.setData({
      amount: e.detail.value
    })
    if (this.data.amount > this.data.all_amount) {
      this.setData({
        isOverflow: true,
        isTooLow: false
      })
    }
    else if (this.data.amount <= 0) {
      this.setData({
        isTooLow: true,
        isOverflow: false
      })
    }
    else {
      this.setData({
        isTooLow: false,
        isOverflow: false
      })
    }
  },

  setAll: function () {
    this.setData({
      amount: this.data.all_amount,
      isTooLow: false,
      isOverflow: false
    })
  },

  clear: function () {
    this.setData({
      amount: null,
      isOverflow: false,
      isTooLow: true
    })
  },

  confirm: function () {
    var that = this;
    this.setData({
      unClick: true
    })
    wx.request({
      url: app.globalData.request_address + "/invest/trade/sale/" + app.globalData.openid + "/1/" + this.data.amount,
      method: "POST",
      data: {},
      success(res) {
        console.log(res.data)
        that.setData({
          unClick: false
        })
        wx.navigateTo({
          url: "../sellSuccess/sellSuccess",
        })
      },
      fail(res) {
        console.log("fail")
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      all_amount: app.globalData.total_asset
    })
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