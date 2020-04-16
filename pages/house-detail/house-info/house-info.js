// pages/house-detail/house-info/house-info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTap:0,
    typeList:[
      { name: '高层' },
      { name: '洋房' },
      { name: '低密度产品' },
      { name: '公寓|商铺|写字楼'},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 类型选择
  selectAreaType: function (e) {
    console.log(e)
    var that = this;
    var currentTap = e.currentTarget.dataset.index;
    if (currentTap == that.data.currentTap) {
      return;
    }
    that.setData({
      currentTap: currentTap
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
  onShareAppMessage: function () {

  }
})