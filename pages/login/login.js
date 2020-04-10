// pages/login/login.js

var app = getApp();
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },
  // 获取formid
  getFormId: function (e) {
    var formid = e.detail.formId;
    console.log(formid);
    wx.request({
      url: app.globalData.hostUrl + 'index/addformid',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        openid: wx.getStorageSync('openid'),
        formid: formid
      },
      success: function (res) {
        console.log(res)
      }
    })
  },
  cancel: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onGotUserInfo: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.getUserInfo({
      lang: "zh_CN",
      success: res => {
        // 可以将 res 发送给后台解码出 unionId  
        console.log(res)
        wx.login({
          success(rs) {
            if (rs.code) {
              console.log(rs)
              console.log(wx.getStorageSync('openid'))
              console.log(res.rawData)
              //发起网络请求
              wx.request({
                url: app.globalData.hostUrl + 'index/adduser',
                method:"get",
                data:{
                  openid:wx.getStorageSync('openid'),
                  userInfo: res.rawData
                },
                success(e){
                  wx.hideLoading()
                  console.log(e)
                  var userId = e.data;
                  wx.setStorageSync('userId', userId)
                  wx.setStorageSync('uid', userId)
                  wx.setStorageSync('userInfo', res.rawData)
                  wx.setStorageSync('isLogin', true)
                  wx.navigateBack({
                    delta:1,
                  })
                  wx.showToast({
                    title: '授权成功！',
                    icon:'none'
                  })
                },
                fail(e){
                  wx.hideLoading()
                  console.log(e)
                  wx.setStorageSync('isLogin', false)

                },
              })

            } else {
              wx.hideLoading()
              console.log(rs)
              wx.setStorageSync('isLogin', false)

            }
          }
        })
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      },
      fail: function () {
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
   
    // console.log(app.siteInfo);
    // this.setData({
    //   authname: app.siteInfo.authname,
    // })
  },
  cancelauth: function () {

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