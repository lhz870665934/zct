// pages/productManage/productManage.js
import * as echarts from '../../ec-canvas/echarts';

var time = require('../../utils/util.js');

const app = getApp()

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: '#FFFFFF',
    textStyle: {
      color: 'rgba(0, 0, 0, 1)'
    },
    labelLine: {
      lineStyle: {
        color: 'rgba(0, 0, 0, 1)'
      }
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        itemStyle: {
          // 阴影的大小
          shadowBlur: 10,
          // 阴影水平方向上的偏移
          shadowOffsetX: 0,
          // 阴影垂直方向上的偏移
          shadowOffsetY: 0,
          // 阴影颜色
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          emphasis: {
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        data: [
          { value: 89.71, name: '股票' },
          { value: 1.97, name: '债券' },
          { value: 4.92, name: '银行存款' },
          { value: 3.4, name: '其他' }
        ]
      }
    ]
  };
  chart.setOption(option);
  return chart;
}

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
    settting_list: 
    [
      // {
      //   style: "每周定投100元",
      //   setting_id: "3"
      // },
      // {
      //   style: "每周定投200元",
      //   setting_id: "8"
      // }
    ],
    trade_record_list_show:
    [
      // {
      //   style: "快速取现",
      //   status: "进行中，预计2019年7月27日到账",
      //   amount: "-20元",
      //   color: ""
      // },
      // {
      //   style: "充值",
      //   status: "充值成功，即充即用",
      //   amount: "+100元",
      //   color: ""
      // },
    ],
    ec_pie: {
      onInit: initChart
    },
  },
  
  setting_click: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "../settings/settings?id=" + e.currentTarget.dataset.id,
    })
  },

  toMore: function (e) {
    wx.navigateTo({
      url: "../records/records",
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.request_address + "/invest/trade/record/" + app.globalData.openid + "/1/1/2",
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
    this.data.settting_list.length = 0;
    this.data.trade_record_list_show.length = 0;
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

              that.setData({
                total_asset: res.data.data.userAsset.totalAsset,
                latest_revenue: latest_revenue_string,
                latest_ration: res.data.data.userAsset.latestRation,
                accu_revenue: accu_revenue_string,
                accu_ration: res.data.data.userAsset.accuRation,
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
    
    wx.request({
      url: app.globalData.request_address + "/invest/user/product/settings/" + app.globalData.openid + "/1",
      method: "GET",
      data: {},
      success(res) {
        var setting_tmp_list = that.data.settting_list;
        for (var i = 0; i < res.data.data.length; i++) {
          var cycle = res.data.data[i].cycle;
          var amount = res.data.data[i].amount;
          var cycle_string;
          var setting_tmp = { setting_id: "", style: "" }
          if (cycle == 1) {
            cycle_string = "每周"
          }
          else if (cycle == 2) {
            cycle_string = "每月"
          }
          else if (cycle == 3) {
            cycle_string = "每两周"
          }
          else if (cycle == 4) {
            cycle_string = "每天"
          }
          setting_tmp.setting_id = res.data.data[i].id
          setting_tmp.style = cycle_string + "定投" + amount + "元"
          setting_tmp_list.push(setting_tmp)
        }
        console.log(setting_tmp_list)
        that.setData({
          settting_list: setting_tmp_list
        })
      },
      fail(res) {
        console.log("fail")
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