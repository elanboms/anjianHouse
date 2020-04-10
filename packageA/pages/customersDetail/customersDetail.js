import * as echarts from '../../ec-canvas/echarts'; 
const app = getApp();
// 饼图 
function getPieOption(canvas, width, height,color,data) {
  const pieChart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(pieChart);

  var option = {
    title: {
      text: '客户兴趣占比',
      left: 'center',
      top:'10'
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
function getLineOption(canvas, width, height,axis, data) {
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
function getBarOption(canvas, width, height, axis, data) {
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
    user:{
      name:'皮诺客',
      tag:'客户',
      img:'http://www.meiliancheng.cn/public/meiliancheng/imagezy/poster.png',
      company:'合肥皮诺客网络科技有限公司',
      phone:'18355556666',
      wechat:'wechats_name',
      tips: ['活跃用户', '潜在客户'],
      complete:'80',
    },
    navIndex:0,
    nav:['互动记录','AI记录'],
    interact:[
      {
        date:'10-25',
        duration:'1分52秒',
        times:'3',
        list:[
          {
            time: '10:39',
            text:'查看了你的产品列表',
          },
          {
            time: '10:39',
            text: '打开咨询',
          },
        ],
      },
      {
        date: '10-25',
        duration: '1分52秒',
        times: '3',
        list: [
          {
            time: '10:39',
            text: '查看了你的产品列表',
          },
          {
            time: '10:39',
            text: '打开咨询',
          },
        ],
      },
    ],
    following:[
      {
        date: '10-25',
        text: '查看了你的产品列表',
      },
      {
        date: '10-24',
        text: '查看了你的产品列表',
      },
      {
        date: '10-23',
        text: '查看了你的产品列表',
      },
      {
        date: '10-22',
        text: '查看了你的产品列表',
      },
      {
        date: '10-20',
        text: '查看了你的产品列表',
      },
    ],
    // 饼图
    ecPie: {
      disableTouch: true,
    },
    pieColor: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F", "#ffff00", "#5d9cec", "#5fbeaa", "#00ffff", "#ff0000", '#4fa56c', '#2ea45b', '#cc9966', '#ff3b4c', '#003b5c'],
    pieData:[{value: 55,name: '查看名片'}, {value: 20,name: '查看官网'}, {value: 10,name: '查看动态'}, {value: 20,
name: '查看产品'}, {value: 38,name: '给你留言'},],
    // 折线图
    ecLine:{
      disableTouch: true,
    },
    lineAxis: ['11-01', '11-02', '11-03', '11-04', '11-05', '11-06', '11-07'],
    lineData: [18, 36, 65, 30, 78, 40, 33],
    // 柱状图
    ecBar:{
      disableTouch: true,
    },
    barAxis: ['打开咨询', '查看动态', '查看产品', '查看官网', '给你留言', '查看名片'],
    barData: [300, 270, 340, 344, 300, 320],
  },
  // 跳转完善个人资料
  toperfectInfo:function(){
    var cid = this.data.cid;
    wx.navigateTo({
      url: '/packageA/pages/perfectInfo/perfectInfo?cid='+cid,
    })
  },
  // 跳转转接客户
  tozhuanjie:function(){
    var cid = this.data.cid;
    wx.navigateTo({
      url: '/packageA/pages/zhuanjie/zhuanjie?cid='+cid,
    })
  },
  // 删除标签
  delTips:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    var user = that.data.userinfo;
    wx.showModal({
      title: '确认删除',
      content: '确认删除该标签吗？',
      success:function(res){
        
        if(res.confirm){
          wx.request({
            url: app.globalData.hostUrl + 'manager/user_group_tags_do',
            method: "post",
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              mid: app.siteInfo.mid,
              cid:that.data.cid,
              id:id,
              action:'del',
            },
            success: function () {
              user.tags.splice(index, 1);
              that.setData({
                userinfo: user,
              })
            }
          })
          
        }
      }
    })
  },
  // 跳转添加标签
  totipsAdd:function(){
    var cid = this.data.cid;
    wx.navigateTo({
      url: '/packageA/pages/tipsAdd/tipsAdd?cid='+cid,
    })
  },
  // tab切换
  chooseNav:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.setData({
      navIndex:index,
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
    getLineOption(e.detail.canvas, e.detail.width, e.detail.height, axis,data);
  },
  barInit(e) {
    var that = this;
    var axis = this.data.barAxis;
    var data = this.data.barData;
    getBarOption(e.detail.canvas, e.detail.width, e.detail.height, axis, data);
  },
  //更多跟踪消息
  loadMore:function(){
    var that = this;
    var page = that.data.page+1;
    var cid = that.data.cid;
    that.setData({
      page:page
    });
    wx.showLoading({
      title: '加载中',
      icon: 'loading'
    })
    wx.request({
      url: app.globalData.hostUrl + 'manager/getCustomerMoreLogs',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        mid: app.siteInfo.pid,
        cid: cid,
        page:page
      },
      success: function (res) {
        var logslist = res.data;
        that.setData({
          logslist: logslist
        })
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var cid = options.customerid;
    that.setData({
      cid:cid,
      page:1
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

    wx.showLoading({
      title: '加载中',
      icon: 'loading'
    })
    wx.request({
      url: app.globalData.hostUrl + 'manager/getCustomerInfo',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        mid: app.siteInfo.pid,
        cid: that.data.cid,
        page: that.data.page
      },
      success: function (res) {
        that.setData({
          userinfo: res.data.userinfo,
          logslist: res.data.logs,
          pieData: res.data.aicharts,
          barAxis: res.data.barAxis,
          barData: res.data.barData,
          lineAxis: res.data.lineAxis,
          lineData: res.data.lineData,
        })
        wx.hideLoading();
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
  // onShareAppMessage: function () {

  // }
})