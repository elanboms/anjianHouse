// pages/manage1/manage1.js   
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 顶部进度条内容
    canArr:[
      {
        num:'0',
        progress:'0.6',
        text:'新增客户',
        path:"/packageA/pages/customers/customers"
      },
      {
        num: '0',
        progress: '0.3',
        text: '当天跟进',
        path:"/packageA/pages/manage3/manage3"
      },
      {
        num: '0',
        progress: '0.8',
        text: '客户总数',
        path:"/packageA/pages/manage2/manage2"
      }, {
        num: '0',
        progress: '0.8',
        text: '日转发量',
        path: "/packageA/pages/manage2/manage2"
      }, {
        num: '0',
        progress: '0.8',
        text: '日保存量',
        path: "/packageA/pages/manage2/manage2"
      }
    ],
    // 顶部进度条颜色 
    colorArr: ['#05b510', '#9b70fe', '#fcbe43','#05b510'],
    // 中间推荐部分
    nav:[
      {
        img: '/images/tabbar1.png',
        text: '推产品',
        path: '',
      },
      // {
      //   img: '/images/tabbar1.png',
      //   text: '派名片',
      //   path: '',
      // },
      {
        img: '/images/tabbar1.png',
        text: '推海报',
        path: '/packageA/pages/poster/poster',
      },
      {
        img: '/images/tabbar1.png',
        text: '营销订单',
        path: '/packageA/pages/orderList/orderList',
      },
      {
        img: '/images/tabbar1.png',
        text: '客户预约',
        path: '/packageA/pages/appointmentList/appointmentList',
      },
      // {
      //   img: '/images/tabbar1.png',
      //   text: '团队任务',
      //   path: '',
      // },
      // {
      //   img: '/images/tabbar1.png',
      //   text: '销售日报',
      //   path: '',
      // },
      // {
      //   img: '/images/tabbar1.png',
      //   text: '日程管理',
      //   path: '',
      // },
    ],
    // 海报
    poster:[
      {
        id:'0',
        img:'http://www.meiliancheng.cn/public/meiliancheng/imagezy/poster.png',
      },
      {
        id: '0',
        img: 'http://www.meiliancheng.cn/public/meiliancheng/imagezy/poster.png',
      },
      {
        id: '0',
        img: 'http://www.meiliancheng.cn/public/meiliancheng/imagezy/poster.png',
      },
      {
        id: '0',
        img: 'http://www.meiliancheng.cn/public/meiliancheng/imagezy/poster.png',
      },
    ],
    // 推好文
    read:[
      {
        id:'0',
        img:'http://www.meiliancheng.cn/public/meiliancheng/imagezy/poster.png',
        title:'【健康养生】用金银花泡水喝有什么好处【健康养生】用金银花泡水喝有什么好处',
        text:'金银花茶的营养价值，金银花的茎，叶和花都可入药，具有解毒等多种功效。金银花茶的营养价值，金银花的茎，叶和花都可入药，具有解毒等多种功效。'
      },
      {
        id: '0',
        img: 'http://www.meiliancheng.cn/public/meiliancheng/imagezy/poster.png',
        title: '【健康养生】用金银花泡水喝有什么好处',
        text: '金银花茶的营养价值，金银花的茎，叶和花都可入药，具有解毒等多种功效。'
      },
      {
        id: '0',
        img: 'http://www.meiliancheng.cn/public/meiliancheng/imagezy/poster.png',
        title: '【健康养生】用金银花泡水喝有什么好处',
        text: '金银花茶的营养价值，金银花的茎，叶和花都可入药，具有解毒等多种功效。'
      },
    ],
    // 近期客户
    customers:[
    ],


    // 底部tabbar
    hasUnRead: true,
    tabbarIndex: 0,
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
  tonav:function(e){
    var that = this;
    var path =e.currentTarget.dataset.path;
    if(path==''){
      wx.showToast({
        title: '功能尚未开放，敬请期待！',
        icon:'none'
      })
    }else{
      wx.navigateTo({
        url: path,
      })
    }
  },
  // 跳转到客户详情
  tocustomersDetail: function (e) { 
    var cid = e.currentTarget.id;
    wx.navigateTo({
      url: '/packageA/pages/customersDetail/customersDetail?customerid='+cid,
    })
  },
  // 跳转对话
  tochats: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/packageA/pages/chatManage/chatManage?cid='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      icon: 'loading'
    })
    var that = this;
    if (options.cardid) {
      app.siteInfo.pid = options.cardid;
      app.siteInfo.mid = app.siteInfo.pid
    }

    wx.request({
      url: app.globalData.hostUrl + 'manager/manager_index1',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        mid: app.siteInfo.pid
      },
      success: function (res) {
        that.setData({
          canArr: res.data.top,
          customers: res.data.bottom,
          plogo: res.data.plogo
        })
        app.siteInfo.pid = res.data.pid;
        app.siteInfo.mid = app.siteInfo.pid;
        wx.hideLoading();
      }
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
  onShareAppMessage: function (e) {
    var that = this;
    var title = app.siteInfo.authname;
    var logo = that.data.plogo;
    return {
      title: title,
      path: "/packageB/pages/index/index?share_card_id=" + app.siteInfo.pid + "&shareid=" + app.siteInfo.uid,
      imageUrl:logo,
      success: function (a) {

      },
      fail: function (a) { }
    };
  }
})
