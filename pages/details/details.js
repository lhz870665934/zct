// pages/details/details.js
import * as echarts from '../../ec-canvas/echarts';

var Chart = null;
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

var app = getApp()

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
          { value: 70.71, name: '股票' },
          { value: 9.97, name: '债券' },
          { value: 15.92, name: '银行存款' },
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
    product_name: "红棉货币基金",
    earning: 2.47,
    benefit: 0.6481,
    tabs: ["近7日", "近1个月", "近6个月", "近1年"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    ec: {
      lazyLoad: true
    },
    showdata_X: null,
    showData_Y_sevenYear: null,
    showData_Y_benefit: null,

    ec_pie: {
      onInit: initChart
    },

    data_7_X: [],
    data_7_Y1: [],
    data_7_Y2: [],
    data_30_X: [],
    data_30_Y1: [],
    data_30_Y2: [],
    data_180_X: [],
    data_180_Y1: [],
    data_180_Y2: [],
    data_365_X: [],
    data_365_Y1: [],
    data_365_Y2: []
  },

  getData: function (dataX, dataY1, dataY2, isScale) {
    if (!Chart) {
      this.init_echarts(); //初始化图表
    } else {
      this.setOption(Chart, dataX, dataY1, dataY2, isScale); //更新数据
    }
  },

  init_echarts: function () {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      // Chart.setOption(this.getOption());
      this.setOption(Chart, this.data.data_7_X, this.data.data_7_Y1, this.data.data_7_Y2, true);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },

  setOption: function (Chart, dataX, dataY1, dataY2, isScale) {
    //Chart.clear();  // 清除
    this.echartsComponnet.init(Chart)
    Chart.setOption(this.getOption(dataX, dataY1, dataY2, isScale));  //获取新数据
  },

  getOption: function (dataX, dataY1, dataY2, isScale) {
    var option = {
      title: {
        left: 'center'
      },
      color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
      legend: {
        data: ["万份收益", "七日年化"],
        top: 25,
        left: 'center',
        backgroundColor: 'white',
        z: 100
      },
      grid: {
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dataX
        // show: false
      },
      yAxis: [{
        x: 'center',
        scale: isScale,
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
        // show: false
      },
      {
        x: 'center',
        scale: isScale,
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
        // show: false
      }
      ],
      series: [{
        name: '万份收益',
        type: 'line',
        smooth: true,
        yAxisIndex: 0,
        data: dataY1
      }, {
        name: '七日年化',
        type: 'line',
        smooth: true,
        yAxisIndex: 1,
        data: dataY2
      }]
    }
    return option;
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    if (this.data.activeIndex == 0) {
      this.getData(this.data.data_7_X, this.data.data_7_Y1, this.data.data_7_Y2, true)
    }
    else if (this.data.activeIndex == 1) {
      this.getData(this.data.data_30_X, this.data.data_30_Y1, this.data.data_30_Y2, false)
    }
    else if (this.data.activeIndex == 2) {
      this.getData(this.data.data_180_X, this.data.data_180_Y1, this.data.data_180_Y2, false)
    }
    else if (this.data.activeIndex == 3) {
      this.getData(this.data.data_365_X, this.data.data_365_Y1, this.data.data_365_Y2, false)
    }
  },

  toExamination: function () {
    wx.request({
      url: app.globalData.request_address + "/invest/login/first/" + app.globalData.openid,
      method: "GET",
      data: {},
      success (res) {
        console.log(res.data.data)
        if (res.data.data == true) {
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

  purchase1: function () {
    app.globalData.back_methods = 0;
    app.globalData.purchase = 0;
    this.toExamination();
  },

  purchase2: function () {
    app.globalData.back_methods = 0;
    app.globalData.purchase = 1;
    this.toExamination();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var dataFile = require("data.js")
    this.setData({
      data_7_X: dataFile.data_7_X,
      data_7_Y1: dataFile.data_7_Y1,
      data_7_Y2: dataFile.data_7_Y2,
      data_30_X: dataFile.data_30_X,
      data_30_Y1: dataFile.data_30_Y1,
      data_30_Y2: dataFile.data_30_Y2,
      data_180_X: dataFile.data_180_X,
      data_180_Y1: dataFile.data_180_Y1,
      data_180_Y2: dataFile.data_180_Y2,
      data_365_X: dataFile.data_365_X,
      data_365_Y1: dataFile.data_365_Y1,
      data_365_Y2: dataFile.data_365_Y2,
    })

    this.echartsComponnet = this.selectComponent('#mychart-dom-line');
    this.getData();

    var that = this;
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
    Chart = null;
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