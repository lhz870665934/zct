// pages/examination/examination.js

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    total_points: 0,
    question_list: [],
    answer_list: [],
    point: [],
    id: 0,
    pos: 0,
    back_show: false,
    ani: "",
    unClick: false
  },

  nullThings: function () {

  },

  countpoints: function (options) {
    this.data.total_points = 0

    var rank_string = "";
    var that = this;

    for (var i = 0; i < 14; i++) {
      if (this.data.point[i] == null) {
        wx.showToast({
          title: "第" + (i + 1) + "题未作答",
          icon: "none",
          mask: true
        })
        break;
      }
      if (i != 12 && i != 13)
        this.data.total_points += this.data.point[i]
      if (i == 13) {
        console.log(this.data.total_points)
        var rank = -1;
        if (12 <= this.data.total_points && this.data.total_points <= 20) {
          rank = 5;
          rank_string = "C5-进取型";
        }
        else if (21 <= this.data.total_points && this.data.total_points <= 29) {
          rank = 4;
          rank_string = "C4-积极型";
        }
        else if (30 <= this.data.total_points && this.data.total_points <= 38) {
          rank = 3;
          rank_string = "C3-稳健型";
        }
        else if (39 <= this.data.total_points && this.data.total_points <= 48) {
          rank = 2;
          rank_string = "C2-平衡型";
        }
        else if (49 <= this.data.total_points && this.data.total_points <= 57) {
          if (this.data.point[12] != 1) {
            rank = 1;
            rank_string = "C1-保守型";
          }
          else {
            rank = 0;
            rank_string = "C0-保守型";
          }
        }

        // console.log(app.globalData)
        // console.log("t")

        this.setData({
          unClick: true
        })

        wx.request({
          url: app.globalData.request_address + "/invest/login/",
          method: "POST",
          data:
          {
            "openId": app.globalData.openid,
            "name": app.globalData.userInfo.nickName,
            "phone": "13791379137",
            "creditCard": "123456789123456789",
            "realName": "张蕴慧",
            "idNumble": "440106200208025311",
            "rank": rank
          },
          success(res) {
            console.log(res.data)
            that.setData({
              unClick: false
            })
            wx.showModal({
              title: "测试完成！",
              content: "您的评级为: " + rank_string,
              showCancel: false,
              success (res) {
                if (app.globalData.examination_back == 0) {
                  wx.navigateTo({
                    url: '../purchase/purchase',
                  })
                }
                else {
                  wx.navigateBack({

                  })
                }
              }
            })
          },
          fail(res) {
            console.log("fail!")
          }
        })
      }
    }
  },

  bindchange: function (e) {
    this.data.point[e.currentTarget.dataset.index] = this.data.answer_list[e.currentTarget.dataset.index][e.detail.value].value
    if (!this.data.back_show) {
      this.setData({
        back_show: true
      })
    }
    if (this.data.pos < 13)
      this.data.pos += 1
    var animation = wx.createAnimation({})
    animation.translate(-this.data.pos * wx.getSystemInfoSync().windowWidth, 0).step()

    this.setData({

      ani: animation.export()

    })
  },

  back: function (e) {
    if (this.data.pos !== 0)
    this.data.pos -= 1
    if (this.data.pos == 0)
      this.setData({
        back_show: false
      })
    var animation = wx.createAnimation({})
    animation.translate(-this.data.pos * wx.getSystemInfoSync().windowWidth, 0).step()

    this.setData({

      ani: animation.export()

    })
  },

  donothing: function () {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.total_points = 0
    var dataFile = require("data.js")
    this.setData({
      question_list: dataFile.question_list,
      answer_list: dataFile.answer_list,
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