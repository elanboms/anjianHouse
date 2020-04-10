// pages/center/recommend-list/recommend-list.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customerList: [
    ]
  },


  callTap: function(e) { //拨打电话
    var phoneNumber = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phoneNumber,
      success: function() {
        console.log("拨打电话成功！")
      },
      fail: function() {
        console.log("拨打电话失败！")
      }
    })
  },

  // openCustomerDetail: function(e) { //进入详情
  //   var id = e.currentTarget.dataset.id;
  //   console.log('id==' + id)
  //   wx.navigateTo({
  //     url: 'my-customer-detail/my-customer-detail?id=' + id,
  //   })
  // },





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
    this.getCustomList();
  },

  getCustomList: function () {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'mine/myClient',
      data: {
        openid:wx.getStorageSync('openid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          customerList: res.data
        })
      },
      fail: function (res) {
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