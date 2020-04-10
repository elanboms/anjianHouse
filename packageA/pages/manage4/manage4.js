// pages/manage4/manage4.js  
var app = getApp();
Page({

  /**
   * 页面的初始数据 
   */
  data: {


    // 底部tabbar
    hasUnRead: true,
    tabbarIndex: 3,
    tabbar: [
      {
        img: '/img/manage1.png',
        imgSelect: '/img/manage1-select.png',
        text: '工作台',
        url: '/packageA/pages/manage1/manage1',
      },
      {
        img: '/img/manage2.png',
        imgSelect: '/img/manage2-select.png',
        text: '客户',
        url: '/packageA/pages/manage2/manage2',
      },
      {
        img: '/img/manage3.png',
        imgSelect: '/img/manage3-select.png',
        text: '消息',
        url: '/packageA/pages/manage3/manage3',
      },
      {
        img: '/img/manage4.png',
        imgSelect: '/img/manage4-select.png',
        text: '我',
        url: '/packageA/pages/manage4/manage4',
      },
    ],
  },
  topath:function(e){
    var that = this;
    var url = e.currentTarget.dataset.url;
    if (url == ''){
      wx.showToast({
        title: '功能暂未开放，敬请期待',
        icon:'none',
      })
    }else{
      var go = true;
      var isboss = parseInt(that.data.info.isboss);
      if (isboss !== 1 && url == "/packageA/pages/radar/radar"){
        go = false;
        wx.showToast({
          title: '请先联系上级，开通Boss权限',
          icon: 'none',
        })
      }
      if(go){
        wx.navigateTo({
          url: url,
        })
      }
     
    }
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
    var that = this;
    wx.showLoading({
      title: '加载中',
      icon:"loading"
    })
    wx.request({
      url: app.globalData.hostUrl + 'manager/getManagerInfo',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        mid: app.siteInfo.mid,
        pid: app.siteInfo.pid,
        action: 'look',
      },
      success: function (res) {
        that.setData({
          info: res.data
        })
        app.siteInfo.user = that.data.info;
        wx.hideLoading();
      }
    })
  },

  toposter: function () {
    wx.navigateTo({
      url: '/packageA/pages/poster/poster',
    })
  },

  tomessage: function () {
    wx.navigateTo({
      url: '/packageA/pages/message/message',
    })
  },

  toCaseManage: function () {
    wx.navigateTo({
      url: '/packageA/pages/caseManage/caseManage',
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