// pages/house-detail/album/album.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseid: '', 
    albumList: [], //相册列表
    photoList:[]   //预览相册
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var houseid = options.houseid;
    console.log(houseid)
    this.setData({
      houseid: houseid
    })

    this.getAlbumList(); //获取相册
  },

  getAlbumList: function() { //获取相册
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    wx.request({
      url: app.globalData.hostUrl + 'default/album',
      method: 'GET',
      data: {
        id: that.data.houseid
      },
      success: (res) => {
        console.log(res)
        var imgList = [];
        for (var index in res.data.album) {
          imgList = imgList.concat(res.data.album[index].picurl);
        }
        wx.hideLoading()
        that.setData({
          album: res.data.album,
          photoList: imgList,
          albumList: res.data.album
        })

      }
    })
  },

  // 预览图片
  previewImage: function(e) {
    console.log(e)
    var that = this;
    var current = e.currentTarget.dataset.imgUrl;

    console.log(current)
    wx.previewImage({
      current: current,
      urls: that.data.photoList,
      success: function(e) {
        console.log(e)
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