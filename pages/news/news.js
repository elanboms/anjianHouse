// pages/news/news.js
var app = getApp();
var page = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEmty: true,
    nowId: '',
    hiddenId: true,
    list: [

    ],

  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.data.isEmty = true;
    // page = 1;
    // this.data.list = [];
    
  },


  getCommentList() { //获取列表数据
    let that = this;
    wx.request({
      url: app.globalData.hostUrl + 'Dynamic/index',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        user_id: wx.getStorageSync('userId'),
        // page: page,
      },
      success: function(res) {

        wx.hideLoading()
        console.log(res)
        var isEmty = that.data.isEmty;
        var { list } = res.data;
        (list||[]).map((v, k) => {
          v.isHidden = true
        })
        that.setData({
          list: list
        })

      }
    })
  },

  lookNewsTap: function(e) { //点击新闻
    let newsid = e.currentTarget.dataset.newsid;
    let id = e.currentTarget.dataset.id;
    console.log(newsid)
    console.log(id)
    wx.navigateTo({
      url: 'news-detail/news-detail?newsid=' + newsid +'&id=' + id,
    })
  },

  talkBtnTap: function(e) { //控制点赞按钮显示隐藏
    let id = e.currentTarget.id;
    let that = this;
    let list = that.data.list;
    app.confirmLogin(function() {
      list.map((v, k) => {
        if (v.id == id) {
          v.isHidden = !v.isHidden
        } else {
          v.isHidden = true
        }
      })
      that.setData({
        nowId: id,
        list,
      })
    })

  },

  zanTap: function(e) { //点赞
    let that = this
    let id = e.currentTarget.dataset.id;
    wx.request({
      url: app.globalData.hostUrl + 'Dynamic/addZan',
      data: {
        user_id: wx.getStorageSync("userId"),
        dynamic_id: id
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res)
        let name = res.data.username;
        console.log(name)
        var obj = { username: name }
        var list =that.data.list;
        list.map((v, k) => {
          if (v.id == id) {
           
            if (v.isZan == true) {
              let idx;
              v.zanList.map((v1,k1)=>{
                if( v1.username == name ){
                  return idx = k1;
                }
              })
              console.log(idx)
              v.zanList.splice(idx, 1);
              v.zan--;
            } else {
              v.zanList.push(obj)
              v.zan++;
            }

            v.isZan = !v.isZan
            v.isHidden = !v.isHidden
           
            
          }
        })
        that.setData({
          list: that.data.list
        })
      },
      fail: function(res) {
        console.log(res)

      },
      complete: function(res) {},
    })
  },

  talkTap: function (e) { //发布评论
    let that = this
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'news-submit/news-submit?id=' +id ,
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
    this.getCommentList();
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
    wx.showLoading({
      title: '加载中',
    })
    this.data.list=[];
    this.getCommentList();
    wx.stopPullDownRefresh();
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