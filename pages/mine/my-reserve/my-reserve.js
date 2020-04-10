// pages/mine/my-reserve/my-reserve.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reserveList:[
      {
        imgUrl:'../../../images/exam.jpg',
        name:'安建·翰林天筑',
        price:'16888',
        address:'滨湖新区花园大道与包河大道交口',
        time:'2019-08-19',
        status:'已预约成功',
      },
      {
        imgUrl: '../../../images/exam.jpg',
        name: '安建·翰林天筑',
        price: '17999',
        address: '滨湖新区花园大道与包河大道交口',
        time: '2019-08-29',
        status: '已预约成功',
      }
    ]
  },

  openHouseDetail:function(e){
    console.log(e)
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '/pages/house-detail/house-detail?id=' + id,
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
    this.getMyReserveList(); //预约列表
  },
  
  getMyReserveList: function () {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'mine/myReserve',
      data: {
        openid: wx.getStorageSync('openid')
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res.data)
        wx.setStorageSync('user', res.data)
        that.setData({
          reserveList: res.data, 
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

  }
})