// pages/calculator/calc-result/calc-result.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'calculator/calresult',
      data: {
        daikuantype: wx.getStorageSync('daikuantype'),
        shopmoney: wx.getStorageSync('shopmoney'),
        shoprate: wx.getStorageSync('shoprate'),
        fundmoney: wx.getStorageSync('fundmoney'),
        fundrate: wx.getStorageSync('fundrate'),
        shopyear: wx.getStorageSync('shopyear'),
        huankuantype: wx.getStorageSync('huankuantype'),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        console.log(res.data)
        that.setData({
          emTotal: res.data.emTotal,
          loanAll: res.data.loanAll,
          lxTotal: res.data.lxTotal,
          monthAll: res.data.monthAll,
          repayAll: res.data.repayAll,
          list: res.data.list

        })

      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {
        console.log(res)
      },
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