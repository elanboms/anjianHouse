// pages/center/customer-regist/customer-regist.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customerRank:[], //等级
    rankId:'',
    homeId:'',
    productId:'',
    canbuy:'1', //购房资格 有
    addwx:'1', //微信已添加
    productList: ['产品1', '产品2', '产品3', '产品4', '产品5'],
    status:[ //购房资格
      { value: '有', checked: 'true' },
      { value:'没有'},
    ],
    wxStatus:[ //微信添加情况
      { value: '已添加', checked: 'true' },
      { value: '未添加' },
    ]
  },

  submitBtn:function(e){  //提交按钮
    console.log(e)
   
  },

  formSubmit:function(e){  //表单提交！
    console.log(e)
    var that = this;
    var formId = e.detail.formId;
    console.log(formId)
    var name = e.detail.value.name;
    var rank = e.detail.value.rank;
    var phone = e.detail.value.phone;
    var address = e.detail.value.address;
    var job = e.detail.value.job;
    var home = e.detail.value.home;
    var date = e.detail.value.date;
    var way = e.detail.value.way;
    var product = e.detail.value.product;
    var area = e.detail.value.area;
    var height = e.detail.value.height;
    var price = e.detail.value.price;
    var houseRadio = e.detail.value.houseRadio; //购房资格
    var cusName = e.detail.value.cusName; 
    var num = e.detail.value.num; 
    var wxStatus = e.detail.value.wxStatus; 

   
    if (name == '' || rank == '' || phone == '' || address == '' || job == '' || way == '' || home == '' || date=='') {
      wx.showToast({
        title: '请完整填写基本信息',
        icon: 'none'
      })
      return;
    } else {
      wx.showLoading({
        title: '提交中',
      })
      app.getFormId(formId);

      var prams= {
        openid: wx.getStorageSync('openid'),
        name: name,
        mobile: phone,
        level_id: that.data.rankId,
        sex: '0',
        address: address,
        job: job,
        home_id: that.data.homeId,
        visit_date: date,
        visit_way: way,
        build_id: that.data.productId,
        area: area,
        floor: height,
        price: price,
        canbuy: that.data.canbuy,
        buynum: num,
        addwx: that.data.addwx,
      }
      console.log(prams)
      wx.request({
        url: app.globalData.hostUrl + 'mine/saveclient',
        data: prams,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          wx.hideLoading();
          wx.navigateBack({
            delta: 1,
          })
          wx.showToast({
            title: '已成功提交！',
          })
        },
        fail: function (res) {
          console.log(res)
          wx.hideLoading();

        },
        complete: function (res) { },
      })

    }

  },

  bindRankChange:function(e){ //选择客户等级
    var that =this;
    var index = e.detail.value;
    var rankId = that.data.customerRank[index].id;
    console.log(rankId)
    that.setData({
      rankId: rankId,
      index: index
    })
  },

  bindDateChange:function(e){ //选择日期
    var date = e.detail.value;
    this.setData({
      date:date
    })
  },

  bindHomeChange: function (e) { //选择家庭结构
    var that =this;
    var index = e.detail.value;
    var homeId = that.data.homeList[index].id;
    console.log(homeId)
    this.setData({
      homeId:homeId,
      homeindex: index
    })
  },

  houseRadioChange:function(e){  //购房资格选择
    var that =this;
    var value = e.detail.value;
    var canbuy = that.data.canbuy;
    if (value=='没有'){
      canbuy='0';
    }else{
      canbuy = '1';
    }
    console.log(value+canbuy)
    that.setData({
      canbuy: canbuy,
      houseValue: value
    })
  },

  bindProductChange:function(e){  //推荐产品选择
    var that = this;
    var index = e.detail.value;
    var productId = that.data.productList[index].id;
    console.log(productId)
    this.setData({
      productId: productId,
      productIndex: index
    })
  },

  wxRadioChange:function(e){ //微信添加状态
    var that = this;
    var value = e.detail.value;
    var addwx = that.data.addwx;
    if (value == '未添加') {
      addwx = '0';
    } else {
      addwx = '1';
    }
    console.log(value+addwx)
    this.setData({
      addwx: addwx,
      wxValue: value
    })
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getClientLevel(); //获取客户等级列表
    this.getProductList(); //获取推荐产品列表
    this.getHomeList(); //获取推荐产品列表
  },

  getClientLevel:function(){
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'mine/clientLevel',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          customerRank:res.data
        })
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) { },
    })
  },

  getProductList: function () {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'mine/building',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          productList: res.data
        })
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) { },
    })
  },

  getHomeList: function () {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'mine/clientHouse',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          homeList: res.data
        })
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) { },
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
  onShareAppMessage: function () {

  }
})