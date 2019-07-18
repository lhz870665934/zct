// pages/sell/sell.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all_amount: 998,
    amount: null,
    isOverflow: false,
    finalDate: "7月27日(三日后)23:59",
    today: "7月24日",
    finalDay: "7月27日"
  },

  bindAmountValue: function (e) {
    this.setData({
      amount: e.detail.value
    })
    if (this.data.amount > this.data.all_amount) {
      this.setData({
        isOverflow: true
      })
    }
    else {
      this.setData({
        isOverflow: false
      })
    }
  },

  setAll: function () {
    this.setData({
      amount: this.data.all_amount
    })
  },

  clear: function () {
    this.setData({
      amount: null,
      isOverflow: false
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