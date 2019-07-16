// pages/productManage/productManage.js
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
    settting_list: 
    [
      {
        style: "每周定投100元",
        setting_id: "3"
      },
      {
        style: "每周定投200元",
        setting_id: "8"
      }
    ],
    trade_record_list_show:
    [
      {
        style: "快速取现",

      }
    ],
    trade_record_list:
    [
      {
        style: "快速取现",
        status: "进行中，预计2019年7月27日到账",
        amount: "-20元"
      }
    ]
  },

  setting_click: function (e) {
    console.log(e.currentTarget.dataset.id)
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