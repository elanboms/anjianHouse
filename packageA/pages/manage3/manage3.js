// pages/manage3/manage3.js
var app = getApp();
Page({ 

  /**
   * 页面的初始数据
   */
  data: {
    // 底部tabbar
    hasUnRead:true,
    tabbarIndex: 2,
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
  // 跳转对话 
  tochats: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/packageA/pages/chatManage/chatManage?cid='+id,
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
    var that = this;
    wx.showLoading({
      title: "加载中",
      icon: "loading"
    })
    wx.request({
      url: app.globalData.hostUrl + 'chat/chatList',
      method: "get",
      data: {
        pid: app.siteInfo.pid,
      },
      success: function (res) {
        that.setData({
          list: res.data.list
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