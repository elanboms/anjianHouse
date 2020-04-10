var app = getApp();
Page({

  /**
   * 页面的初始数据 
   */
  data: { 
    nav:['决策人','影响决策人','经办人'],
    intention: ['20%', '40%', '60%', '80%','100%'],
    sex: ['未知','男','女'],
    industry:['','行业二','行业三','行业四'],
    moreHide:false,
    date:'123-123-123'
  },
  chooseNav:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.setData({
      navIndex:index,
    })
  },
  intentionChange:function(e){
    this.setData({
      intentionIndex: e.detail.value
    })
  },
  sexChange:function(e){
    this.setData({
      sexIndex: e.detail.value
    })
  },
  dateChange:function(e){
    this.setData({
      date: e.detail.value
    })
  },
  industryChange:function(e){
    this.setData({
      industryIndex: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  moreHide:function(e){
    var that = this;
    var moreHide = that.data.moreHide;
    if (moreHide == true){
      moreHide = false
    }else{
      moreHide = true
    }
    that.setData({
      moreHide: moreHide,
    })
  },
  formSubmit:function(e){
    var that = this;
    var a = e.detail.value;
    //var r = that.data.navIndex+1;    
    wx.request({
      url: app.globalData.hostUrl + 'manager/doCustomerInfo',
      method:"post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        mid: app.siteInfo.pid,
        cid:that.data.cid,
        action: 'update',
        username: a.username,
        weixin: a.weixin,
        phone: a.phone,
        smile: a.smile,
        gender: a.gender,
        job: a.job,
        location: a.location,
        address: a.address
      },
      success:function(res){
        wx.showToast({
          title: res.data.msg,
          icon: 'none',  //  loading/success/none        
          duration: 1000
        })
      }
    })

    wx.navigateBack({
      delta:1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      icon:"loading"
    })
    var that = this;
    var cid = options.cid;
    that.setData({
      cid:cid
    })
    wx.request({
      url: app.globalData.hostUrl + 'manager/doCustomerInfo',
      method:"post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        mid:app.siteInfo.pid,
        cid:cid,
        action:'look'
      },
      success:function(res){
        console.log(res)
        that.setData({
          userinfo:res.data,
          intentionIndex:res.data.smile,
          navIndex:res.data.role-1,
          sexIndex:res.data.gender,
          region:[res.data.province,res.data.city,res.data.area]
        })
        wx.hideLoading()
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
  // onShareAppMessage: function () {

  // }
})