//app.js
var network = require("utils/net.js")
// 站点配置文件
import siteinfo from './siteinfo.js'; 

App({

  // 小程序全局参数
  globalData: {
    hostUrl: "https://anjian.vshop365.cn/home/", //全局API
    navHeight:'',
    net_error: "网络不可用，请重试！",
  },
  
  onLaunch: function (options) {
    var that = this
    var shareid = options.query.shareid || '0';  //分享者名片者id
    var share_card_id = options.query.share_card_id || '0';  //名片id

    if (shareid != null && shareid != undefined && shareid != '' && shareid) {
      wx.setStorageSync('shareid', shareid)
      that.siteInfo.shareid = shareid
    }
    if (share_card_id != null && share_card_id != undefined && share_card_id != '' && share_card_id) {
      wx.setStorageSync('share_card_id', share_card_id);
      that.siteInfo.share_card_id = share_card_id
    }

   

    wx.login({
      success: (res) => {
        var code = res.code;
        wx.request({
          url: that.globalData.hostUrl + 'index/appid',
          data: { code, share_card_id, shareid },
          success: (res) => {

            console.log('页面launch')
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

    wx.getSystemInfo({
      success: function (res) {
        that.globalData.navHeight = res.statusBarHeight
      }
    })


  },

  // 点击事件无请求，但需要验证登录态时触发
  confirmLogin: function(_else) {
    var that = this;
    var isLogin = wx.getStorageSync('isLogin') || false;
    if (isLogin == false) {
      wx.showModal({
        content: '请先登录后操作！',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
    } else {
      _else()
    }
  },


  //** url  请求路径
  //** Data	请求参数
  //** Checklogin	是否需要登录：true需要登录,false不需要登录
  //** Success  成功后回调函数
  //** Fail     失败后回调函数
  //** Complete 完成后回调函数

  request(url, data, method, check_login, success, fail, complete) {
    let that = this;
    //验证是否要登录
    console.log(check_login)
    if (check_login) {
      var isLogin = wx.getStorageSync('isLogin');
      if (!isLogin) {
        console.log(1111111)
        wx.hideLoading();
        wx.showModal({
          title: '温馨提示',
          content: '请授权后进行操作！',
          showCancel: true,
          success: function(res) {
            if (res.confirm){
            wx.navigateTo({
              url: '/pages/login/login'
            })
            }
          },
          fail: function(res) {},
          complete: function(res) {},
        })
       
      } else {
        that._request(url, data, method, success, fail, complete);
      }
    } else {
      that._request(url, data, method, success, fail, complete);
    };

  },

  _request: function (url, data, method, _success, _fail, _complete) {
    wx.request({
      url: url,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method:method,
      data: data,
      success(res) {
        wx.hideLoading();
        if (res.statusCode == 200) {
          _success(res)
        } else {
          _fail(res)
        }
      },
      fail(res) {
        wx.hideLoading();
        _fail(res)
      },
      complete(res) {
        wx.hideLoading();
        _complete(res)
      },
    });
  },

  // 获取formid
  getFormId: function (formId) {
    var that = this;
    console.log('formId==' + formId);
    wx.request({
      url: that.globalData.hostUrl + 'index/addformid',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        openid: wx.getStorageSync('openid'),
        formid: formId
      },
      success: function (res) {
        console.log(res)
      }
    })
  },
  onGotUserInfo: function () {
    var that = this;
    var isLogin = wx.getStorageSync('isLogin') || false;
    if (isLogin == false) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  
  siteInfo: require("siteinfo.js"),



})