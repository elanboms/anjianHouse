import * as echarts from '../../ec-canvas/echarts';
const app = getApp(); 
// 饼图
function getPieOption(canvas, width, height, color, data) {
  const pieChart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(pieChart);

  var option = {
    title: {
      text: '客户兴趣占比',
      left: 'center',
      top: '10'
    },
    backgroundColor: "#ffffff",
    color: color,
    series: [{
      label: {
        normal: {
          fontSize: 12
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: [0, '60%'],
      data: data,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)'
        }
      }
    }]
  };
  pieChart.setOption(option);
  return pieChart;
}
// 折线图
function getLineOption(canvas, width, height, axis, data) {
  const LineChart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(LineChart);
  var option = {
    title: {
      text: '近15日客户活跃度',
      left: 'center'
    },
    backgroundColor: "#ffffff",
    color: ["#37A2DA"],
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
      data: axis,
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [{
      type: 'line',
      smooth: true,
      data: data,
    }]
  };
  LineChart.setOption(option);
  return LineChart;
}
// 柱状图
// 活跃时段
function getBarOption1(canvas, width, height, axis, data) {
  const barChart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(barChart);

  var option = {
    title: {
      text: '客户活跃时段',
      left: 'center'
    },
    backgroundColor: "#ffffff",
    color: ['#37a2da'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      confine: true
    },

    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: axis,
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisTick: { show: false },

        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        type: 'bar',
        label: {
          normal: {
            show: true,
          }
        },
        data: data,
      },
    ]
  };
  barChart.setOption(option);
  return barChart;
}
// 交互
function getBarOption2(canvas, width, height, axis, data) {
  const barChart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(barChart);

  var option = {
    title: {
      text: '客户与我的互动',
      left: 'center'
    },
    backgroundColor: "#ffffff",
    color: ['#37a2da'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      confine: true
    },

    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: axis,
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        type: 'bar',
        label: {
          normal: {
            show: true,
          }
        },
        data: data,
      },
    ]
  };
  barChart.setOption(option);
  return barChart;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navIndex:0,
    nav:['信息总览','销售排行'],
    time: ['近七天', '近30天', '汇总'],
    list1: [
      {
        text: '客户数',
        num: '0',
      },
      {
        text: '跟进数',
        num: '0',
      },
      {
        text: '推广数',
        num: '0',
      },
    ],
    list2: [
      {
        text: '浏览UV',
        num: '0',
      },
      {
        text: '被保存',
        num: '0',
      },
      {
        text: '点赞互动',
        num: '0',
      },
    ],
    // 饼图
    ecPie: {
      disableTouch: true,
    },
    pieColor: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
    pieData: [{ value: 55, name: '查看名片' }, { value: 20, name: '查看官网' }, { value: 10, name: '查看动态' }, {
      value: 20,
      name: '查看产品'
    }, { value: 38, name: '给你留言' },],
    // 折线图
    ecLine: {
      disableTouch: true,
    },
    lineAxis: ['11-01', '11-02', '11-03', '11-04', '11-05', '11-06', '11-07'],
    lineData: [18, 36, 65, 30, 78, 40, 33],
    // 柱状图
    // 活跃时段
    ecBar1: {
      disableTouch: true,
    },
    barAxis1: ['6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
    barData1: [5, 6, 37, 41, 32, 33, 5, 6, 37, 41, 32, 33, 5, 6, 37, 41, 32, 33, 5,],
    // 互动
    ecBar2: {
      disableTouch: true,
    },
    barAxis2: ['打开咨询', '查看动态', '查看产品', '查看官网', '给你留言', '查看名片'],
    barData2: [300, 270, 340, 344, 300, 320],
    list:[
      {
        id:'0',
        img:'http://www.meiliancheng.cn/public/meiliancheng/imagezy/poster.png',
        name:'皮诺客',
        num:'11',
      },
      {
        id: '0',
        img: 'http://www.meiliancheng.cn/public/meiliancheng/imagezy/poster.png',
        name: '皮诺客',
        num: '11',
      },
      {
        id: '0',
        img: 'http://www.meiliancheng.cn/public/meiliancheng/imagezy/poster.png',
        name: '皮诺客',
        num: '11',
      },
      {
        id: '0',
        img: 'http://www.meiliancheng.cn/public/meiliancheng/imagezy/poster.png',
        name: '皮诺客',
        num: '11',
      },
    ]

  },
  navChoose:function(e){
    
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.setData({
      navIndex:index,
    })
  },
  timeChoose: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var flag = 'all';
    console.log(index)
    that.setData({
      timeIndex: index,
      showContainer: false,
    })
    if (index == 0) {
      flag = 7;
    } else if (index == 1) {
      flag = 30;
    }
    wx.showLoading({
      title: '加载中',
      icon: "loading"
    })
    wx.request({
      url: app.globalData.hostUrl + 'manager/radar',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        mid: app.siteInfo.mid,
        pid: app.siteInfo.pid,
        flag: flag
      },
      success: function (res) {

        wx.hideLoading();
        if (res.data.code == 502) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        } else {
          that.setData({
            list1: res.data.list1,
            list2: res.data.list2,
            pieData: res.data.ld,
            lineAxis: res.data.lineAxis,
            lineData: res.data.lineData,
            barAxis2: res.data.barAxis,
            barData2: res.data.barData,
            list:res.data.sortlist,
            showContainer: true,
          })
        }
      }
    })
  },
  pieInit(e) {
    var that = this;
    var pieColor = this.data.pieColor;
    var pieData = this.data.pieData;
    getPieOption(e.detail.canvas, e.detail.width, e.detail.height, pieColor, pieData);
  },
  lineInit(e) {
    var that = this;
    var axis = this.data.lineAxis;
    var data = this.data.lineData;
    getLineOption(e.detail.canvas, e.detail.width, e.detail.height, axis, data);
  },
  barInit1(e) {
    var that = this;
    var axis = this.data.barAxis1;
    var data = this.data.barData1;
    getBarOption1(e.detail.canvas, e.detail.width, e.detail.height, axis, data);
  },
  barInit2(e) {
    var that = this;
    var axis = this.data.barAxis2;
    var data = this.data.barData2;
    getBarOption2(e.detail.canvas, e.detail.width, e.detail.height, axis, data);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ismanager = parseInt(app.siteInfo.user.isboss);
    if (ismanager !== 1) {
      wx.showToast({
        title: '请先联系上级，开通Boss权限',
        icon: 'none',
      })
      setTimeout(function(){
        wx.navigateBack({
          delta: 1
        })
      },1000)
      return
    }
    wx.showLoading({
      title: '数据加载中',
    })
    var that = this;
    var time = that.data.time;
    var timeIndex = time.length - 1;
    that.setData({
      timeIndex: timeIndex,
      showContainer: false,
    })
    var flag = '7';
    wx.request({
      url: app.globalData.hostUrl + 'manager/radar',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        pid: app.siteInfo.pid,
        flag: flag
      },
      success: function (res) {
        wx.hideLoading();
        if(res.data.code==502){
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }else{
          that.setData({
            list1: res.data.list1,
            list2: res.data.list2,
            pieData: res.data.ld,
            lineAxis: res.data.lineAxis,
            lineData: res.data.lineData,
            barAxis2: res.data.barAxis,
            barData2: res.data.barData,
            list: res.data.sortlist,
            showContainer: true,
          })
        }
        
        
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
    var ismanager = app.siteInfo.user.isboss;
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
  // onShareAppMessage: function () {

  // }
})