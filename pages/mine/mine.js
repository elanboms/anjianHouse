// pages/mine/mine.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    phoneNum: ''
  },


  // 跳转事件
  click: function(e) {
    var that=this;
    let idx = e.currentTarget.dataset.idx;
    let navUrl; //跳转链接

    app.confirmLogin(
      function() {
        console.log('idx==' + idx)
        switch (idx) {
          case "1":
            navUrl = 'my-reserve/my-reserve';
            break;
          case "2":
            navUrl = 'my-share/my-share';
            break;
          case "3":
            navUrl = 'my-collect/my-collect';
            break;
          case "4":
            navUrl = 'my-sign/my-sign';
            break;
          case "5":
            navUrl = 'people/people';
            break;
          case "6":
            navUrl = '/packageA/pages/manage1/manage1?cardid=' + that.data.user.cardid;
            break;
          case "7":
            navUrl = 'my-order/my-order';
            break;
        }
        wx.navigateTo({
          url: navUrl,
        })
      }
    )
  },

  callTap: function() { //拨打电话
    let that = this;
    var phone = that.data.phoneNum;
    wx.makePhoneCall({
      phoneNumber: phone,
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {},
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
    var that = this;
    that.setData({
      positionimg: app.siteInfo.imgpath + '/Public/Wap/images/mine-bg.png',
      adverimg: app.siteInfo.imgpath + '/Public/Wap/images/add.png'
    })
    wx.showLoading({
      title: '加载中',
      icon: "loading"
    })
    that.getUserinfo();
  },

  getUserinfo: function() {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'mine/personal',
      data: {
        openid: wx.getStorageSync('openid')
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        wx.hideLoading();
        console.log(res.data)
        wx.setStorageSync('user', res.data)
        that.setData({
          user: res.data,
          phoneNum: res.data.kefuMobile
        })
        wx.hideLoading();
      },
      fail: function(res) {
        wx.hideLoading();
        console.log(res)
      },
      complete: function(res) {},
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