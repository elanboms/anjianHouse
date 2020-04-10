// pages/house-form/house-form.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    deposit:0,  //订金
    types:[],
    typeIdx:'',
    typeId:'', //户型id
    tipsSrc:'/images/select-0.png',
    agree:false,
    opt:true, //阻塞器
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    this.setData({
      id
    })
  },

  selectTap(e){
    console.log(e.detail.value)
    let that = this;
    let { types } = that.data
    this.setData({
      typeIdx: e.detail.value,
      typeId: types[e.detail.value].id
    })
  },

  agreeTips(){
    let that = this
    if (that.data.tipsSrc =='/images/select-0.png'){
      that.setData({
        tipsSrc:'/images/select-1.png',
        agree:true,
      })
    }else{
      that.setData({
        tipsSrc: '/images/select-0.png',
        agree:false,
      })
    }
  },

  openTips(){
    wx.navigateTo({
      url: '/pages/rule/rule',
    })
  },

  submitTap(e){
    console.log(e)
    let that = this;
    if(!that.data.opt){return;}
    that.setData({ opt:false })
    setTimeout(function(){
      that.setData({ opt: true })
    },500)
    let params = e.detail.value
    let types = that.data.types
    params.userId = wx.getStorageSync('userId')
    params.typeId = that.data.typeId
    params.agree = that.data.agree
    params.houseId = that.data.id
    if (!that.data.typeId){
      wx.showToast({
        title: '请选择户型',
        icon: 'none',
        duration: 1500,
      })
      return
    }else if(!params.name){
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 1500,
      })
      return
    } else if (!params.phone||params.phone.length!=11) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1500,
      })
      return
    } else if (!params.idcard || params.idcard.length != 18) {
      wx.showToast({
        title: '请输入正确的身份证号',
        icon: 'none',
        duration: 1500,
      })
      return
    } else if (!params.agree) {
      wx.showToast({
        title: '请先同意协议后操作',
        icon: 'none',
        duration: 1500,
      })
      return
    }else{ //提交
      console.log("提交")
      console.log(params)
      params.typeName = types[that.data.typeIdx].name || ''

      let url = app.globalData.hostUrl + 'deposit/paydeposit';
      app.request(url, params, 'POST', true,
        function (res) {
          console.log(res)
          wx.requestPayment({
            timeStamp: res.data.timeStamp,
            nonceStr: res.data.nonceStr,
            package: 'prepay_id=' + res.data.prepay_id,
            signType: 'MD5',
            paySign: res.data.paySign,
            success: function(re) {
              console.log(re)
              if (re.errMsg == "requestPayment:ok"){
                wx.showToast({
                  title: '预定成功！',
                  icon: 'none',
                  duration: 2000,
                  mask: true,
                })
                setTimeout(function(){
                  wx.redirectTo({
                    url: '/pages/mine/my-order/my-order',
                  })
                },2000)
              }else{
                wx.showToast({
                  title: '支付失败，请重试！',
                  icon: 'none',
                  duration: 2000,
                  mask: true,
                })
              }
            },
            fail: function(re) {
              console.log(re)
              wx.showToast({
                title: '支付失败，请重试！',
                icon: 'none',
                duration: 2000,
                mask: true,
              })
            },
            complete: function(re) {},
          })
        },
        function (res) {
          console.log(res)
          //失败的回调函数
        },
        function (res) { })
        
    }
  
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
    this.getData()
  },

  getData(){ //获取数据
    var that = this;
    let {id} = that.data;
    var url = app.globalData.hostUrl + 'deposit/basic';
    var date = {
      build_id:id
    };
    app.request(url, date, 'get', true,
      function (res) {
        console.log(res)
        that.setData({
          deposit: res.data.deposit,
          types:res.data.types
        })
      },
      function (res) {
        console.log(res)
        //失败的回调函数
      },
      function (res) { })
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