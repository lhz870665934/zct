// pages/details/details.js
import * as echarts from '../../ec-canvas/echarts';

var Chart = null;
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product_name: "易达方上证50指数C（003333）",
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

    data_7_X: ["1", "2", "3", "4", "5", "6", "7"],
    data_7_Y1: [520, 600, 501, 505, 700, 600, 800],
    data_7_Y2: [520, 600, 501, 505, 400, 600, 800],
    data_30_X: ["1", "2", "3", "4", "5", "6", "7", "1", "2", "3", "4", "5", "6", "7", "1", "2", "3", "4", "5", "6", "7"],
    data_30_Y1: [520, 600, 501, 505, 700, 600, 800, 520, 600, 501, 505, 700, 600, 800, 520, 600, 501, 505, 700, 600, 800],
    data_30_Y2: [520, 600, 501, 505, 400, 600, 800, 520, 600, 501, 505, 400, 600, 800, 520, 600, 501, 505, 400, 600, 800],
    data_180_X: ["1", "2", "3", "4", "5", "6", "7", "1", "2", "3", "4", "5", "6", "7"],
    data_180_Y1: [520, 600, 501, 505, 700, 600, 800, 520, 600, 501, 505, 700, 600, 800],
    data_180_Y2: [520, 600, 501, 505, 400, 600, 800, 520, 600, 501, 505, 400, 600, 800],
    data_365_X: ["1", "2", "3"],
    data_365_Y1: [520, 600, 501],
    data_365_Y2: [520, 600, 501]
  },

  getData: function (dataX, dataY1, dataY2) {
    if (!Chart) {
      this.init_echarts(); //初始化图表
    } else {
      this.setOption(Chart, dataX, dataY1, dataY2); //更新数据
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
      this.setOption(Chart, this.data.data_7_X, this.data.data_7_Y1, this.data.data_7_Y2);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },

  setOption: function (Chart, dataX, dataY1, dataY2) {
    //Chart.clear();  // 清除
    this.echartsComponnet.init(Chart)
    Chart.setOption(this.getOption(dataX, dataY1, dataY2));  //获取新数据
  },

  getOption: function (dataX, dataY1, dataY2) {
    console.log(dataX)
    console.log(dataY1)
    console.log(dataY2)
    var option = {
      title: {
        left: 'center'
      },
      color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
      legend: {
        data: ["七日年化", "万份收益"],
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
        name: '七日年化',
        type: 'line',
        smooth: true,
        yAxisIndex: 0,
        data: dataY1
      }, {
        name: '万份收益',
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
      this.getData(this.data.data_7_X, this.data.data_7_Y1, this.data.data_7_Y2)
    }
    else if (this.data.activeIndex == 1) {
      this.getData(this.data.data_30_X, this.data.data_30_Y1, this.data.data_30_Y2)
    }
    else if (this.data.activeIndex == 2) {
      this.getData(this.data.data_180_X, this.data.data_180_Y1, this.data.data_180_Y2)
    }
    else if (this.data.activeIndex == 3) {
      this.getData(this.data.data_365_X, this.data.data_365_Y1, this.data.data_365_Y2)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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