// pages/personal_info/personal_info.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    real_name: "",
    id_number: "",
    credit_card: "",
    rank: -1,
    risk_level: ""
  },

  toExamination: function () {
    app.globalData.examination_back = 1;
    wx.navigateTo({
      url: "../examination/examination",
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
    var that = this;
    this.setData({
      userInfo: app.globalData.userInfo
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
            real_name: "",
            id_number: "",
            credit_card: "",
            rank: -1,
            risk_level: ""
          })
        }
        else {
          // console.log("false")
          wx.request({
            url: app.globalData.request_address + "/invest/user/product/info/" + app.globalData.openid,
            method: "GET",
            data: {},
            success(res) {
              console.log(res.data)
              that.setData({
                real_name: res.data.data.realName,
                id_number: res.data.data.idNumble,
                credit_card: res.data.data.creditCard,
                rank: res.data.data.rank
              })
              if (that.data.rank == 0) {
                that.setData({
                  risk_level: "C0-保守型"
                })
              }
              else if (that.data.rank == 1) {
                that.setData({
                  risk_level: "C1-保守型"
                })
              }
              else if (that.data.rank == 2) {
                that.setData({
                  risk_level: "C2-平衡型"
                })
              }
              else if (that.data.rank == 3) {
                that.setData({
                  risk_level: "C3-稳健型"
                })
              }
              else if (that.data.rank == 4) {
                that.setData({
                  risk_level: "C4-积极型"
                })
              }
              else if (that.data.rank == 5) {
                that.setData({
                  risk_level: "C5-进取型"
                })
              }
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