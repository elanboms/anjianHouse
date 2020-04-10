//import '/pages/tabbar-template/tabbar-template'; 
//import { get } from '../../../utils/util';
var WxParse = require('../../../wxParse/wxParse.js');
var app = getApp(); 
Page({
  
  /** 
   * 页面的初始数据  
   */
  data: {
    barHeight: app.globalData.barHeight,
    navH: app.globalData.navHeight +44,
    barHeight: app.globalData.navHeight,
    ainame: '',
    vipalert:false,
    loginstatus:true,
    cardinfo :{},
    user: {
      name: '',
      status: '',
      company: '',
      img: '',
      phone: '',
      wechatName:'',
      qq:'',
      email:'',
      tel:'',
      address:'',
      latitude:'',
      longitude:'',
    },
    cardView:[
      
    ],
    // 靠谱
    zan:false,
    zannum:"",
    tips:[
     
    ],
    introduction:{
      text:[
        '',
        '',
      ],     
      img:[
        
      ]
    },
    news:[],
    showgz: true,
    audioPlay:false,
    tabbarIndex: 0,
    tabbar: [
      {
        img: '/img/index1.png',
        imgSelect: '/img/index2.png',
        text: '名片',
        url: '/packageB/pages/index/index',
      },
     
      // {
      //   img: '/img/mall1.png',
      //   imgSelect: '/img/mall2.png',
      //   text: '商城',
      //   url: '/packageB/pages/mall/mall',
      // },

      // {
      //   img: '/img/case1.png',
      //   imgSelect: '/img/case2.png',
      //   text: '案例',
      //   url: '/pages/case/case',
      // },
      // {
      //   img: '/img/appointment1.png',
      //   imgSelect: '/img/appointment2.png',
      //   text: '预约',
      //   url: '/pages/appointment/appointment',
      // },
      // {
      //    img: '/img/mine1.png',
      //    imgSelect: '/img/mine2.png',
      //   text: '我',
      //   url: '/pages/mine/mine',
      // },
    ],
    // 消息条数
    noteNum: 0,
    // 个人详情是否显示
    showDetail: true,
    // 标签是否显示
    tipsShow:true,
    // 产品是否显示
    productShow:true,
    // 新闻是否显示
    newsShow:true,
    // 阅读百分比
    readPercent: 0,
    actionSheetHidden: true,
    // 预览二维码
    previewShow: false,
    hbList: [
      '11111111', '12123123123', '1231314414'
    ],
    hbIndex:'-1',
    show2: false,
    show1: false,
    prize_type: '',
    prize_value: '',
    discount: '',
    list: [
      {
        type: '新人礼包',
        value: '10.00',
        discount: '商城抵扣满100减10',
      },
      {
        type: '老人礼包',
        value: '20.00',
        discount: '商城抵扣满200减20',
      },
      {
        type: '鄙人礼包',
        value: '30.00',
        discount: '商城抵扣满300减30',
      },
      {
        type: '私人礼包',
        value: '40.00',
        discount: '商城抵扣满400减40',
      },
      {
        type: '狗东西礼包',
        value: '50.00',
        discount: '商城抵扣满500减50',
      },
      {
        type: 'lol礼包',
        value: '60.00',
        discount: '商城抵扣满500减60',
      },
    ],
    catchhb:true,
    maskShow: false,
    index_vip_show:false,
    caselist:[]
  },
  maskHide:function(){
    this.setData({
      maskShow: false,
      index_vip_show: false,
    })
  },
  tovip:function(){
    this.setData({
      maskShow: false,
      index_vip_show: false,
    })
    wx.navigateTo({
      url: '/pages/vipList/vipList',
    })

  },
  abc:function(){
    wx.navigateTo({
      url: '/pages/newsDetail/newsDetail?id=10004',
    })
  },
  close1: function () {
    this.setData({
      show1: false,
    })
  },
  close2: function () {
    this.setData({
      show2: false,
    })
  },
  showhb:function(){
    this.setData({
      show1:true
    })
  },
  showhbover:function(){
    wx.showToast({
      title: '红包已领取',
    })
  },
  binderror:function(e){

  },
  bindload:function(e){
    var that = this;
    var status = e.detail.status;
    if (status == 0){
      that.setData({
        showgz : true
      })
    }else{
      that.setData({
        showgz: true
      })
    }
  },
  completemessage:function(e){
    
    if (e.detail.errcode == 0){
      wx.showModal({
        title: '已将的联系方式通过服务通知发送给你，请在微信消息列表查看',
        showCancel: false,
        confirmText: '我知道了'
      })
    } else if ( e.detail.errcode == -3006){
      wx.showModal({
        title: '你们已经是好友了',
        showCancel: false,
        confirmText: '我知道了'
      })
    }
   
  },
  previewHide:function(){
    this.setData({
      previewShow: false,
    })
  },
  // 获取formid
  getFormId: function (e) {
    var formid = e.detail.formId;
    
    wx.request({
      url: app.globalData.hostUrl + 'index/addformid',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        openid: wx.getStorageSync('openid'),
        formid: formid
      },
      success: function (res) {

      }
    })
  },
  tologin:function(){
    wx.navigateTo({
      url: '/pages/welcome/welcome',
    })
  },
  // 打电话 
  makePhoneCall: function (e) {
    var that = this;
    var isLogin = wx.getStorageSync('isLogin') || false;
    //登录判断
    if (isLogin == false) {
      that.onGotUserInfo()
    }
    var phone = e.currentTarget.dataset.text;
    var name = e.currentTarget.dataset.name;
    wx.makePhoneCall({
      phoneNumber: phone,
    })
    wx.request({
      url: app.globalData.hostUrl + 'mycard/send_do_action',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        uid: app.siteInfo.uid,
        pid: app.siteInfo.pid,
        name: name
      },
      success: function (res) {

      }
    })
  },
  // 显示详情
  showDetail:function(){
    var that = this;
    var showDetail = that.data.showDetail;
    if (showDetail == true){
      showDetail = false;
    }
    else{
      showDetail = true;
    }
    that.setData({
      showDetail: showDetail,
    })
  },
  // 点击靠谱
  tozan:function(){
    var that = this;
    var isLogin = wx.getStorageSync('isLogin') || false;
    //登录判断
    if (isLogin == false) {
      that.onGotUserInfo()
    }
    var zan = that.data.zan;
    var zannum = that.data.zannum; 
    if(zan == true){
      zan = false;
      zannum = zannum - 1;
    }else{
      zan = true;
      zannum = zannum + 1;      
    }
    wx.request({
      url: app.globalData.hostUrl + 'mycard/like_status',
      method:"post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        uid:app.siteInfo.uid,
        pid:app.siteInfo.pid
      },
      success:function(res){
        if(res.data.code == 200){
          that.setData({
            zan: zan,
            zannum: zannum
          })
        }
      }
    })
   
  },

  // 点击分享 
  actionSheetTap: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetbindchange: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindMenu1: function () {
    this.setData({
      menu: 1,
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  //生成卡片
  bindMenu2: function (e) {
    this.setData({
      menu: 2,
      actionSheetHidden: !this.data.actionSheetHidden
    })
    wx.navigateTo({
      url: '/packageB/pages/shareCard/shareCard',
    })
  },
  // 交换名片
  formSubmit: function () {
    var that = this;
    that.addPhoneContact();
  },
  getPhone: function (e) {
    var that = this;
    that.addPhoneContact();
  },
  // 复制信息
  copyText:function(e){
    var that = this;
    var isLogin = wx.getStorageSync('isLogin') || false;
    //登录判断
    if (isLogin == false) {
      that.onGotUserInfo()
    }
    var copyText = e.currentTarget.dataset.text;
    var name =e.currentTarget.dataset.name;
    wx.setClipboardData({
      data: copyText,
      success(res) {
        wx.getClipboardData({
          success(res) {
            
          }
        })
      }
    })
    wx.request({
      url: app.globalData.hostUrl + 'mycard/send_do_action',
      method:"post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        uid:app.siteInfo.uid,
        pid:app.siteInfo.pid,
        name:name
      },
      success:function(res){

      }
    })
  },
  // 打开位置
  openLocation:function(){
    var that = this;
    var isLogin = wx.getStorageSync('isLogin') || false;
    //登录判断
    if (isLogin == false) {
      that.onGotUserInfo()
    }
    var longitude = parseFloat(that.data.user.longitude);
    var latitude = parseFloat(that.data.user.latitude);
    var address = that.data.user.address;
    
    wx.authorize({
      scope: "scope.userLocation",
      success(res) {
        wx.openLocation({
          latitude: latitude,
          longitude:longitude,
          name: address,
          scale: 14
        })
      }
    })

    wx.request({
      url: app.globalData.hostUrl + 'mycard/send_do_action',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        uid: app.siteInfo.uid,
        pid: app.siteInfo.pid,
        name: 'location'
      },
      success: function (res) {

      }
    })
  },
  // 添加通讯录
  addPhoneContact:function(e){
    var that = this;
    var isLogin = wx.getStorageSync('isLogin') || false;
    //登录判断
    if (isLogin == false) {
      that.onGotUserInfo()
    }
    var user = that.data.user;
    wx.addPhoneContact({
      firstName:         user.name,
      photoFilePath:     user.img,
      nickName:          user.name,
      mobilePhoneNumber: user.phone,
      weChatNumber:      user.weixin,
      organization:      user.company,
      title:             user.status,
      workPhoneNumber:   user.tel,
      email:             user.email,
      homeAddressCity:    user.address,

    })
    wx.request({
      url: app.globalData.hostUrl + 'mycard/send_do_action',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        uid: app.siteInfo.uid,
        pid: app.siteInfo.pid,
        name: 'txl'
      },
      success: function (res) {

      }
    })
  },
  // 标签点击
  tipsZan:function(e){
    var that = this;
    var isLogin = wx.getStorageSync('isLogin') || false;
    //登录判断
    if (isLogin == false) {
      that.onGotUserInfo()
    }
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    var tips = that.data.tips;
    var hasZan = tips[index].hasZan;
    if(hasZan ==true){
      tips[index].hasZan = false;
      tips[index].num--;
    }else{
      tips[index].hasZan = true;
      tips[index].num++;
    }
    that.setData({
      tips:tips,
    })
    wx.request({
      url: app.globalData.hostUrl + 'mycard/tags_status',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        uid: app.siteInfo.uid,
        pid: app.siteInfo.pid,
        id:id
      },
      success: function (res) {

      }
    })
  },
  // 名片夹
  tomyCards:function(){
    wx.redirectTo({
      url: '/packageB/pages/myCards/myCards',
    })
  },
  // 留言
  tochat:function(){
    var that = this;
    var isLogin = wx.getStorageSync('isLogin') || false;
    //登录判断
    if (isLogin == false) {
      that.onGotUserInfo()
    }
    wx.navigateTo({
      url: '/packageB/pages/chat/chat',
    })
  },
  // 滚动计算阅读
  scroll:function(e){
    var that = this;
    var scrollHeight = e.detail.scrollHeight;
    var scrollTop = e.detail.scrollTop;
    var windowHeight = that.data.windowHeight;
    var height = scrollHeight - windowHeight -20;
    var scrollPercent = (scrollTop/height) * 100;
    scrollPercent = Math.ceil(scrollPercent);
    var readPercent = that.data.readPercent;
    if (scrollPercent >100){
      scrollPercent = 100;
      readPercent = 100;
    }else{
      scrollPercent = scrollPercent;
      if (scrollPercent > readPercent){
        readPercent = scrollPercent;
      }else{
        readPercent = readPercent;
      }
    }
    that.setData({
      readPercent: readPercent 
    })
  },
  // tabbar跳转
  tabbarNav:function(e){
    var url = e.currentTarget.dataset.url;
    wx.redirectTo({
      url: url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    app.siteInfo.uid= wx.getStorageSync('userId');
    if (options.pid) {
      app.siteInfo.pid = options.pid
    }

    if(options.share_card_id){
      app.siteInfo.pid = options.share_card_id;
    }
    that.setData({
      ainame: app.siteInfo.authname
    })
  },

  onGotUserInfo:function(){
    var that = this;
    var isLogin = wx.getStorageSync('isLogin') || false;
    if (isLogin == false) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  gerCardInfo: function(){
    wx.showLoading({
      title: '加载中',
      icon: 'loading'
    })
    var that = this
    if (app.siteInfo.share_card_id && !app.siteInfo.pid){
      app.siteInfo.pid = app.siteInfo.share_card_id
    }
    wx.request({
      url: app.globalData.hostUrl + 'mycard/getCardInfo',
      data: { 
        uid: app.siteInfo.uid,
        pid: app.siteInfo.pid,
        shareid: app.siteInfo.shareid,
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading();
        wx.setNavigationBarTitle({
          title: res.data.indexname//页面标题为路由参数
        })
        // 设置名字1
        app.siteInfo.cardname = res.data.cardname;
        // 设置导购所属门店
        that.audio = wx.createInnerAudioContext();
        that.audio.autoplay = false
        that.audio.src = res.data.audiourl
        that.audio.onPlay(() => {
          that.setData({
            audioPlay: true
          })
          that.audio.duration
        })
        that.audio.onTimeUpdate((res) => {
          var restTime = that.audio.duration - that.audio.currentTime
          if (restTime > 0) {
            that.setTime(restTime)
          } else {
            that.setTime(that.audio.duration)
          }
        })
        that.audio.onError((res) => { 
        })
        that.audio.onPause((res) => {
          that.setData({
            audioPlay: false
          })
        })
        that.audio.onEnded((res) => {
          that.setData({
            audioPlay: false
          })
        })
        
        if(res.data.logo.indexOf('https') != -1){
          var logoimg = res.data.logo
        }else{
          var logoimg = app.siteInfo.imgpath +res.data.logo
        }
        app.siteInfo.user = res.data;
        var article = res.data.cominfo.description
        WxParse.wxParse('article', 'html', article, that, 0);
        //wx.setStorageSync('caselist', res.data.caselist)
        that.setData({
          islogin:true,
          isshow:true,
          now_uid: app.siteInfo.uid,
          cardinfo: res.data,
          caselist: res.data.caselist,
          user: {
            audiourl: res.data.audiourl,
            name: res.data.cardname,
            status: res.data.position,
            company: res.data.cominfo.name,
            img: logoimg,
            phone: res.data.phone,
            weixin: res.data.weixin,
            qq: '',
            email: res.data.email,
            tel: res.data.mobile,
            address: res.data.cominfo.address,
            latitude: res.data.cominfo.lat,
            longitude: res.data.cominfo.lng,
            view: res.data.view,
            likenum:res.data.likenum,
          },
          zannum: res.data.likenum,
          cardView:res.data.viewlist,
          zan : res.data.islike,
          introduction: {
            text: [
              res.data.detail,
            ],
            img: res.data.thumb
          },
          tips : res.data.tagslist,
        })
      }
    })
  },

  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  changeAudio:function(){
    var that = this;
    if (that.data.audioPlay==true){
      that.audio.pause()
      that.setData({
        audioPlay: false
      })
    }else{
      that.audio.play()
      that.setData({
        audioPlay: true
      })
    }
  },
  setTime:function(e){
    var that = this;
    var min = Math.floor(e / 60);
    if (min < 10) {
      min = '0' + min
    }
    var sec = Math.floor(e % 60);
    that.setData({
      audioMin: min,
      audioSec: sec,
    })
  },  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this; 
    var isLogin = wx.getStorageSync('isLogin') || false;
    //登录判断
    if (isLogin == false){
      that.onGotUserInfo()
    }
    //未读消息
    wx.request({
      url: app.globalData.hostUrl + 'mycard/getWdMsg',
      data: {
        rid: app.siteInfo.uid,
        sid: app.siteInfo.pid,
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          msgcount: res.data.num,
          allnum: res.data.allnum,
        })
        if(res.data.num>0){
          that.setData({
            newMessageShow: true,
          })
          setTimeout(function(){
            that.setData({
              newMessageShow: false,
            })
          },3000)
        }
      }
    })

    var startTime = new Date().getTime();
    that.setData({
      startTime: startTime,
    })
    wx.getSystemInfo({
      success(res) {
        that.setData({
          windowHeight: res.windowHeight,
        })
      }
    })
    var isshow = that.data.isshow;
    if(isshow){
     wx.request({
       url: app.globalData.hostUrl + 'mycard/in_card',
       method:"post",
       header: {
         'content-type': 'application/x-www-form-urlencoded'
       },
       data:{
         uid: app.siteInfo.uid,
         pid: app.siteInfo.pid,
       },
       success:function(){

       }
     })
    }
    if (wx.getStorageSync('isLogin') || wx.getStorageSync('share_card_id')) {
      that.gerCardInfo()
    }
  },
  // 获得停留时间，毫秒级
  getStopTime:function(){
    var that = this;
    var endTime = new Date().getTime();
    var startTime = that.data.startTime;
    var stopTime = endTime - startTime;
    that.setData({
      stopTime: stopTime
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { 
    var that = this;
    that.getStopTime();
    var stoptime =  that.data.stopTime;
    var percent = that.data.readPercent;
    wx.request({
      url: app.globalData.hostUrl + 'mycard/out_card',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        uid: app.siteInfo.uid,
        pid: app.siteInfo.pid,
        percent:percent,
        stoptime:stoptime
      },
      success: function () {
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that = this;
    that.getStopTime();
    that.audio.onStop((res) => {
      that.setData({
        audioPlay: false
      })
    })
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
    var that=this;
    that.sharevard();
    
    return {
      title: app.siteInfo.authname + "-" + that.data.user.name,
      imageUrl: that.data.user.img,
      path: "/packageB/pages/index/index?share_card_id=" + app.siteInfo.pid + "&shareid=" + app.siteInfo.uid,
      success: function (a) {
        
      },
      fail: function (a) {}
    };
  },

  sharevard: function () {
    wx.request({
      url: app.globalData.hostUrl + 'mycard/relay',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        uid: app.siteInfo.uid,
        pid: app.siteInfo.pid,
        replaysource: "index"
      },
      success: function (res) { }
    })
  },
  /**
   * 跳转至案例详情
   */
  toDetail: function (e) {
    wx.navigateTo({
      url: `/pages/house-detail/house-detail?id=${e.currentTarget.id}`
    })
  },

  // 跳转至更多案例页
  toCaseList: function (e) {
    wx.navigateTo({
      url: `/packageB/pages/caseList/caseList`
    })
  },

  // 跳转至个人中心
  handleMine: function (e) {
    wx.switchTab({
      url: "/pages/mine/mine"
    })
  },

  // 跳转至首页
  goHome: function (e) {
    wx.switchTab({
      url: "/pages/index/index"
    })
  },
})