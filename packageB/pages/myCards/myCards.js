// pages/myCards/myCards.js   
var app = getApp();
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    cards: [],
  },
  toindex:function(){
    wx.request({
      url: app.globalData.hostUrl + 'mycard/hascard',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        uid: wx.getStorageSync("uid"),
      },
      success: function (res) {
        console.log(res);
        if(res.data.code==200){
          wx.redirectTo({
            url: '/packageB/pages/index/index?share_card_id='+res.data.cardid,
          })
        }else{
          wx.redirectTo({
            url: '/packageB/pages/index/index',
          })
        }
      }
    })
    
  },
  tocard: function (e) {
    console.log(123)
    var id = e.currentTarget.dataset.id;
    console.log(id)
    if(id){
      app.siteInfo.pid = id;
      wx.redirectTo({
        url: '/packageB/pages/index/index',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var isLogin = wx.getStorageSync('isLogin') || false;
    //登录判断
    if (isLogin == false) {
      app.onGotUserInfo();
    }

    if(options.ig){
      var ig = options.ig;
      that.setData({
        show_ig : 1
      })
    }else{
      var ig = '';
      that.setData({
        show_ig: 2
      })
    }
    wx.showLoading({
      title: '加载中',
      icon: 'loading'
    })
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'mycard/card_page',
      method:"post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        uid: wx.getStorageSync('uid'),
        pid: app.siteInfo.pid,
      },
      success:function(res){
        wx.hideLoading()
        that.setData({
          cards: res.data
        })
      }
    })
  },


  makePhoneCall(e){
    var phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone,
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
  onShareAppMessage: function () {
    wx.request({
      url: app.globalData.hostUrl + 'mycard/relay',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        uid: app.siteInfo.uid,
        pid: app.siteInfo.pid,
        replaysource: "index"
      },
      success: function (res) { }
    })

    return {
      title: app.siteInfo.authname,
      path: "/pages/index/index?share_card_id=" + app.siteInfo.pid + "&shareid=" + app.siteInfo.uid,
      success: function (a) {
        
      },
      fail: function (a) { }
    };
  }
})