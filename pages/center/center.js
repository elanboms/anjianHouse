// pages/center/center.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    level: '', // 0用户 1是经济人 2置业顾问 
    user:{},
    centerList: [{
      imgUrl: '../../images/my-recommend@2x.png',
      title: '我要推荐'
    } , {
      imgUrl: '../../images/recom.png',
      title: '推荐列表'
    }, {
      imgUrl: '../../images/my-customer@2x.png',
      title: '我的客户'
    }, {
      imgUrl: '../../images/my-reward@2x.png',
      title: '我的奖励'
    }, {
      imgUrl: '../../images/my-rule@2x.png',
      title: '规则说明'
    }]
  },


  click: function(e) { //点击跳转
    var that = this;
    console.log(e)
    var idx = e.currentTarget.dataset.idx;
    var level=that.data.level;
    console.log('level==' + level)
    var url;
    app.confirmLogin(
      function () {
        console.log('idx==' + idx)
        switch (idx) {
          case 0:
            if (level>0){
              url = 'my-recommend/my-recommend'; //我的推荐
            }else{
              wx.showModal({
                title: '温馨提示',
                content: '完善资料后才可以推荐',
                confirmText:'去完善',
                cancelText:'再想想',
                success(res) {
                  if (res.confirm) {
                    url = 'add-information/add-information'; //完善资料
                    wx.navigateTo({
                      url: url,
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                    url=''
                    return;
                  }
                }
              })
              
            }
            break;
          case 1:
            url = 'recommend-list/recommend-list'; //推荐列表
            break;
          case 2:
            url = 'my-customer/my-customer'; //我的客户
            break;
          case 3:
            url = 'my-reward/my-reward'; //我的奖励
            break;
          case 4:
            url = 'my-rule/my-rule'; //规则说明
            break;
          case '5':
            url = 'add-information/add-information'; //完善资料
            break;
          case '6':
            if (level == 2) {
            url = 'customer-regist/customer-regist'; //客户登记
            }else{
              wx.showToast({
                title: '仅限置业顾问可登记客户',
                icon:'none'
              })
              url='';
            }
            break;
        }
        wx.navigateTo({
          url: url,
        })
      },
      
    )
   
  },


  showTips:function(){ //完善资料成功！
    wx.showModal({
      title: '温馨提示',
      content: '您已经成功完善资料！',
      showCancel: false,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
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
    var that = this;
    var isLogin = wx.getStorageSync('isLogin')
    that.setData({
      positionbg: app.siteInfo.imgpath + '/Public/Wap/images/center-bg.png'
    })

    that.getUserinfo(); //获取用户信息
  },

  checkOpenid:function(){
    var that = this;
    var openid = wx.getStorageSync('openid');
    if (!openid) {
      setTimeout(function (e) {
        that.getUserinfo()
      }, 200)
    } else {
      that.getUserinfo();
    }
  },

  getUserinfo:function(){
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'mine/personal',
      data: {
        openid:wx.getStorageSync('openid')
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res.data)
        wx.setStorageSync('user', res.data)
        that.setData({
          user: res.data,
          level:res.data.level
        })
      },
      fail: function (res) {
        wx.hideLoading();
        console.log(res)
      },
      complete: function (res) { },
    })
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