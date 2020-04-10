// pages/caseList/caseList.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    caselist:[]
  },

  /**
   * 跳转至案例详情
   */
  toDetail: function (e) {
    wx.navigateTo({
      url: `/pages/house-detail/house-detail?id=${e.currentTarget.id}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    var that = this
    //获取案例列表
    wx.request({
      url: app.globalData.hostUrl + 'mycard/getCase',
      data: {
        pid: app.siteInfo.pid,
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          caselist: res.data
        })
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
    let _this = this;
    return {
      path: '/pages/caseList/caseList?shareid=' + app.siteInfo.uid + '&share_card_id=' + app.siteInfo.pid
    };
  }
})