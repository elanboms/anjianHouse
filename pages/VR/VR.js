// pages/VR/VR.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    vrlink:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id||''
    let that = this
    console.log(id)
    this.setData({
      id
    },(e)=>{
        that.getVrLink()
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

  getVrLink(){
    let that = this
    let url = app.globalData.hostUrl + 'index/link_vr';
    let params = {
      lp_id:that.data.id||''
    }
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    app.request(url, params, 'get', true,
      function (res) {
        console.log(res)
        wx.hideLoading()
        if(res.data.code==400){
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            confirmText: '返回',
            success: function(res) {
              if(res.confirm){
                wx.navigateBack({
                  delta: 1,
                })
              }
            },
            fail: function(res) {},
            complete: function(res) {},
          })
        }else{
          that.setData({
            vrlink: res.data.link_vr
          })
        }
      },
      function (res) {
        console.log(res)
        //失败的回调函数
      },
      function (res) {
        wx.hideLoading()
       }
    )
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