var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tips: [],
    maskShow: false,
    formShow: false,
  },
  chooseTips:function(e){
    var that = this;
    var tips = that.data.tips;
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.hostUrl + 'manager/getAllTags',
            method: "post",
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              mid: app.siteInfo.pid,
              action: 'del',
              id: id
            },
            success: function (res) {
              tips.splice(index, 1);
              that.setData({
                tips: tips,
              })
            }
          })
          
        } else if (res.cancel) {
          
        }
      }
    })
    
  },
  addTips: function () {
    this.setData({
      maskShow: true,
      formShow: true,
    })
  },
  maskHide: function () {
    this.setData({
      maskShow: false,
      formShow: false,
    })
  },
  formSubmit: function (e) {
    var that = this;
    var tips = that.data.tips;
    var text = e.detail.value.tips;
    console.log(text);
    if (text) {
      wx.request({
        url: app.globalData.hostUrl + 'manager/getAllTags',
        method: "post",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          mid: app.siteInfo.pid,
          action: 'action',
          title: text
        },
        success: function (res) {
          that.setData({
            tips: res.data,
            maskShow: false,
            formShow: false,
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请输入标签',
        showCancel: false,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      icon: 'loading'
    })
    wx.request({
      url: app.globalData.hostUrl + 'manager/getAllTags',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        mid: app.siteInfo.pid,
        action:'look'
      },
      success: function (res) {
        that.setData({
          tips: res.data
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