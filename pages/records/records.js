// pages/records/records.js

const app = getApp();

var time = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    trade_record_list_show:
    [
      // {
      //   style: "取现",
      //   status: "进行中，预计xxxxx",
      //   amount: "-20元"
      // },
      // {
      //   style: "取现",
      //   status: "进行中，预计xxxxx",
      //   amount: "-20元"
      // },
      // {
      //   style: "取现",
      //   status: "进行中，预计xxxxx",
      //   amount: "-20元"
      // },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.request_address + "/invest/trade/record/" + app.globalData.openid + "/1/1/999",
      method: "GET",
      data: {},
      success(res) {
        console.log(res.data)
        var tmp_list = [];
        for (var i = 0; i < res.data.data.content.length; i++) {
          var tmp = { style: "", status: "", amount: "", color: "" };
          var type = res.data.data.content[i].type;
          if (type == 5) {
            //tmp_list[i].style = "提现";
            tmp.style = "提现";
          }
          else if (type == 7) {
            //tmp_list[i].style = "关闭";
            tmp.style = "关闭";
          }
          else if (type == 8) {
            //tmp_list[i].style = "充值";
            tmp.style = "充值";
          }
          else if (type == 9) {
            //tmp_list[i].style = "定投";
            tmp.style = "定投";
          }

          var status = res.data.data.content[i].status;
          if (status == -1) {
            //tmp_list[i].status = "支付失败，余额不足";
            tmp.status = "支付失败，余额不足";
          }
          else if (status == 1) {
            var sjc = res.data.data.content[i].createTime + 86400;
            if (type == 5) { //取现
              //tmp_list[i].status = "进行中，预计" + time.formatTime(sjc, 'Y年M月D日') + "到账";
              tmp.status = "进行中，预计" + time.formatTime(sjc, 'Y年M月D日') + "到账";
            }
            else if (type == 9) { //定投
              //tmp_list[i].status = "预计" + time.formatTime(sjc, 'Y年M月D日') + "完成定投";
              tmp.status = "预计" + time.formatTime(sjc, 'Y年M月D日') + "完成定投";
            }
          }
          else if (status == 0) {
            //tmp_list[i].status = "充值成功，即充即用";
            tmp.status = "充值成功，即充即用";
          }
          else if (status == 2) {
            //tmp_list[i].status = "终止定投，交易关闭";
            tmp.status = "终止定投，交易关闭";
          }

          var amount = res.data.data.content[i].amount;
          if (type == 5) {
            // tmp_list[i].amount = "-" + amount + "元";
            // tmp_list[i].color = "#26A520";
            tmp.amount = "-" + amount + "元";
            tmp.color = "#26A520";
          }
          else if (type == 8 && status == 0) {
            // tmp_list[i].amount = "+" + amount + "元";
            // tmp_list[i].color = "#EF3E44";
            tmp.amount = "+" + amount + "元";
            tmp.color = "#EF3E44";
          }
          else {
            // tmp_list[i].amount = amount + "元";
            // tmp_list[i].color = "#363636";
            tmp.amount = amount + "元";
            tmp.color = "#363636";
          }
          tmp_list.push(tmp)
        }
        that.setData({
          trade_record_list_show: tmp_list
        })
      },
      fail(res) {
        console.log("fail")
      }
    })
  },

  back: function () {
    wx.navigateBack({
      
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