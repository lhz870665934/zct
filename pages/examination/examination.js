// pages/examination/examination.js

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    total_points: 0,
    question_list: [
      { question: "您的主要收入来源是："},
      { question: "您的家庭可支配年收入为（折合人民币）？"},
      { question: "在您每年的家庭可支配收入中，可用于金融投资（储蓄存款除外）的比例为？" },
      { question: "您是否有尚未清偿的数额较大的债务，如有，其性质是：" },
      { question: "您的投资知识可描述为：" },
      { question: "您的投资经验可描述为：" },
      { question: "您有多少年投资基金、股票、信托、私募证券或金融衍生产品等风险投资品的经验？" },
      { question: "您计划的投资期限是多久？" },
      { question: "您打算重点投资于哪些种类的投资品种？" },
      { question: "您的投资目的？" },
      { question: "假设有两种投资：投资 A 预期获得 10%的收益，可能承担的损失非常小；投资 B 预期获得 30%的收益，但可能承担较大亏损。您会怎么支配您的投资：" },
      { question: "您认为自己能承受的最大投资损失是多少？" },
      { question: "在投资过程中，您是否不愿承受任何投资损失或没有风险容忍度？" },
      { question: "您是否存在不良诚信记录？" }
    ],
    "answer_list": [
      [
        {
          "name": "无固定收入",
          "value": 2
        },
        {
          "name": "工资、劳务报酬",
          "value": 1
        },
        {
          "name": "生产经营所得",
          "value": 1
        },
        {
          "name": "利息、股息、转让等金融性资产收入",
          "value": 1
        },
        {
          "name": "出租、出售房地产等非金融性资产收入",
          "value": 1
        }
      ],
      [
        {
          "name": "少于 10 万元",
          "value": 5
        },
        {
          "name": "10 万元-30 万元",
          "value": 4
        },
        {
          "name": "30 万元-60 万元",
          "value": 3
        },
        {
          "name": "60 万元-100 万元",
          "value": 2
        },
        {
          "name": "100 万元以上",
          "value": 1
        }
      ],
      [
        {
          "name": "小于 10%",
          "value": 5
        },
        {
          "name": "10％-25％",
          "value": 4
        },
        {
          "name": "25％-50％",
          "value": 3
        },
        {
          "name": "50％-70％",
          "value": 2
        },
        {
          "name": "大于 70％",
          "value": 1
        }
      ],
      [
        {
          "name": "有，住房抵押贷款等长期定额债务",
          "value": 5
        },
        {
          "name": "有，信用卡欠款、消费信贷等短期信用债务",
          "value": 4
        },
        {
          "name": "有，亲戚朋友借款",
          "value": 3
        },
        {
          "name": "没有",
          "value": 1
        }
      ],
      [
        {
          "name": "有限：对金融产品方面的知识很有限",
          "value": 5
        },
        {
          "name": "一般：对金融产品及其相关风险具有基本的知识和理解",
          "value": 3
        },
        {
          "name": "丰富：对金融产品及其相关风险具有丰富的知识和理解",
          "value": 1
        }
      ],
      [
        {
          "name": "除银行储蓄外，没有其他投资经验",
          "value": 5
        },
        {
          "name": "购买过债券、保险等理财产品",
          "value": 4
        },
        {
          "name": "参与过股票、基金等产品的交易",
          "value": 3
        },
        {
          "name": "参与过权证、期货、期权等产品的交易",
          "value": 1
        }
      ],
      [
        {
          "name": "没有经验",
          "value": 5
        },
        {
          "name": "2 年以内",
          "value": 4
        },
        {
          "name": "2-5 年",
          "value": 3
        },
        {
          "name": "5-10 年",
          "value": 2
        },
        {
          "name": "10 年以上",
          "value": 1
        }
      ],
      [
        {
          "name": "1 年以内",
          "value": 5
        },
        {
          "name": "1-3 年",
          "value": 4
        },
        {
          "name": "3-5 年",
          "value": 3
        },
        {
          "name": "5-8 年",
          "value": 2
        },
        {
          "name": "8 年以上",
          "value": 1
        }
      ],
      [
        {
          "name": "货币基金、银行理财产品",
          "value": 5
        },
        {
          "name": "债券或债券型基金",
          "value": 4
        },
        {
          "name": "混合型基金",
          "value": 3
        },
        {
          "name": "股票型基金或股票",
          "value": 2
        },
        {
          "name": "期货、期权等金融衍生品",
          "value": 1
        }
      ],
      [
        {
          "name": "不希望本金损失，希望获得稳定回报",
          "value": 5
        },
        {
          "name": "保守投资，争取本金安全，愿承担一定幅度的收益波动",
          "value": 4
        },
        {
          "name": "寻求资金的较高收益和成长性，愿为此承担有限本金损失",
          "value": 3
        },
        {
          "name": "希望赚取高回报，愿为此承担较大本金损失",
          "value": 1
        }
      ],
      [
        {
          "name": "全部投资于收益较小且风险较小的 A",
          "value": 5
        },
        {
          "name": "同时投资于 A 和 B，但大部分资金投资于收益较小且风险较小的 A",
          "value": 4
        },
        {
          "name": "同时投资于 A 和 B，各投资 50%",
          "value": 3
        },
        {
          "name": "同时投资于 A 和 B，但大部分资金投资于收益较大且风险较大的 B",
          "value": 2
        },
        {
          "name": "全部投资于收益较大且风险较大的 B",
          "value": 1
        }
      ],
      [
        {
          "name": "5%以内",
          "value": 5
        },
        {
          "name": "5% - 15%",
          "value": 4
        },
        {
          "name": "15% - 30%",
          "value": 3
        },
        {
          "name": "30% - 50%",
          "value": 2
        },
        {
          "name": "超过 50%",
          "value": 1
        }
      ],
      [
        {
          "name": "是",
          "value": 0
        },
        {
          "name": "否",
          "value": 0
        }
      ],
      [
        {
          "name": "有",
          "value": 0
        },
        {
          "name": "没有",
          "value": 0
        }
      ]
    ],
    point: [],
    id: 0,
    pos: 0,
    back_show: false,
    ani: ""
  },

  countpoints: function (options) {
    this.data.total_points = 0
    for (var i = 0; i < 14; i++) {
      if (this.data.point[i] == null) {
        wx.showToast({
          title: "第" + (i + 1) + "题未作答",
          icon: "none",
          mask: true
        })
        break;
      }
      this.data.total_points += this.data.point[i]
      if (i == 13) {
        console.log(this.data.total_points)
        wx.navigateTo({
          url: '../purchase/purchase',
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
    // wx.pageScrollTo({
    //   scrollTop: this.data.pos * wx.getSystemInfoSync().windowHeight,
    // })
    //this.animation.translate(0, wx.getSystemInfoSync().windowHeight).step()


    // getCurrentPages().pop();
    // wx.navigateTo({
    //   url: './examination?id=' + (this.data.id + 1),
    // })
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
    // wx.pageScrollTo({
    //   scrollTop: this.data.pos * wx.getSystemInfoSync().windowHeight,
    // })
  },

  donothing: function () {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.total_points = 0
    // this.setData({
    //   id: parseInt(options.id)
    // })
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