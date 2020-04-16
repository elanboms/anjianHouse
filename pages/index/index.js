//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    isadvertise:'',
    imgList: [],
    news: [],
    activityList: [],
    houseList: [], //楼盘
    top_deposit:{},
    top_vr:{},
  },

  onLoad: function() {
    wx.login({
      success: (res) => {
        var code = res.code;
        wx.request({
          url: app.globalData.hostUrl + 'index/appid',
          data: { code },
          success: (res) => {
            console.log(res)
            // 存session_key
            wx.setStorageSync('session_key', res.data.session_key);
            // 存openid
            wx.setStorageSync('openid', res.data.openid);
            // 存user_id
            wx.setStorageSync('userId', res.data.userId || '0');
            wx.setStorageSync('uid', res.data.userId || '0');
          }
        })
      }
    })
    
    this.getIndex(); //获取首页数据

  },

  getIndex: function() {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'default/index',
      method: 'GET',
      data: {
        openid: wx.getStorageSync('openid')
      },
      success: (res) => {
        console.log(res)
        var bannerList = res.data.banner;
        var news = res.data.news;
        var buildList = res.data.build;
        var activity = res.data.activity;
        var isadvertise = res.data.isadvertise;
        var top_deposit = res.data.top_deposit
        var top_vr = res.data.top_vr
        that.setData({
          imgList: bannerList,
          news: news,
          activityList: activity,
          houseList: buildList,
          isadvertise,
          picture: res.data.picture,
          top_deposit,
          top_vr,
          advertise: res.data.advertise
        })

      }
  
    })
  },

  openAddv(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/house-form/house-form?id=' + id,
    })
  },

  openRule(e){
    wx.navigateTo({
      url: '/pages/index-rule/index-rule',
    })
  },

  openBanner(e){
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url,
    })
  },

  searchTap:function(e){
    var searchText = e.detail.value;
    wx.navigateTo({
      url: '../house-list/house-list?searchText=' + searchText + '&searchCode=1',
    })
  },


  click: function(e) { //跳转
    let that =this
    let idx = e.currentTarget.dataset.idx;
    console.log(idx)
    let url;
    switch (idx) {
      case '1':
        url = '../calculator/calculator';
        break;
      case '2':
        app.confirmLogin(function(){ //名片夹
          url = '/packageB/pages/myCards/myCards';
          wx.navigateTo({
            url: url
          })
        })
        return;
      case '3':
        wx.switchTab({
          url: '/pages/center/center',
        })
        return;
      case '4':
        url = '/pages/VR/VR?id=' + that.data.top_vr.id;
        break;
    }
    wx.navigateTo({
      url: url
    })
  },

  openNewsDetail:function(e){ //打开消息详情
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../news-detail/news-detail?id=' + id,
    })
  },

  //打开活动列表
  openHotActivityList: function() {
    console.log("跳转活动列表")
    wx.navigateTo({
      url: '../hot-activity-list/hot-activity-list',
    })
  },

  //打开活动内容
  openHotActivityCon: function(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../hot-activity-detail/hot-activity-detail?id=' + id,
    })
  },

  //打开楼盘列表
  openHouseList: function(e) {
    console.log(e);
    wx.navigateTo({
      url: '../house-list/house-list',
    })
  },

  // 打开楼盘详情
  openHouseDetail: (e) => {
    console.log(e);
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../house-detail/house-detail?id=' + id,
    })
  },

  closeAdd: function() { //隐藏广告
    this.setData({
      isadvertise: '0'
    })
  },



  // getFormid:function(){
  //   app.getFormid();
  // },
  // skipPage:function(e){
  //   var that = this;
  //   var url = e.currentTarget.dateset.url;
  //   app._get('index/index',{date},'GET/POST',true/false,function(){
  //     wx.navigateTo({
  //       url: url,
  //     })
  //   },function(){},function(){

  //   })

  //   app.comfirmLogin(function(){
  //     wx.navigateTo({
  //       url: '',
  //     })
  //   })
  // },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //防止蒙板触摸穿透
  preventTouchMove: function() {},

})