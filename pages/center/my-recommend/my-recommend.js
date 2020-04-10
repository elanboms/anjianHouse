// pages/center/my-recommend/my-recommend.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseId:'',
    houseList: []
  },

  bindHouseChange: function(e) { //选择楼盘
    var that = this;
    var index = e.detail.value;
    var houseList = that.data.houseList;
    var houseId = houseList[index].id
    console.log(houseId)
    this.setData({
      houseId: houseId,
      index: index
    })
  },

  submit: function(e) { //点击按钮
    console.log(e)
  },

  formSubmit: function(e) { //提交表单
    console.log(e)
    var that = this;
    var formId = e.detail.formId;
    console.log(formId)
    var name = e.detail.value.name;
    var phone = e.detail.value.phone;
    var house = e.detail.value.house;
    var mark = e.detail.value.mark;
    var houseId = that.data.houseId;
    console.log(houseId)
    if (houseId==''||name==''||phone==''||mark==''||houseId==''){
      wx.showToast({
        title: '请把相关信息补充完整',
        icon: 'none',
      })
      return;
    }
    wx.request({
      url: app.globalData.hostUrl + 'mine/savepurpose',
      data: {
        openid:wx.getStorageSync('openid'),
        name: name,
        mobile:phone,
        build_id: houseId,
        bz:mark
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        if(res.data.errcode==200){
          wx.navigateBack({
            data: 1,
          })
          wx.showToast({
            title: res.data.errmsg,
          })
         
        }else{
          wx.showToast({
            title: res.data.errmsg,
          })
        }
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) { },
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getProductList();
  },

  getProductList: function () {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'mine/building',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          houseList: res.data
        })
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) { },
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
  onShareAppMessage: function() {

  }
})