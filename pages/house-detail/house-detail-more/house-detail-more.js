// pages/house-detail/house-detail-more/house-detail-more.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    basic_info: [], //基本信息
    sale_info: [],  //销售信息
    build_info: [], //小区概况
    permit_info:[], //预售许可证
    bottomActive:false,
    currentTap:1, //点击
    hiddenDialog: true,
    startDate:'',
    name:'',  //预约姓名
    phone:'', //预约电话
    date:'',  //预约日期
  },

  // 类型选择
  selectAreaType: function (e) {
    console.log(e)
    var that = this;
    var currentTap = e.currentTarget.dataset.index;
    if (currentTap == that.data.currentTap){
      return;
    }
    that.setData({
      currentTap: currentTap
    })
  },

  // 楼盘地址打开地图
  openMap: function () {
    var that = this;
    wx.authorize({
      scope: "scope.userLocation",
      success(res) {
        console.log(11111111)
        wx.getLocation({
          type: 'wgs84',
          altitude: false,
          success: function (res) {
            console.log(res)
            const latitude = res.latitude; //获取纬度
            const longitude = res.longitude; //获取经度
            const speed = res.speed
            const accuracy = res.accuracy
            wx.openLocation({
              latitude: latitude,
              longitude: longitude,
              name: '楼盘位置',
            })
          }
        })
      }
    })
  },

  // 拨打电话
  callTap: function () {
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.queryphone,
      success: function (e) {
        console.log(e)
      }
    })
  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var id = options.id;
    console.log("id==" + id)
    this.setData({
      id:id
    })
    this.getHouseDetail(); 
  },

  getHouseDetail: function () {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'default/getBuildDetail',
      method: 'GET',
      data: {
        id: that.data.id,
        openid: wx.getStorageSync('openid')
      },
      success: (res) => {
        console.log(res)
        console.log(res.data.build.basic_info)

        that.setData({
          build: res.data.build,
          basic_info: res.data.build.basic_info,
          sale_info: res.data.build.sale_info,
          build_info: res.data.build.build_info,
          permit_info: res.data.build.permit_info,
          queryphone: res.data.build.queryphone,
        })
      }
    })
  },




  // 时间选择
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  // 显示预约看房弹窗
  showDialog: function (e) {
    this.setData({
      hiddenDialog: false
    })
  },
  // 关闭弹窗
  closeDialog: function (e) {
    this.setData({
      hiddenDialog: true
    })
  },

  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 提交预约
  appointSuccess: function (e) {
    var that = this;
    var name = that.data.name;
    var phone = that.data.phone;
    console.log(phone)
    console.log(typeof (phone))
    var date = that.data.date;
    var url = app.globalData.hostUrl + 'default/reserve';
    if (phone.length != 11) {
      wx.showToast({
        title: '请填写正确的手机号码!',
        icon: 'none',
      })
      return;
    } else if (date.length == 0) {
      wx.showToast({
        title: '请选择预约日期!',
        icon: 'none',
      })
      return;
    }
    var prams = {
      openid: wx.getStorageSync('openid'),
      build_id: that.data.id,
      name: name,
      phone: phone,
      reserve_time: date
    }
    console.log(prams)
    // 验证登录并请求
    app.request(url, prams, 'POST', true,
      function (res) {
        console.log(res)
        console.log(2222222222)
        wx.navigateTo({
          url: '../appointSuccess/appointSuccess', //跳转至提交成功页面
        })
      },
      function (res) {
        console.log(res)
        wx.showToast({
          title: '网络异常,请重试！',
          icon: 'none',
        })
      },
      function (res) { }
    )
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
    this.setData({
      bottomActive:true,
    })
    this.getNowDate();
  },



  getNowDate: function () { //当前时间
    var that = this;
    var date = new Date();
    console.log(date)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    var startDate = [year, month, day].join('-')
    console.log(startDate)
    that.setData({
      startDate: startDate
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
    this.sharehouse(); //保存分享记录
  },

  sharehouse: function () {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'default/saveShare',
      data: {
        openid: wx.getStorageSync('openid'),
        build_id: that.data.id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) { }
    })
  },

  /**
  * 防止弹出层蒙板触摸穿透
  */
  preventTouchMove: function () {

  }
})