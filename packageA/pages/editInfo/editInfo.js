// pages/editInfo/editInfo.js
var app = getApp();
Page({ 

  /**
   * 页面的初始数据
   */ 
  data: {
    headImg:'',
  },
  chooseImg:function(){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.showLoading({
          title: '图片上传中',
          icon: 'loading'
        })
        wx.uploadFile({
          url: app.globalData.hostUrl + 'qiniu/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'host': app.globalData.hostUrl
          },
          success: function (res) {
            wx.hideLoading();
            res.data = JSON.parse(res.data);
            // console.log(JSON.parse(res.data));
            // console.log(res.data.error);
            if (res.data.error==0) {
              var logo = res.data.url
              wx.request({
                url: app.globalData.hostUrl + 'manager/upload',
                method: "post",
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  pid: app.siteInfo.pid,
                  logo: logo
                },
                success: function (res2) {
                  if (res2.data.code==1) {
                    that.setData({
                      headImg: logo,
                    })
                  }
                }
              })
            } else {
              wx.showModal({
                title: '提示',
                content: res.data.message,
                showCancel: false,
              })
            }
          }
        })
      }
    })
  },
  topath:function(e){
    var that = this;
    var path = e.currentTarget.dataset.url;
    if(path == ''){
      wx.showToast({
        title: '功能尚未开通，敬请期待。',
        icon:'none',
      })
    }else{
      wx.navigateTo({
        url: path,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
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
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'manager/getManagerInfo',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        mid: app.siteInfo.mid,
        pid: app.siteInfo.pid,
        action: 'look',
      },
      success: function (res) {
        that.setData({
          logo:res.data.logo
        })
      }
    })
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