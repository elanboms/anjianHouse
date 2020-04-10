// pages/news/news-submit/news-submit.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let id = options.id;
      this.setData({
        id,
      })
  },


  submitFormTap:function(e){
    var that = this;
    var formid = e.detail.formId;
    var content = e.detail.value.textcon;
    var id = that.data.id;
    console.log(formid);
    app.getFormId(formid);
    var url = app.globalData.hostUrl + 'Dynamic/addComment';
    var date = {
      user_id:wx.getStorageSync('userId'),
      dynamic_id:id,
      content: content
    }
    console.log(date)
    app.request(url, date, 'POST', true,
      function (res) {
        console.log(res)
        if(res.data.code==200){
          wx.navigateBack({
            delta:1,
          })
          wx.showToast({
            title: '评论成功！',
            duration:1500
          })
        }
      },
      function (res) {
        console.log(res)
        //失败的回调函数
      },
      function (res) { })
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

 
})