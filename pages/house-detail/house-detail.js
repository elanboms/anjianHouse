// pages/house-detail/house-detail.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    showVR: false,
    bottomActive: false, //底部按钮显示隐藏
    store: false, //是否已收藏
    photoList: [{ //相册
      picurl: '',
      name: ''
    }],
    startDate: '', //当前日期
    hiddenDialog: true,
    hiddenPhotoShare: true, //分享海报隐藏
    sharePhoto: '', //海报图片地址
    sharename:'', //分享名称
    qrcode: '', //海报二维码
    imagePath: '', //生成海报后的地址
    build: [],
    album: [], //相册
    isCollect: '', //是否收藏 0否，1是
    name: '', //预约看房姓名
    phone: '', //预约看房电话
    date: '', //预约看房日期
    image_deps:'', //广告
    currentTap:'0',
  },

  openVR: function() {
    let that =this
    wx.navigateTo({
      url: '/pages/VR/VR?id=' + that.data.id,
    })
  },

  openAddTap(){
    let that =this
    wx.navigateTo({
      url: '/pages/house-form/house-form?id=' + that.data.id,
    })
  },

  openRule(){
    let that = this
    wx.navigateTo({
      url: '/pages/house-detail/house-rule/house-rule?id=' + that.data.id,
    })
  },

  storeTap: function() { //收藏
    var that = this;
    var id = that.data.id;
    var url = app.globalData.hostUrl + 'default/saveCollect';
    var isCollect = that.data.isCollect;
    var like;
    if (isCollect == '1') {
      like = false;
    } else {
      like = true;
    }
    var date = {
      openid: wx.getStorageSync('openid'),
      build_id: id,
      source: '0',
      like: like
    };
    app.request(url, date, 'POST', true,
      function(res) {
        console.log(res)
        console.log(2222222222)
        that.getHouseDetail(); //获取楼盘详情
      },
      function(res) {
        console.log(res)
        //失败的回调函数
      },
      function(res) {})
  },

  // 相册更多
  openAlbum:function(){
    var that = this;
    var houseid = that.data.id;
    wx.navigateTo({
      url: 'album/album?houseid=' + houseid,
    })
  },




  // 预览图片
  previewImage: function(e) {
    console.log(e)
    var that = this;
    var current = e.currentTarget.dataset.imgUrl;
    var imgList=[];
    for (var index in that.data.album) {
      imgList = imgList.concat(that.data.album[index].picurl);
    }
    console.log(current)
    wx.previewImage({
      current:current,
      urls: imgList,
      success: function(e) {
        console.log(e)
      }
    })
  },
  openCalc: function() {
    wx.navigateTo({
      url: '../calculator/calculator'
    })
  },

  // 拨打电话
  callTap: function() {
    var that = this;
    var phoneNum = that.data.build.queryphone;
    wx.makePhoneCall({
      phoneNumber: phoneNum,
      success: function(e) {
        console.log(e)
      }
    })
  },

  // 跳转更多楼盘信息
  openMoreHouseInfo: function(e) {
    var id = e.currentTarget.dataset.id;
    console.log('id===' + id)
    wx.navigateTo({
      url: 'house-detail-more/house-detail-more?id=' + id,
    })
  },

  // 时间选择
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  // 显示预约看房弹窗
  showDialog: function(e) {
    this.setData({
      hiddenDialog: false
    })
  },
  // 关闭弹窗
  closeDialog: function(e) {
    this.setData({
      hiddenDialog: true
    })
  },

  nameInput: function(e) {
    this.setData({
      name: e.detail.value
    })
  },

  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  formSubmit: function (e) { //表单提交
    console.log(e)
    var that = this;
    var formId = e.detail.formId;
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
    wx.showLoading({
      title: '预约中',
    })
    // 验证登录并请求
    app.request(url, prams, 'POST', true,
      function (res) {
        console.log(res)
        app.getFormId(formId);
        wx.hideLoading();

        wx.navigateTo({
          url: 'appointSuccess/appointSuccess', //跳转至提交成功页面
        })
      },
      function (res) {
        console.log(res)
        wx.hideLoading();
        wx.showToast({
          title: '网络异常,请重试！',
          icon: 'none',
        })
      },
      function (res) { }
    )
  },

  // 提交预约
  appointSuccess: function(e) {
    console.log(e)
  },



  // 打开分享海报
  sharePhotoTap: function() {
    var that = this;
    app.confirmLogin(function() {
      that.setData({
        hiddenPhotoShare: false
      })
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
        that.getSetting(res.errMsg); //授权状态
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
    console.log('id===' + options.id)
    var id = options.id
    var that = this;
    if (id) {
      that.setData({
        id: id
      })
    }
    that.getHouseDetail(); //获取楼盘详情
    that.getNowDate();

  },

  getHouseDetail: function() {
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
        var imgList = [];
        for (var index in res.data.album) {
          imgList = imgList.concat(res.data.album[index].picurl);
        }
        that.setData({
          build: res.data.build,
          album: res.data.album,
          photoList: imgList,
          isCollect: res.data.build.isCollect,
          sharePhoto: res.data.build.shareimg,
          sharename: res.data.build.sharename,
          image_deps: res.data.image_deps,
          nearby_info: res.data.build.nearby_info,
          employees: res.data.build.employees
        })
        that.getCode(); //获取海报二维码
        
      }
    })
  },


  getCode: function() { // source:0楼盘详情
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'default/get_erweima',
      method: 'GET',
      data: {
        id: that.data.id,
        source: '0',
      },
      success: (res) => {
        console.log(res)
        var qrcode = res.data.qrcode;
        that.setData({
          qrcode: qrcode,
        })
        that.getPosterCanvas(); //生成海报

      },
      fail: (err) => {
        console.log('err==' + err)
      }
    })
  },


  getPosterCanvas: function() { //海报
    var that = this;
    var context = wx.createCanvasContext('mycanvas');
    var path = that.data.sharePhoto;
    var codePath = that.data.qrcode;
    wx.getImageInfo({
      src: path,
      success(res) {
        var imgPath = res.path;
        wx.getImageInfo({
          src: codePath,
          success(res) {
            var codeImg = res.path;
            //将图片绘制到canvas
            context.drawImage(imgPath, 0, 0, 200, 313);
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
          }
        })
      }
    })
  },


  getNowDate: function() { //当前时间
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

  // 楼盘地址打开地图
  // openMap: function () {
  //   console.log("地址")
  //   var that = this;
  //   wx.authorize({
  //     scope: "scope.userLocation",
  //     success(res) {
  //       wx.openLocation({
  //         latitude: Number(that.data.build.latitude),
  //         longitude: Number(that.data.build.longitude),
  //         name: that.data.build.location
  //       })
  //     }
  //   })
  // },



  openMap: function () { //打开地图选择位置
    let that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success(re) {
              wx.openLocation({
                latitude: Number(that.data.build.latitude),
                longitude: Number(that.data.build.longitude),
                name: that.data.build.location
              })
            },
            fail(re) {
              console.log(111111)
              console.log(re)
              that.getSetting();
            },
          })
        } else { //已授权
          wx.openLocation({
            latitude: Number(that.data.build.latitude),
            longitude: Number(that.data.build.longitude),
            name: that.data.build.location
          })
        }
      }
    })

  },

  getSetting(e) { //获取权限设置
    let that = this;
    wx.getSetting({
      success: function (res) {
        console.log(res.authSetting)
        if (!res.authSetting['scope.userLocation']) {
          wx.showModal({
            title: '是否授权位置权限',
            content: '需要获取您的位置权限，请确认授权，否则无法调用地图',
            showCancel: true,
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '授权失败',
                  icon: 'success',
                  duration: 1000
                })
              } else { //确定
                wx.openSetting({
                  success(re) {
                    console.log(re.authSetting)
                    if (re.authSetting["scope.userLocation"]) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      that.openMap();
                    } else {
                      wx.showToast({
                        title: '授权失败!',
                        icon: 'success',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        } else { //已授权
          // that.openMap();
        }

      },
      fail: function (res) { },
      complete: function (res) { },
    })

  },

  makePhoneCall(e) {
    var phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  tocard: function (e) {
    console.log(123)
    var id = e.currentTarget.dataset.id;
    console.log(id)
    if (id) {
      app.siteInfo.pid = id;
      wx.redirectTo({
        url: '/packageB/pages/index/index',
      })
    }
  },

  // 类型选择
  selectAreaType: function (e) {
    console.log(e)
    var that = this;
    var currentTap = e.currentTarget.dataset.index;
    if (currentTap == that.data.currentTap) {
      return;
    }
    that.setData({
      currentTap: currentTap
    })
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
      path: '/pages/house-detail/house-detail?id=' + id,
      imageUrl: imageUrl,
      success: function (res) {
        //console.log(res)
        that.sharehouse(); //保存分享记录
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }

  },

  sharehouse: function() {
    var that = this;
    console.log(that.data.id)
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
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {}
    })
  },

  /**
   * 防止弹出层蒙板触摸穿透
   */
  preventTouchMove: function() {},
  showRooms(e){
    wx.navigateTo({
      url: '/pages/house-detail/house-info/house-info',
    })
  }
})