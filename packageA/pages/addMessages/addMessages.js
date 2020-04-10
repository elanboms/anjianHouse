// packageA/pages/addMessages/addMessages.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['帮助类', '描述类'],
    index: 0,
  },

  bindPickerChange: function (e) {
    var index = e.detail.value
    var group = this.data.group
    this.setData({
      index: index
    })
    var choseid = group[index]['id'];
    if(!choseid){
      choseid = group[0]['id'];
    }
    this.setData({
      choseid:choseid
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'manager/huashu_add',
      method: "get",
      data: {
        
      },
      success: function (res) {
        that.setData({
          group:res.data.group
        })
      }
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var choseid = this.data.choseid
    var content = e.detail.value.content
    var group = this.data.group
    if(!choseid){
      var choseid = group[0]['id'];
    }
    
    wx.request({
      url: app.globalData.hostUrl + 'manager/huashu_add',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        action: 'add',
        pid: app.siteInfo.pid,
        groupid: choseid,
        content: content,
      },
      success: function (res) {
        wx.navigateBack({
          detail:1
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