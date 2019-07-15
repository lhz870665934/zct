// pages/purchase/purchase.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["买入", "定投"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    product_name: "易达方上证50指数C产品名",
    amount: 0,
    bank_name: "中国建设银行",
    bank_id: 5334,
    max_amount: 10000,
    week: "每周",
    day: "周一",
    multiArray_style: [["中国建设银行(5334)"], [10000]],
    multiIndex_style: [0, 0],
    multiArray: [["每周　", "每两周", "每月", "每日"], ["周一", "周二", "周三", "周四", "周五"]],
    multiIndex: [0, 0],

    isAgree: false,
    confirm_disabled: true
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  bindAmountValue: function (e) {
    this.setData({
      amount: e.detail.value
    })
  },

  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },

  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    console.log(e.detail.column)
    switch (e.detail.column) {
      case 0:
        console.log(data.multiIndex[0])
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ["周一", "周二", "周三", "周四", "周五"];
            break;
          case 1:
            data.multiArray[1] = [];
            break;
          case 2:
            data.multiArray[1] = [];
            break;
          case 3:
            data.multiArray[1] = [];
            break;
        }
      break;
    }
    this.setData(data);
  },

  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length,
      confirm_disabled: !e.detail.value.length
    });
  },

  confirm: function (e) {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      activeIndex: app.globalData.purchase
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    
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