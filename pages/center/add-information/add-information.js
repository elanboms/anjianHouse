// pages/center/add-information/add-information.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    agree: false,
  },

  checkboxChange: function(e) { //同意协议
    console.log(e)
    var that = this;
    var agree = that.data.agree;
    if (agree == false) {
      that.setData({
        agree: true
      })
    } else {
      that.setData({
        agree: false
      })
    }
    console.log(that.data.agree)
  },

  openRegistBook: function() {
    console.log('跳转')
    wx.navigateTo({
      url: 'regist-book/regist-book',
    })
  },

  formSubmit: function(e) { //表单提交
    console.log(e)
    var that =this;
    var name = e.detail.value.name;
    var tel = e.detail.value.tel;
    var formId = e.detail.formId;
    var agree = that.data.agree;
    console.log(name)
    console.log(tel)
    console.log(formId)
    if (!agree) {
      wx.showToast({
        title: '请阅读并同意《安荐客注册》协议',
        icon: 'none'
      })
      return;
    } else if (name==''||tel==''){
      wx.showToast({
        title: '请填写姓名及联系电话！',
        icon: 'none'
      })
      return;
    }else if(tel.length!=11){
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'none'
      })
      return;
    }else {
      wx.showLoading({
        title: '提交中',
      })
      app.getFormId(formId);
      wx.request({
        url: app.globalData.hostUrl + 'mine/saveinfo',
        data: {
          openid:wx.getStorageSync('openid'),
          trueName:name,
          telphone:tel
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method:'POST',
        success: function(res) {
          console.log(res)
          wx.hideLoading();
          wx.navigateBack({
            delta: 1,
          })
          wx.showToast({
            title: '已成功完善资料！',
          })
        },
        fail: function(res) {
          console.log(res)
          wx.hideLoading();

        },
        complete: function(res) {},
      })
     
    }
  },
  submit: function(e) {
    console.log(e)



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