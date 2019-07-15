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

    ec_pie: {
      onInit: initChart
    },

    data_7_X: ["2019/7/17", "2019/7/18", "2019/7/19", "2019/7/20", "2019/7/21", "2019/7/22", "2019/7/23"],
    data_7_Y1: [0.701804458, 0.657815753, 0.707254008, 0.723118167, 0.67876052, 0.730871283, 0.763342597],
    data_7_Y2: [4.141390077, 4.100298891, 4.274664921, 4.134572916, 4.247455701, 4.074769722, 4.045844048],
    data_30_X: ["2019/6/24", "2019/6/25", "2019/6/26", "2019/6/27", "2019/6/28", "2019/6/29", "2019/6/30", "2019/7/1", "2019/7/2","2019/7/3", "2019/7/4", "2019/7/5", "2019/7/6", "2019/7/7", "2019/7/8", "2019/7/9", "2019/7/10", "2019/7/11", "2019/7/12", "2019/7/13", "2019/7/14", "2019/7/15", "2019/7/16", "2019/7/17", "2019/7/18", "2019/7/19", "2019/7/20", "2019/7/21", "2019/7/22", "2019/7/23"],
    data_30_Y1: [0.764495321, 0.888951702, 0.786450603, 0.706450670, 0.662945251, 0.667718148, 0.7165979, 0.765724442, 0.692867576, 0.733442122, 0.765866503, 0.787582382, 0.789784385, 0.752254728, 0.695959651, 0.734187693, 0.780777895, 0.733714049, 0.693684194, 0.71501064, 0.65316493, 0.702815407, 0.737849845, 0.678265415, 0.701804458, 0.657815753, 0.707254008, 0.723118167, 0.67876052, 0.730871283, 0.7633425970],
    data_30_Y2: [4.070972529, 4.26766761, 4.204651139, 4.028932792, 4.284684567, 4.041063995, 4.225009953, 4.13253567, 4.191964476, 4.07017829, 4.219565254, 4.084552715, 4.026872356, 4.183314882, 4.108127236, 4.162577759, 4.270326724, 4.072224408, 4.270269713, 4.210210774, 4.254545864, 4.015381574, 4.041508987, 4.009595419, 4.047634574, 4.222117386, 4.238399936, 4.287111626, 4.178839605, 4.132482502, 4.022015749],
    data_180_X: ["2019/1/25", "2019/1/26", "2019/1/27", "2019/1/28", "2019/1/29", "2019/1/30", "2019/1/31", "2019/2/1", "2019/2/2", "2019/2/3", "2019/2/4", "2019/2/5", "2019/2/6", "2019/2/7", "2019/2/8", "2019/2/9", "2019/2/10", "2019/2/11", "2019/2/12", "2019/2/13", "2019/2/14", "2019/2/15", "2019/2/16", "2019/2/17", "2019/2/18", "2019/2/19", "2019/2/20", "2019/2/21", "2019/2/22", "2019/2/23", "2019/2/24", "2019/2/25", "2019/2/26", "2019/2/27", "2019/2/28", "2019/3/1", "2019/3/2", "2019/3/3", "2019/3/4", "2019/3/5", "2019/3/6", "2019/3/7", "2019/3/8", "2019/3/9", "2019/3/10", "2019/3/11", "2019/3/12", "2019/3/13", "2019/3/14", "2019/3/15", "2019/3/16", "2019/3/17", "2019/3/18", "2019/3/19", "2019/3/20", "2019/3/21", "2019/3/22", "2019/3/23", "2019/3/24", "2019/3/25", "2019/3/26", "2019/3/27", "2019/3/28", "2019/3/29", "2019/3/30", "2019/3/31", "2019/4/1", "2019/4/2", "2019/4/3", "2019/4/4", "2019/4/5", "2019/4/6", "2019/4/7", "2019/4/8", "2019/4/9", "2019/4/10", "2019/4/11", "2019/4/12", "2019/4/13", "2019/4/14", "2019/4/15", "2019/4/16", "2019/4/17", "2019/4/18", "2019/4/19", "2019/4/20", "2019/4/21", "2019/4/22", "2019/4/23", "2019/4/24", "2019/4/25", "2019/4/26", "2019/4/27", "2019/4/28", "2019/4/29", "2019/4/30", "2019/5/1", "2019/5/2", "2019/5/3", "2019/5/4", "2019/5/5", "2019/5/6", "2019/5/7", "2019/5/8", "2019/5/9", "2019/5/10", "2019/5/11", "2019/5/12", "2019/5/13", "2019/5/14", "2019/5/15", "2019/5/16", "2019/5/17", "2019/5/18", "2019/5/19", "2019/5/20", "2019/5/21", "2019/5/22", "2019/5/23", "2019/5/24", "2019/5/25", "2019/5/26", "2019/5/27", "2019/5/28", "2019/5/29", "2019/5/30", "2019/5/31", "2019/6/1", "2019/6/2", "2019/6/3", "2019/6/4", "2019/6/5", "2019/6/6", "2019/6/7", "2019/6/8", "2019/6/9", "2019/6/10", "2019/6/11", "2019/6/12", "2019/6/13", "2019/6/14", "2019/6/15", "2019/6/16", "2019/6/17", "2019/6/18", "2019/6/19", "2019/6/20", "2019/6/21", "2019/6/22", "2019/6/23", "2019/6/24", "2019/6/25", "2019/6/26", "2019/6/27", "2019/6/28", "2019/6/29", "2019/6/30", "2019/7/1", "2019/7/2", "2019/7/3", "2019/7/4", "2019/7/5", "2019/7/6", "2019/7/7", "2019/7/8", "2019/7/9", "2019/7/10", "2019/7/11", "2019/7/12", "2019/7/13", "2019/7/14", "2019/7/15", "2019/7/16", "2019/7/17", "2019/7/18", "2019/7/19", "2019/7/20", "2019/7/21", "2019/7/22", "2019/7/23"],
    data_180_Y1: [0.740425361, 0.75543569, 0.751604932, 0.74415515, 0.780161231, 0.711364864, 0.702269171, 0.76070752, 0.73498242, 0.717825121, 0.787751613, 0.786959963, 0.794679605, 0.728990557, 0.710875595, 0.744757344, 0.759158588, 0.71302783, 0.765587151, 0.740037274, 0.701362245, 0.777563725, 0.749662488, 0.708156333, 0.700170464, 0.747333399, 0.752857322, 0.792165141, 0.75501381, 0.72501381, 0.739722626, 0.729876765, 0.719876765, 0.76341118, 0.798041553, 0.735648789, 0.781234109, 0.710981287, 0.761567195, 0.757272967, 0.740684087, 0.767906768, 0.79195381, 0.703752704, 0.702432287, 0.709644523, 0.740438927, 0.764723767, 0.788375877, 0.715956736, 0.761519989, 0.749997037, 0.799656795, 0.761082431, 0.731397256, 0.759851754, 0.739851754, 0.718017018, 0.659191429, 0.684238343, 0.705233153, 0.729001497, 0.783727342, 0.78139329, 0.660274333, 0.718062608, 0.694647881, 0.713590764, 0.67014946, 0.751587299, 0.687500843, 0.65458304, 0.689450511, 0.664071753, 0.662652468, 0.524363412, 0.527840434, 0.516234253, 0.510814253, 0.58982361, 0.592860524, 0.507203534, 0.589485126, 0.534813693, 0.564688289, 0.574688289, 0.576496673, 0.559823457, 0.59498729, 0.572316636, 0.669030497, 0.630695845, 0.555105521, 0.625105521, 0.727954799, 0.680046013, 0.604879425, 0.714100379, 0.690949793, 0.651561321, 0.701019548, 0.642606371, 0.667407495, 0.687407495, 0.799116457, 0.736665126, 0.623245449, 0.674197918, 0.779107254, 0.657937525, 0.693257443, 0.677116684, 0.607653843, 0.713646781, 0.723001128, 0.717768326, 0.864086706, 0.885056311, 0.765214005, 0.779156675, 0.813174818, 0.766535689, 0.885772522, 0.776770429, 0.802755077, 0.846975386, 0.792975509, 0.874654823, 0.740952933, 0.734865924, 0.724865924, 0.818837161, 0.890672226, 0.844531767, 0.873210147, 0.827634233, 0.760260486, 0.899056692, 0.754021804, 0.882018314, 0.843710425, 0.815005434, 0.849807437, 0.876084819, 0.829848998, 0.877836123, 0.855396423, 0.752342995, 0.817765975, 0.66795934, 0.764495069, 0.724033526, 0.726820606, 0.662375639, 0.707808105, 0.713300048, 0.753030577, 0.735676737, 0.692139288, 0.675697198, 0.665697198, 0.765418745, 0.681373585, 0.782856012, 0.763705831, 0.683873808, 0.693807157, 0.653078629, 0.657285919, 0.718594874, 0.70558827, 0.738408206, 0.720719603, 0.670775054, 0.786349796, 0.740452569, 0.659660676, 0.730532618],
    data_180_Y2: [4.347391865, 4.34642809, 4.360755962, 4.350785251, 4.345198748, 4.356791715, 4.322899011, 4.326494616, 4.382486413, 4.319757573, 4.346171593, 4.392889208, 4.348517994, 4.312000458, 4.355596686, 4.36910788, 4.351284362, 4.334136397, 4.345886955, 4.30686068, 4.369204108, 4.356666177, 4.30575249, 4.382257653, 4.379329431, 4.365628192, 4.373381406, 4.372085336, 4.336768744, 4.338669461, 4.35193258, 4.301510994, 4.368520717, 4.385141531, 4.313713043, 4.36021334, 4.335174832, 4.361652841, 4.344095217, 4.324433123, 4.321572927, 4.305212594, 4.398407307, 4.321736629, 4.325114346, 4.322228639, 4.356965948, 4.330685174, 4.352701083, 4.319961976, 4.325738994, 4.322626757, 4.328397987, 4.368638988, 4.382652756, 4.332231905, 4.378671075, 4.377030239, 4.307591953, 4.320068431, 4.33061189, 4.309993802, 4.334506632, 4.301967437, 4.360214622, 4.347150736, 4.353329121, 4.343119285, 4.387596538, 4.313423123, 4.365021266, 4.321927846, 4.338691377, 4.367564669, 4.347452342, 4.352169234, 4.328924612, 4.385342115, 4.343445096, 4.349612821, 4.365648885, 4.368694106, 4.34960507, 4.318927099, 4.366894898, 4.376234697, 4.331863057, 4.399196924, 4.335496711, 4.362651926, 4.345820776, 4.301894479, 4.39359314, 4.304681587, 4.327566733, 4.243005325, 4.221337776, 4.279567304, 4.224320585, 4.299679497, 4.222100116, 4.286233848, 4.215528184, 4.29961225, 4.298587351, 4.271027742, 4.276083472, 4.278471449, 4.266995647, 4.248874827, 4.22346683, 4.221706543, 4.215384923, 4.295116398, 4.267742809, 4.269990361, 4.268542326, 4.264109636, 4.273838278, 4.269667269, 4.276386958, 4.241620748, 4.162592772, 4.197486045, 4.123614812, 4.192561216, 4.13137348, 4.288346551, 4.271071465, 4.00177671, 4.187405285, 4.229598802, 4.063111695, 4.188695305, 4.286792496, 4.093238358, 4.049089426, 4.177928899, 4.105716551, 4.164900439, 4.189445319, 4.198570375, 4.086766476, 4.044853637, 4.259433657, 4.081093059, 4.150621412, 4.107427665, 4.205641211, 4.006650512, 4.070972529, 4.26766761, 4.204651139, 4.028932792, 4.284684567, 4.041063995, 4.225009953, 4.13253567, 4.191964476, 4.07017829, 4.219565254, 4.084552715, 4.026872356, 4.183314882, 4.108127236, 4.162577759, 4.270326724, 4.072224408, 4.270269713, 4.210210774, 4.254545864, 4, 4.041508987, 4.009595419, 4.047634574, 4.222117386, 4.238399936, 4.287111626, 4, 4.132482502, 4.022015749],
    data_365_X: ["2018/7/24", "2018/7/25", "2018/7/26", "2018/7/27", "2018/7/28", "2018/7/29", "2018/7/30", "2018/7/31", "2018/8/1", "2018/8/2", "2018/8/3", "2018/8/4", "2018/8/5", "2018/8/6", "2018/8/7", "2018/8/8", "2018/8/9", "2018/8/10", "2018/8/11", "2018/8/12", "2018/8/13", "2018/8/14", "2018/8/15", "2018/8/16", "2018/8/17", "2018/8/18", "2018/8/19", "2018/8/20", "2018/8/21", "2018/8/22", "2018/8/23", "2018/8/24", "2018/8/25", "2018/8/26", "2018/8/27", "2018/8/28", "2018/8/29", "2018/8/30", "2018/8/31", "2018/9/1", "2018/9/2", "2018/9/3", "2018/9/4", "2018/9/5", "2018/9/6", "2018/9/7", "2018/9/8", "2018/9/9", "2018/9/10", "2018/9/11", "2018/9/12", "2018/9/13", "2018/9/14", "2018/9/15", "2018/9/16", "2018/9/17", "2018/9/18", "2018/9/19", "2018/9/20", "2018/9/21", "2018/9/22", "2018/9/23", "2018/9/24", "2018/9/25", "2018/9/26", "2018/9/27", "2018/9/28", "2018/9/29", "2018/9/30", "2018/10/1", "2018/10/2", "2018/10/3", "2018/10/4", "2018/10/5", "2018/10/6", "2018/10/7", "2018/10/8", "2018/10/9", "2018/10/10", "2018/10/11", "2018/10/12", "2018/10/13", "2018/10/14", "2018/10/15", "2018/10/16", "2018/10/17", "2018/10/18", "2018/10/19", "2018/10/20", "2018/10/21", "2018/10/22", "2018/10/23", "2018/10/24", "2018/10/25", "2018/10/26", "2018/10/27", "2018/10/28", "2018/10/29", "2018/10/30", "2018/10/31", "2018/11/1", "2018/11/2", "2018/11/3", "2018/11/4", "2018/11/5", "2018/11/6", "2018/11/7", "2018/11/8", "2018/11/9", "2018/11/10", "2018/11/11", "2018/11/12", "2018/11/13", "2018/11/14", "2018/11/15", "2018/11/16", "2018/11/17", "2018/11/18", "2018/11/19", "2018/11/20", "2018/11/21", "2018/11/22", "2018/11/23", "2018/11/24", "2018/11/25", "2018/11/26", "2018/11/27", "2018/11/28", "2018/11/29", "2018/11/30", "2018/12/1", "2018/12/2", "2018/12/3", "2018/12/4", "2018/12/5", "2018/12/6", "2018/12/7", "2018/12/8", "2018/12/9", "2018/12/10", "2018/12/11", "2018/12/12", "2018/12/13", "2018/12/14", "2018/12/15", "2018/12/16", "2018/12/17", "2018/12/18", "2018/12/19", "2018/12/20", "2018/12/21", "2018/12/22", "2018/12/23", "2018/12/24", "2018/12/25", "2018/12/26", "2018/12/27", "2018/12/28", "2018/12/29", "2018/12/30", "2018/12/31", "2019/1/1", "2019/1/2", "2019/1/3", "2019/1/4", "2019/1/5", "2019/1/6", "2019/1/7", "2019/1/8", "2019/1/9", "2019/1/10", "2019/1/11", "2019/1/12", "2019/1/13", "2019/1/14", "2019/1/15", "2019/1/16", "2019/1/17", "2019/1/18", "2019/1/19", "2019/1/20", "2019/1/21", "2019/1/22", "2019/1/23", "2019/1/24", "2019/1/25", "2019/1/26", "2019/1/27", "2019/1/28", "2019/1/29", "2019/1/30", "2019/1/31", "2019/2/1", "2019/2/2", "2019/2/3", "2019/2/4", "2019/2/5", "2019/2/6", "2019/2/7", "2019/2/8", "2019/2/9", "2019/2/10", "2019/2/11", "2019/2/12", "2019/2/13", "2019/2/14", "2019/2/15", "2019/2/16", "2019/2/17", "2019/2/18", "2019/2/19", "2019/2/20", "2019/2/21", "2019/2/22", "2019/2/23", "2019/2/24", "2019/2/25", "2019/2/26", "2019/2/27", "2019/2/28", "2019/3/1", "2019/3/2", "2019/3/3", "2019/3/4", "2019/3/5", "2019/3/6", "2019/3/7", "2019/3/8", "2019/3/9", "2019/3/10", "2019/3/11", "2019/3/12", "2019/3/13", "2019/3/14", "2019/3/15", "2019/3/16", "2019/3/17", "2019/3/18", "2019/3/19", "2019/3/20", "2019/3/21", "2019/3/22", "2019/3/23", "2019/3/24", "2019/3/25", "2019/3/26", "2019/3/27", "2019/3/28", "2019/3/29", "2019/3/30", "2019/3/31", "2019/4/1", "2019/4/2", "2019/4/3", "2019/4/4", "2019/4/5", "2019/4/6", "2019/4/7", "2019/4/8", "2019/4/9", "2019/4/10", "2019/4/11", "2019/4/12", "2019/4/13", "2019/4/14", "2019/4/15", "2019/4/16", "2019/4/17", "2019/4/18", "2019/4/19", "2019/4/20", "2019/4/21", "2019/4/22", "2019/4/23", "2019/4/24", "2019/4/25", "2019/4/26", "2019/4/27", "2019/4/28", "2019/4/29", "2019/4/30", "2019/5/1", "2019/5/2", "2019/5/3", "2019/5/4", "2019/5/5", "2019/5/6", "2019/5/7", "2019/5/8", "2019/5/9", "2019/5/10", "2019/5/11", "2019/5/12", "2019/5/13", "2019/5/14", "2019/5/15", "2019/5/16", "2019/5/17", "2019/5/18", "2019/5/19", "2019/5/20", "2019/5/21", "2019/5/22", "2019/5/23", "2019/5/24", "2019/5/25", "2019/5/26", "2019/5/27", "2019/5/28", "2019/5/29", "2019/5/30", "2019/5/31", "2019/6/1", "2019/6/2", "2019/6/3", "2019/6/4", "2019/6/5", "2019/6/6", "2019/6/7", "2019/6/8", "2019/6/9", "2019/6/10", "2019/6/11", "2019/6/12", "2019/6/13", "2019/6/14", "2019/6/15", "2019/6/16", "2019/6/17", "2019/6/18", "2019/6/19", "2019/6/20", "2019/6/21", "2019/6/22", "2019/6/23", "2019/6/24", "2019/6/25", "2019/6/26", "2019/6/27", "2019/6/28", "2019/6/29", "2019/6/30", "2019/7/1", "2019/7/2", "2019/7/3", "2019/7/4", "2019/7/5", "2019/7/6", "2019/7/7", "2019/7/8", "2019/7/9", "2019/7/10", "2019/7/11", "2019/7/12", "2019/7/13", "2019/7/14", "2019/7/15", "2019/7/16", "2019/7/17", "2019/7/18", "2019/7/19", "2019/7/20", "2019/7/21", "2019/7/22", "2019/7/23"],
    data_365_Y1: [0.539506911, 0.581884283, 0.690216824, 0.688639908, 0.580854668, 0.647382763, 0.659271983, 0.587457335, 0.582587632, 0.596342254, 0.629183029, 0.576978082, 0.536978082, 0.551700331, 0.553301796, 0.584119885, 0.672201618, 0.540239076, 0.556888713, 0.643840489, 0.677682556, 0.614172503, 0.580459207, 0.540459207, 0.651569864, 0.603432728, 0.798286769, 0.767939058, 0.788468825, 0.768468825, 0.75501061, 0.706906895, 0.746688983, 0.716688983, 0.705329778, 0.793530468, 0.747409965, 0.724814775, 0.799151797, 0.730447787, 0.761298516, 0.721298516, 0.788446848, 0.749579167, 0.911700258, 0.881308815, 0.922177237, 0.834580094, 0.898900015, 0.924346794, 0.945782319, 0.86969798, 0.96336896, 0.975604581, 0.853399398, 0.847421529, 0.928907655, 0.858786523, 0.838351153, 0.858202857, 0.878202857, 0.834780811, 0.814780811, 0.858199543, 1.112754073, 1.026888175, 1.050835614, 1.070835614, 1.083787361, 1.090129788, 1.063264223, 1.087818532, 1.078833353, 1.000767296, 1.093093652, 1.010880596, 1.087100372, 1.027131138, 0.974055985, 0.934055985, 0.958156586, 0.946572363, 0.97925029, 0.939976972, 0.983928861, 0.955740835, 0.97355124, 0.932549712, 0.98923762, 0.959675, 0.954412834, 0.944212834, 0.931753944, 0.923953335, 0.943605724, 0.939248711, 0.929158356, 0.939158356, 0.930131116, 0.905869308, 0.917216065, 0.912498691, 0.920760173, 0.812562028, 0.971038061, 0.828019568, 0.893708326, 0.871670857, 0.883222765, 0.893222765, 0.914059833, 0.954059833, 0.960428359, 0.977317135, 0.887968543, 0.936340264, 0.986340264, 0.936340264, 0.87264712, 0.885331285, 0.891127653, 0.940545123, 0.86666235, 0.880834721, 0.880472971, 0.961384202, 0.925583505, 0.94779543, 0.931718044, 0.953362193, 0.874919617, 0.86167194, 0.816472101, 0.847473282, 0.89579679, 0.807823142, 0.876250576, 0.856250576, 0.831351881, 0.894875599, 0.809760134, 0.813652546, 0.8272796, 0.89226416, 0.804374876, 0.897569735, 0.86617385, 0.806071357, 0.864408675, 0.803771418, 0.845627486, 0.895627486, 0.893989317, 0.811140056, 0.833953999, 0.855953999, 0.803184601, 0.836554117, 0.818781579, 0.808781579, 0.611568022, 0.719117504, 0.66774256, 0.738585226, 0.75663548, 0.709524649, 0.659524649, 0.612540241, 0.626522113, 0.639030731, 0.723734849, 0.770055451, 0.711252133, 0.731252133, 0.715252133, 0.706890015, 0.647358619, 0.687919808, 0.644652103, 0.64524968, 0.630851057, 0.79931778, 0.782915188, 0.740425361, 0.75543569, 0.751604932, 0.74415515, 0.780161231, 0.711364864, 0.702269171, 0.76070752, 0.73498242, 0.717825121, 0.787751613, 0.786959963, 0.794679605, 0.754679605, 0.710875595, 0.744757344, 0.759158588, 0.71302783, 0.765587151, 0.740037274, 0.701362245, 0.777563725, 0.749662488, 0.708156333, 0.700170464, 0.747333399, 0.752857322, 0.778737382, 0.788737382, 0.72501381, 0.708737634, 0.732873763, 0.786968931, 0.719876765, 0.716729513, 0.76341118, 0.798041553, 0.735648789, 0.781234109, 0.710981287, 0.761567195, 0.730684087, 0.740684087, 0.767906768, 0.79195381, 0.719644523, 0.729644523, 0.709644523, 0.740438927, 0.764723767, 0.788375877, 0.715956736, 0.761519989, 0.749997037, 0.799656795, 0.765656795, 0.731397256, 0.759851754, 0.738017018, 0.718017018, 0.659191429, 0.685233153, 0.705233153, 0.729001497, 0.783727342, 0.78139329, 0.660274333, 0.718062608, 0.694647881, 0.66014946, 0.67014946, 0.751587299, 0.70458304, 0.65458304, 0.689450511, 0.664071753, 0.662652468, 0.524363412, 0.527840434, 0.516234253, 0.510814253, 0.58982361, 0.592860524, 0.507203534, 0.589485126, 0.534813693, 0.564688289, 0.515074734, 0.576496673, 0.573467882, 0.559823457, 0.59498729, 0.572316636, 0.669030497, 0.625105521, 0.555105521, 0.75111989, 0.700046013, 0.680046013, 0.604879425, 0.714100379, 0.691561321, 0.651561321, 0.701019548, 0.670887223, 0.630887223, 0.687407495, 0.799116457, 0.736665126, 0.623245449, 0.674197918, 0.779107254, 0.657937525, 0.693257443, 0.677116684, 0.607653843, 0.663001128, 0.723001128, 0.717768326, 0.864086706, 0.885056311, 0.765214005, 0.779156675, 0.813174818, 0.766535689, 0.885772522, 0.776770429, 0.802755077, 0.797975509, 0.792975509, 0.874654823, 0.740952933, 0.735250024, 0.724865924, 0.818837161, 0.890672226, 0.844531767, 0.873210147, 0.827634233, 0.760260486, 0.899056692, 0.754021804, 0.882018314, 0.843710425, 0.815005434, 0.849807437, 0.876084819, 0.829848998, 0.877836123, 0.807836123, 0.752342995, 0.817765975, 0.66795934, 0.764495069, 0.724033526, 0.726820606, 0.662375639, 0.707808105, 0.713300048, 0.725676737, 0.735676737, 0.692139288, 0.778031951, 0.665697198, 0.671373585, 0.681373585, 0.782856012, 0.763705831, 0.683873808, 0.693807157, 0.653078629, 0.657285919, 0.718594874, 0.70558827, 0.738408206, 0.720719603, 0.670775054, 0.786349796, 0.740452569, 0.659660676, 0.730532618],
    data_365_Y2: [4.032735553, 4.168925093, 4.19632221, 4.050686351, 4.130072922, 4.116650973, 4.26174965, 4.295399638, 4.142365339, 4.218973551, 4.214289189, 4.264652592, 4.231677412, 4.102148699, 4.290970933, 4.248248443, 4.114761787, 4.200838039, 4.226181016, 4.192096687, 4.270983075, 4.112510253, 4.162718963, 4.232801223, 4.171896398, 4.144378595, 4.106793926, 4.293691639, 4.15715063, 4.148745999, 4.174868532, 4.25489382, 4.272320724, 4.241385871, 4.239000635, 4.265870915, 4.129828932, 4.105967344, 4.254493446, 4.12005837, 4.238065221, 4.288509756, 4.176162378, 4.118632412, 4.106395636, 4.106148008, 4.141324711, 4.176849013, 4.219033692, 4.283969353, 4.276464638, 4.148212337, 4.160635585, 4.281749683, 4.260786957, 4.218820757, 4.288203498, 4.116449635, 4.266404892, 4.14576453, 4.223141878, 4.222324149, 4.179597603, 4.257108091, 4.219359668, 4.118451363, 4.112007936, 4.225411362, 4.29742394, 4.105087222, 4.258190573, 4.1354451, 4.114622886, 4.241630747, 4.106710242, 4.21089847, 4.271899568, 4.233213501, 4.219131572, 4.12721625, 4.192412059, 4.232839849, 4.144486456, 4.252387868, 4.160329189, 4.261819965, 4.210972651, 4.295972627, 4.135116248, 4.491797648, 4.367568797, 4.396549293, 4.337861588, 4.447673529, 4.359134037, 4.353895743, 4.393548586, 4.323243828, 4.48849089, 4.458053693, 4.30905371, 4.480713882, 4.367083979, 4.4487076, 4.3392675, 4.4669349, 4.456987271, 4.471637778, 4.301924574, 4.425444824, 4.309603203, 4.468351702, 4.397125039, 4.332679895, 4.498447527, 4.310606682, 4.423112471, 4.434236815, 4.314158133, 4.316306195, 4.334157104, 4.489974785, 4.403121867, 4.413121867, 4.427534027, 4.44527035, 4.439065307, 4.408729999, 4.301544816, 4.476853331, 4.390035318, 4.499925267, 4.490065111, 4.319991429, 4.381804636, 4.489563594, 4.472202448, 4.373255707, 4.403628362, 4.47394881, 4.253169591, 4.303169591, 4.36316448, 4.351281308, 4.360945349, 4.460767045, 4.402077273, 4.425001831, 4.323326443, 4.329397145, 4.427208428, 4.303478805, 4.412789525, 4.450106487, 4.342786771, 4.306348673, 4.378575202, 4.457455271, 4.412062225, 4.441215958, 4.324348269, 4.435168363, 4.30720139, 4.364319138, 4.380740603, 4.336212711, 4.410576836, 4.475795717, 4.311532001, 4.369970248, 4.309355488, 4.361600031, 4.343867401, 4.353648232, 4.311754718, 4.335351564, 4.334115113, 4.391603461, 4.368841766, 4.373070683, 4.385658747, 4.396819106, 4.397206066, 4.35396802, 4.347391865, 4.34642809, 4.360755962, 4.350785251, 4.345198748, 4.356791715, 4.322899011, 4.326494616, 4.382486413, 4.319757573, 4.346171593, 4.392889208, 4.348517994, 4.312000458, 4.355596686, 4.36910788, 4.351284362, 4.334136397, 4.345886955, 4.30686068, 4.369204108, 4.356666177, 4.30575249, 4.382257653, 4.379329431, 4.365628192, 4.373381406, 4.372085336, 4.336768744, 4.338669461, 4.35193258, 4.301510994, 4.368520717, 4.385141531, 4.313713043, 4.36021334, 4.335174832, 4.361652841, 4.344095217, 4.324433123, 4.321572927, 4.305212594, 4.398407307, 4.321736629, 4.325114346, 4.322228639, 4.356965948, 4.330685174, 4.352701083, 4.319961976, 4.325738994, 4.322626757, 4.328397987, 4.368638988, 4.382652756, 4.332231905, 4.378671075, 4.377030239, 4.307591953, 4.320068431, 4.33061189, 4.309993802, 4.334506632, 4.301967437, 4.360214622, 4.347150736, 4.353329121, 4.343119285, 4.387596538, 4.313423123, 4.365021266, 4.321927846, 4.338691377, 4.367564669, 4.347452342, 4.352169234, 4.328924612, 4.385342115, 4.343445096, 4.349612821, 4.365648885, 4.368694106, 4.34960507, 4.318927099, 4.366894898, 4.376234697, 4.331863057, 4.399196924, 4.335496711, 4.362651926, 4.345820776, 4.301894479, 4.39359314, 4.304681587, 4.327566733, 4.243005325, 4.221337776, 4.279567304, 4.224320585, 4.299679497, 4.222100116, 4.286233848, 4.215528184, 4.29961225, 4.298587351, 4.271027742, 4.276083472, 4.278471449, 4.266995647, 4.248874827, 4.22346683, 4.221706543, 4.215384923, 4.295116398, 4.267742809, 4.269990361, 4.268542326, 4.264109636, 4.273838278, 4.269667269, 4.276386958, 4.241620748, 4.162592772, 4.197486045, 4.123614812, 4.192561216, 4.13137348, 4.288346551, 4.271071465, 4.00177671, 4.187405285, 4.229598802, 4.063111695, 4.163111695, 4.286792496, 4.093238358, 4.049089426, 4.177928899, 4.105716551, 4.164900439, 4.189445319, 4.198570375, 4.086766476, 4.044853637, 4.259433657, 4.081093059, 4.150621412, 4.107427665, 4.205641211, 4.006650512, 4.070972529, 4.26766761, 4.204651139, 4.028932792, 4.284684567, 4.041063995, 4.225009953, 4.13253567, 4.191964476, 4.07017829, 4.219565254, 4.084552715, 4.026872356, 4.183314882, 4.108127236, 4.162577759, 4.270326724, 4.072224408, 4.270269713, 4.210210774, 4.254545864, 4.015381574, 4.041508987, 4.009595419, 4.119595419, 4.222117386, 4.238399936, 4.287111626, 4.207111626, 4.132482502, 4.022015749]
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

  purchase1: function () {
    app.globalData.purchase = 0;
    wx.navigateTo({
      url: '../examination/examination',
    })
  },

  purchase2: function () {
    app.globalData.purchase = 1;
    wx.navigateTo({
      url: '../examination/examination',
    })
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