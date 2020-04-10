// pages/center/my-reward/my-reward.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rewardType:"1", // 1:已结算，2：未结算
    user:{},
    list:[],
    list1:[],
    rewardList:[{
      addtime:'',
      prize:'',
      status:'',
      deal_price:'',
      deal_house:'',
      deal_client:''
    }]
  },

  selectRewardTap:function(e){
    var that = this;
    var idx = e.currentTarget.dataset.idx;
    console.log(idx)
    if(idx==1){
      that.setData({
        rewardList:that.data.list1,
        rewardType: idx
      })
    }else{
      that.setData({
        rewardList: that.data.list,
        rewardType: idx
      })
    }
    
  
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
    var that = this;
    that.setData({
      positionbg: app.siteInfo.imgpath +'/Public/Wap/images/reward-bg@2x.png'
    })

    that.getMyAward(); //获取表单信息
  },

  getMyAward: function () {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'mine/yongjin',
      data: {
        openid:wx.getStorageSync('openid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          user: res.data.user,
          list: res.data.list, //未结算
          list1: res.data.list1, //已结算
          rewardList: res.data.list1, //未结算
        })
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) { },
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
  onShareAppMessage: function () {

  }
})