// pages/center/my-customer/my-customer-detail/my-customer-detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    customer: {},
    buyStatus:'',
    wxStatus:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id;
    console.log('id===' + id)
    this.setData({
      id: id
    })
    this.getCustomDetail();
  },

  getCustomDetail: function() {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'mine/registerClient_detail',
      data: {
        id: that.data.id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: function(res) {
        console.log(res)
        var buyStatus;
        var wxStatus;
        if (res.data.canbuy == '0') {
          buyStatus = '没有'
        } else {
          buyStatus = '有'
        }
        if (res.data.addwx=='0'){
          wxStatus ='未添加'
        }else{
          wxStatus ='已添加'
        }
        that.setData({
          customer: res.data,
          buyStatus: buyStatus,
          wxStatus: wxStatus,
        })
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {},
    })
  },


  callTap: function(e) { //拨打电话
    var phoneNumber = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phoneNumber,
      success: function() {
        console.log("拨打电话成功！")
      },
      fail: function() {
        console.log("拨打电话失败！")
      }
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