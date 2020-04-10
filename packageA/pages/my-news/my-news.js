// packageA/pages/my-news/my-news.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid: '', //名片id
    list: [
      // {
      //   id:'139',
      //   logo:'/images/exam.jpg',
      //   username:'哈哈',
      //   contenttype:'1',
      //   content:'打我达瓦大哇多',
      //   addtime:'2019-10-25',
      //   zanList:[
      //     { username: 'dawdaw' },
      //     { username: 'dawdaw' },
      //     {username:'dawdaw'},
      //   ],
      //   commentList:[
      //     { username: 'dawdaw', content:'fsefesfesfesfsf' },
      //     { username: '达瓦达瓦', content: '达瓦达瓦大无大无多' },
      //     { username: '歌剧院管' , content: '11达瓦达瓦大无大无多'},
      //   ]
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
  },

  getMyNews: function() { //获取我的动态数据
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'Dynamic/getMyDynamic',
      data: {
        uid: that.data.pid
      },
      method: 'GET',
      success: function(res) {
        console.log(res)
        that.setData({
          list: res.data.list
        })
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {},
    })
  },

  goSubmitNews: function() { //跳转发表页
    var that = this;
    wx.navigateTo({
      url: '../submit-news/submit-news?pid=' + that.data.pid,
    })
  },

  deleteNewsTap: function(e) {
    var that = this;
    var pid = that.data.pid;
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '温馨提示',
      content: '确认删除此动态吗？',
      showCancel: true,
      cancelText: '取消',
      confirmText: '删除',
      confirmColor: '#ff6b26',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: app.globalData.hostUrl + 'Dynamic/del',
            data: {
              uid: pid,
              id: id
            },
            method: 'GET',
            success: function(res) {
              console.log(res)
              wx.showToast({
                title: '删除成功！',
                duration: 1500
              })
              that.getMyNews();
            },
            fail: function(res) {
              console.log(res)
            },
            complete: function(res) {},
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }

      },
      fail: function(res) {},
      complete: function(res) {},
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
    this.setData({
      pid: app.siteInfo.pid
    })
    this.getMyNews(); //获取我的动态数据
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

})