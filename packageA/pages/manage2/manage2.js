// pages/manage2/manage2.js 
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nohave:0,
    customers:[],
    page: 1,
    kw:"",  //关键词

    // 底部tabbar
    hasUnRead: true,
    tabbarIndex: 1,
    tabbar: [
      {
        img: '/img/manage1.png',
        imgSelect: '/img/manage1-select.png',
        text: '工作台',
        url: '/packageA/pages/manage1/manage1',
      },
      {
        img: '/img/manage2.png',
        imgSelect: '/img/manage2-select.png',
        text: '客户',
        url: '/packageA/pages/manage2/manage2',
      },
      {
        img: '/img/manage3.png',
        imgSelect: '/img/manage3-select.png',
        text: '消息',
        url: '/packageA/pages/manage3/manage3',
      },
      {
        img: '/img/manage4.png',
        imgSelect: '/img/manage4-select.png',
        text: '我',
        url: '/packageA/pages/manage4/manage4',
      },
    ],
  },
  // 跳转到客户详情
  tocustomersDetail:function(e){
    // console.log(e.currentTarget.id)
    var cid = e.currentTarget.id
    wx.navigateTo({
      url: '/packageA/pages/customersDetail/customersDetail?customerid='+cid,
    })
  }, 
  // 跳转对话
  tochats:function(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/packageA/pages/chatManage/chatManage?cid='+id,
    })
  }, 
  formSubmit: function (e) {
    var that = this;
    var a = e.detail.value.keywords;
    wx.request({
      url: app.globalData.hostUrl + 'manager/manager_index2',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        mid: app.siteInfo.pid,
        page:1,
        kw:a,
      },
      success: function (res) {
        // console.log(res)
        if (res.data.length > 0) {
          that.setData({
            customers: res.data,
            nohave: 1,
            kw : a
          })
        }else{
          that.setData({
            customers: res.data,
            nohave: 0
          })
        }
      }
    })
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
    var page = that.data.page
    wx.request({
      url: app.globalData.hostUrl + 'manager/manager_index2',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        mid: app.siteInfo.pid,
        page : page,
        kw: that.data.kw
      },
      success: function (res) {
        // console.log(res)
        if (res.data.length > 0) {
          page = page+1;
          that.setData({
            customers: res.data,
            nohave: 1,
            page:page
          })
        }
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
    console.log('上滑加载')
    var that = this;
    var page = that.data.page
    var customers = that.data.customers
    wx.request({
      url: app.globalData.hostUrl + 'manager/manager_index2',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        mid: app.siteInfo.pid,
        page:that.data.page,
        kw:that.data.kw
      },
      success: function (res) {
        // console.log(res)
        if (res.data.length > 0) {
          page = page + 1;
          customers = customers.concat(res.data)
          that.setData({
            customers: customers,
            nohave: 1,
            page: page
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})