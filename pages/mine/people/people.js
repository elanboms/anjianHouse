// pages/mine/people/people.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    peopleList: []
  },

  calltap:function(e){ //拨打电话
    console.log(e)
    var phoneNum = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phoneNum,
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {},
    })
  },
  //进入名片
  gocard:function(e) {
    var id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '/packageB/pages/index/index?pid='+id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.getPeopleList();
  },

  getPeopleList: function () {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'mine/homeConsultant',
      data: {
        openid: wx.getStorageSync('openid')
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res)
        that.setData({
          peopleList: res.data,
        })
      },
      fail: function (res) {
        wx.hideLoading();
        console.log(res)
      },
      complete: function (res) { },
    })
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