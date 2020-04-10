// pages/zhuanjie/zhuanjie.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:[]
  },
  zhuanjie:function(e){
    var that = this;
    var id = e.currentTarget.id;
    var cid = that.data.cid;
    var mid = app.siteInfo.pid;
    wx.showModal({
      title: '确认转接',
      content: '确认转接客户给此用户',
      success:function(res){
        if(res.confirm){

          wx.request({
            url: app.globalData.hostUrl + 'manager/outCustomer',
            method:"post",
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data:{
              mid:mid,
              cid:cid,
              id:id,
            },
            success:function(res){
              if(res.data==200){
                wx.redirectTo({
                  url: '/packageA/pages/manage2/manage2',
                })
              }
            }
          })
        
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var cid = options.cid;
    that.setData({
      cid:cid,
    })
    wx.request({
      url: app.globalData.hostUrl + 'manager/getPartener',
      method:"post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{mid:app.siteInfo.pid},
      success:function(res){
        that.setData({
          list:res.data
        })
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