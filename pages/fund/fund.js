// pages/fund/fund.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total_asset: 105000.56,
    latest_revenue: "+1289.67",
    latest_ration: 5.89,
    accu_revenue: "+1289.67",
    accu_ration: 5.89,

    canSee: true,
    canSeePath: "../../img/icon_see.png",
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