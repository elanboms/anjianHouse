// packageA/pages/submit-news/submit-news.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid:'',
    add_img: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var pid = options.pid;
    that.setData({
      pid,
    })
  },


  //添加图片
  chooseIMG: function (e) {
    var that = this;
    var add_img = that.data.add_img;

    // if (add_img.length >= 2) {
    //   return;
    // }
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePaths可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        wx.showLoading({
          title: '上传中',
        })
        wx.uploadFile({
          url: app.globalData.hostUrl + 'Qiniu/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            console.log(res)
            wx.hideLoading();
            res = JSON.parse(res.data);

            add_img.push(res.url)
            that.setData({
              add_img
            })
          },
          fail: function (res) { },
          complete: function (res) { },
        })
        console.log(that.data.add_img)
      },
    })
  },

  removePhoto: function (e) { //移除图片
    let that = this;
    let idx = e.currentTarget.dataset.idx
    let list = that.data.add_img;
    list.splice(idx, 1)
    that.setData({
      add_img: list
    })
  },



  submitNewsForm:function(e){ //发布
    console.log(e)

    var that = this;
    var formid = e.detail.formId;
    var content = e.detail.value.textCon;
    var pid = that.data.pid;
    var add_img = that.data.add_img;
    console.log(typeof (add_img))
    console.log(formid);

    if (!content){
      wx.showToast({
        title: '请输入内容!',
        icon:'none'
      })
      return;
    }
    app.getFormId(formid);
    var url = app.globalData.hostUrl + 'Dynamic/add';
    var date = {
      uid: pid,
      thumbs : add_img,
      content: content
    }
    console.log(date)
    app.request(url, date, 'POST', true,
      function (res) {
        console.log(res)
        if (res.data.code == 200) {
          wx.navigateBack({
            delta: 1,
          })
          wx.showToast({
            title: '发布成功！',
            duration: 1500
          })
        }
      },
      function (res) {
        console.log(res)
        //失败的回调函数
      },
      function (res) { })
  },


  gobackTap:function(){ //取消
    wx.navigateBack({
      delta: 1,
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