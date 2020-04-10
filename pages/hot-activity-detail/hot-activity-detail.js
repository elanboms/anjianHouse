// pages/hot-activity-detail/hot-activity-detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity: {},
    bottomActive: false,
    hiddenHouseType: true, //隐藏选择弹窗
    hiddenPhotoShare: true, //隐藏分享海报
    sharePhoto: '', //海报图片地址
    sharename:'', //分享标题
    qrcode:'', //海报二维码
    imagePath: '', //生成海报后的地址
    selectType: '', //报名项目类型
    selectBuildId: '', //选择报名项目id
    name: '',
    phone: '',
    index: 0, //选择楼盘
    activityType: [{
      type: ''
    }]
  },

  // 选择报名项目
  selectActivity: function() {
    this.setData({
      hiddenHouseType: false
    })
  },

  // 楼盘地址打开地图
  openMap: function() {
    console.log("地址")
    var that = this;
    wx.authorize({
      scope: "scope.userLocation",
      success(res) {
        wx.openLocation({
          latitude: Number(that.data.activity.latitude),
          longitude: Number(that.data.activity.longitude),
          name: that.data.activity.location
        })
      }
    })
  },
  nameInputTap: function(e) { //输入姓名
    this.setData({
      name: e.detail.value
    })
  },

  phoneInputTap: function(e) { //输入号码
    this.setData({
      phone: e.detail.value
    })
  },

  getFormId:function(e){
    console.log(e)
    var that = this;
    var formId = e.detail.formId;
    var activity_id = that.data.id;
    var build_id = that.data.selectBuildId;
    var name = that.data.name;
    var phone = that.data.phone;
    var url = app.globalData.hostUrl + 'default/activitySign';
    var prams = {
      openid: wx.getStorageSync('openid'),
      activity_id: activity_id,
      build_id: build_id,
      name: name,
      phone: phone
    };
    if (build_id == '') {
      wx.showToast({
        title: '请选择报名项目',
        icon: 'none'
      })
      return;
    } else if (name == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return;
    } else if (phone == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return;

    } else {
      wx.showLoading({
        title: '报名中',
      })
      app.getFormId(formId);
      app.request(url, prams, 'POST', true,
        function (res) {
          console.log(res)
          wx.showToast({
            title: res.data.errmsg,
            icon: 'none',
          })
          console.log(2222222222)
        },
        function (res) {
          console.log(res)
          //失败的回调函数
        },
        function (res) { })

    }

  },

  activitySignTap: function() { // 提交！
   
  },

  //选择楼盘 切换
  onChangeTap: function(e) {
    var idx = e.currentTarget.dataset.idx;
    console.log(idx);
    this.setData({
      index: idx
    })
  },
  //选择楼盘 重置
  resetHouseTap: function() {
    this.setData({
      index: 0
    })
  },
  //取消选择
  cancelSelect: function() {
    this.setData({
      hiddenHouseType: true
    })
  },

  confirmSelect: function() { //选择报名项目
    var that = this;
    var index = that.data.index;
    console.log(that.data.activity.build[index].id)
    that.setData({
      selectBuildId: that.data.activity.build[index].id,
      selectType: that.data.activity.build[index].title,
      hiddenHouseType: true
    })
  },

  // 打开分享海报
  sharePhotoTap: function() {
    this.setData({
      hiddenPhotoShare: false
    })
  },
  //关闭分享海报
  closePhotoShare: function() {
    this.setData({
      hiddenPhotoShare: true
    })
  },

  // 保存海报
  savePhoto: function() {
    let that = this;
    var photoSrc = that.data.imagePath;
    console.log(photoSrc)
    wx.saveImageToPhotosAlbum({
      filePath: photoSrc,
      success(res) {
        console.log('保存成功,' + res)
        wx.showToast({
          title: '保存成功!',
          icon: 'none'
        })
        that.setData({
          hiddenPhotoShare: true
        })
      },
      fail(res) {
        console.log(res)
        that.getSetting(res.errMsg);  //授权状态
      }
    })
  },

  getSetting: function(res) {
    var that = this;
    if (res === "saveImageToPhotosAlbum:fail:auth denied" || res === "saveImageToPhotosAlbum:fail auth deny" || res === "saveImageToPhotosAlbum:fail authorize no response") {
      wx.showModal({
        title: '提示',
        content: '需要您授权保存相册',
        showCancel: false,
        success: modalSuccess => {
          wx.openSetting({
            success(settingdata) {
              if (settingdata.authSetting['scope.writePhotosAlbum']) {
                wx.showModal({
                  title: '提示',
                  content: '获取权限成功。',
                  showCancel: false,
                  success: function(res) {
                    if (res.confirm) {
                      that.savePhoto();
                    }
                  },
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: '获取权限失败，将无法保存到相册哦~',
                  showCancel: false,
                  success(res) {
                    if (res.confirm) {
                      that.getSetting('saveImageToPhotosAlbum:fail:auth denied');
                    }
                  }
                })
              }
            },
            fail(failData) {
              console.log("failData", failData)
            },
            complete(finishData) {
              console.log("finishData", finishData)
            }
          })
        }
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id;
    var that = this;
    that.setData({
      id: id
    })
    that.getActivityDetail(); //活动详情
    
  },

  getActivityDetail: function () { //活动详情
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'default/activityDetail',
      method: 'GET',
      data: {
        id: that.data.id,
        openid: wx.getStorageSync('openid')
      },
      success: (res) => {
        console.log(res)
        var activity = res.data.activity;
        that.setData({
          activity: activity,
          sharePhoto: activity.shareimg,
          sharename:activity.sharename
        })
        that.getCode(); //获取海报二维码
      }
    })
  },

  getCode:function(){  // source:1活动详情
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'default/get_erweima',
      method: 'GET',
      data: {
        id: that.data.id,
        source:'1',
      },
      success: (res) => {
        console.log(res)
        var qrcode = res.data.qrcode;
        that.setData({
          qrcode: qrcode,
        })
        that.getPosterCanvas(); //生成海报

      },
      fail:(err)=>{
        console.log('err==' + err)
      }
    })
  },


  getPosterCanvas: function() { //海报
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var context = wx.createCanvasContext('mycanvas');
    var path = that.data.activity.shareimg;
    var codePath = that.data.qrcode;
    console.log(path)
    console.log(codePath)
    wx.getImageInfo({
      src: path,
      success(res) {
        var imgPath = res.path; //海报图
        console.log(codePath) //二维码
        wx.getImageInfo({
          src: codePath,
          success(res) {
            console.log('成功！')
            wx.hideLoading();
            var codeImg = res.path;
            //将图片绘制到canvas
            context.drawImage(imgPath, 0, 0, 250, 313);
            context.drawImage(codeImg, 143, 255, 50, 50);
            console.log(imgPath, "==imgPath")
            console.log(codeImg, "==codeImg")
            context.draw(false, function() {
              setTimeout(function() {
                wx.canvasToTempFilePath({
                  canvasId: 'mycanvas',
                  success: function(res) {
                    var tempFilePath = res.tempFilePath;
                    that.setData({
                      imagePath: tempFilePath,
                    });
                  },
                  fail: function(res) {
                    console.log(res);
                  }
                });
              }, 200)
            });
           
          },fail:function(){
            wx.showLoading({
              title: '网络异常，请重试',
            })
          }
        })
      }
    })
  },



  toview: function() { //滚动到提交按钮位置
    wx.pageScrollTo({
      selector: '#sco',
      duration: 300
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      bottomActive: true
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
  onShareAppMessage: function () {
    var that = this
    var id = that.data.id

    if (!id) {
      wx.showModal({
        title: '提示',
        content: '转发失败',
        showCancel: false,
      })
      return false
    }

    var title = that.data.sharename;
    var imageUrl = that.data.sharePhoto;
    wx.showShareMenu({
      withShareTicket: true
    })
    //console.log(imageUrl);
    return {
      title: title,
      path: '/pages/hot-activity-detail/hot-activity-detail?id=' + id,
      imageUrl: imageUrl,
      success: function (res) {
        //console.log(res)
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }

  },

  /**
   * 防止弹出层蒙板触摸穿透
   */
  preventTouchMove: function() {}
})