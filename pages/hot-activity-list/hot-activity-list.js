// pages/hot-activity-list/hot-activity-list.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityList: [{
        id: '001',
        imgSrc: '../../images/exam.jpg',
        title: "世茂外滩·光阴故事影叙外滩时光",
        time: "2019年10月12日",
        statusImgUrl: '../../images/activity-finish@2x.png', //活动已结束
      },
      {
        id: '002',
        imgSrc: '../../images/exam.jpg',
        title: "世茂外滩·光阴故事影叙外滩时阴故事影叙外滩时光",
        time: "2019年10月22日",
        statusImgUrl: '../../images/activity-active@2x.png', //活动进行中

      },
      {
        id: '003',
        imgSrc: '../../images/exam.jpg',
        title: "世茂外滩·光阴故事影叙外滩时光",
        time: "2019年10月13日",
        statusImgUrl: '../../images/activity-finish@2x.png',

      }
    ],
  },


  //打开活动内容
  openHotActivityCon: function(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../hot-activity-detail/hot-activity-detail?id=' + id,
    })
  },


  searchTap: function (e) { //搜索内容
    var that = this;
    var text = e.detail.value;
    that.setData({
      searchText: text
    })
    console.log(text)
    that.startSearch();

  },

  startSearch: function () { //开始搜索
    var that = this;
    wx.showLoading({
      title: '搜索中',
    })
    wx.request({
      url: app.globalData.hostUrl + 'default/activityList',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        keyword: that.data.searchText
      },
      success: (res) => {
        console.log(res)
        that.setData({
          activityList: res.data.activity,
        })
        wx.hideLoading();
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getActivity(); //活动列表
  },

  getActivity: function() {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'default/activityList',
      method: 'GET',
      data: {
        openid: wx.getStorageSync('openid')
      },
      success: (res) => {
        console.log(res)
        var activity = res.data.activity;
        that.setData({
          activityList: activity,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})