// pages/customers/customers.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customers: [],
  },
  // 跳转到客户详情
  tocustomersDetail: function (e) {
    console.log(e)
    var cid = e.currentTarget.id
    wx.navigateTo({
      url: '/packageA/pages/customersDetail/customersDetail?customerid=' + cid,
    })
  },
  // 跳转对话
  tochats: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/packageA/pages/chatManage/chatManage',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      icon: 'loading'
    })
    wx.request({
      url: app.globalData.hostUrl + 'manager/newCustomers',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        mid: app.siteInfo.pid
      },
      success: function (res) {
        // console.log(res)
        that.setData({
          customers: res.data
        })
        wx.hideLoading()
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