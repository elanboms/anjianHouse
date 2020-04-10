// pages/tips/tips.js
var app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tips: [],
    resultShow:false,
    customers: [],
  },
  chooseTips:function(e){
    var that = this;
    var id = e.currentTarget.id;
    var chooseText = e.currentTarget.dataset.text;
    that.setData({
      chooseText: chooseText,
      resultShow:true,
    })
    wx.request({
      url: app.globalData.hostUrl + 'manager/tags_user',
      method:"post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        mid:app.siteInfo.pid,
        id:id
      },
      success:function(res){
        console.log(res.data);
          that.setData({
            customers: res.data
          })
        console.log(that.data.customers)
      }
    })
  },
  resultHide:function(){
    var that = this;
    that.setData({
      resultShow: false,
    })
  },

  // 跳转到客户详情 
  tocustomersDetail: function (e) {
    console.log(e)
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '/packageA/pages/customersDetail/customersDetail?customerid=' + e.currentTarget.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      icon:'loading'
    })
    wx.request({
      url: app.globalData.hostUrl + 'manager/group_tags',
      method:"post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        mid:app.siteInfo.pid
      },
      success:function(res){
        console.log(res)
        that.setData({
          tips:res.data
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