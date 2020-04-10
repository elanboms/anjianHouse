// packageA/pages/message/message.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:[
      { tit: '帮助类', info: [{ id: 0, text: '您好，感兴趣的话我们可以加一个微信聊一聊' }, { id: 1, text: 'hello' }]},
      { tit: '描述类', info: [{ id: 0, text: '您好！' }, { id: 1, text: '啦啦啦' }] }
    ],
    current:0
  },

  messageHandle (e) {
    let that = this
    that.setData({
      current: e.currentTarget.id
    })
  },
  delMessages(e) {
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定删除此话术吗？',
      success(res) {
        if (res.confirm) {
          let { list } = that.data
          console.log(e)
          var hid = e.target.id
          let id = e.currentTarget.dataset.id
          let iditem = e.currentTarget.dataset.iditem
          wx.request({
            url: app.globalData.hostUrl + 'manager/huashu',
            method: "post",
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              id:hid,
              action:'del',
              pid: app.siteInfo.pid,
              uid: app.siteInfo.uid,
            },
            success: function (res) {
              list[id]['child'].splice(iditem, 1)
              that.setData({
                list
              })
            }
          })
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  addMessages() {
    wx.navigateTo({
      url: '/packageA/pages/addMessages/addMessages',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let that = this
    wx.request({
      url: app.globalData.hostUrl + 'manager/huashu',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        pid: app.siteInfo.pid,
        uid: app.siteInfo.uid,
        action: 'look'
      },
      success: function (res) {
        that.setData({
          list:res.data.list
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