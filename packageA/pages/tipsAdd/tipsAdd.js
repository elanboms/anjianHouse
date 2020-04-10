// pages/tipsAdd/tipsAdd.js 
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tips: [],
    maskShow:false,
    formShow:false,
  },
  chooseTips:function(e){
    var that = this;
    var tipsid = e.currentTarget.id;
    var index = e.currentTarget.dataset.index;
    var tips = that.data.tips;
    var action = 'add';
    if(tips[index].checked == true){
      tips[index].checked = false;
      action = 'del';
    }else{
      tips[index].checked = true;
      action = 'add';
    }
    that.setData({
      tips:tips,
    })
    wx.request({
      url: app.globalData.hostUrl + 'manager/user_group_tags_do',
      method:"post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        mid:app.siteInfo.pid,
        cid:that.data.cid,
        id: tipsid,
        action:action
      },
      sunction:function(){}
    })
  },
  addTips:function(){
    this.setData({
      maskShow: true,
      formShow: true,
    })
  },
  maskHide:function(){
    this.setData({
      maskShow: false,
      formShow: false,
    })
  },
  formSubmit:function(e){
    var that = this;
    var tips = that.data.tips;
    var cid = that.data.cid;
    var a = e.detail.value.tags;
    wx.request({
      url: app.globalData.hostUrl + 'manager/add_group_tags',
      method:"post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        mid:app.siteInfo.pid,
        title:a,
        cid:cid
      },
      success:function(res){
        if (res.data.code==500) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',//  loading/success/none        
            duration: 1000
          })
        }
      }
    })
    wx.navigateBack({
      delta:1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.showLoading({
      title: '加载中',
      icon:"loading"
    })
    var that = this;
    var cid = options.cid;
    that.setData({
      cid:cid
    })
    wx.request({
      url: app.globalData.hostUrl + 'manager/group_tags',
      method:"post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        mid:app.siteInfo.pid,
        cid:cid,
      },
      success:function(res){
        that.setData({
          tips:res.data
        })
        wx.hideLoading();
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