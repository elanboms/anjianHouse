// pages/shareCard/shareCard.js  
var app = getApp();
Page({ 

  /**
   * 页面的初始数据
   */
  data: {

  },
  getFail:function(e){
    
    wx.showModal({
      title: '获取失败',
      content: '获取信息失败'+e,
      showCancel: false,
      success(res) {
        if (res.confirm) {
          wx.navigateBack({
            delta: 1,
          })
        }
      }
    })
  },
  downloadImg: function () {
    var that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0.,
      width: that.data.ctxWidth,
      height: that.data.ctxHeight,
      destWidth: that.data.ctxWidth * that.data.pixelRatio,
      destHeight: that.data.ctxHeight * that.data.pixelRatio,
      canvasId: 'card',
      success: function (res) {
        console.log(res.tempFilePath)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
            })
          },
          fail:function(res){
            if (res.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || res.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
              wx.showModal({
                title: '提示',
                content: '需要您授权保存相册',
                showCancel: false,
                success: modalSuccess => {
                  wx.openSetting({
                    success(settingdata) {
                      console.log("settingdata", settingdata)
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限成功,再次点击图片即可保存',
                          showCancel: false,
                        })
                      } else {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限失败，将无法保存到相册哦~',
                          showCancel: false,
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
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'manager/getManagerInfo',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        pid: app.siteInfo.pid,
        action: 'look',
      },
      success: function (res) {
        console.log(res);
        if (res.data.logo.indexOf('https') != -1) {
          res.data.logo = res.data.logo
        } else {
          res.data.logo = app.siteInfo.imgpath + res.data.logo
        }
        that.setData({
          info: res.data
        })
        wx.request({
          url: app.globalData.hostUrl + 'manager/qrcode',
          method: "post",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            pid: app.siteInfo.pid,
            uid: app.siteInfo.uid
          },
          success: function (res) {
            that.setData({
              qrcodeurl: res.data.qrcode
            })
            that.ht_fun();
          }
        })
      }
    })

  },
  ht_fun:function(e){
    var that = this;
    wx.showLoading({
      title: '正在努力加载。。。',
    })
    // 获取机器信息
    wx.getSystemInfo({
      success: function (res) {
        var vw = res.windowWidth;
        var sh = res.screenHeight;
        var ctxWidth = res.windowWidth * 8 / 10;
        var ctxHeight = ctxWidth * 780 / 600;
        that.setData({
          pixelRatio: res.pixelRatio,
          ctxWidth: ctxWidth,
          ctxHeight: ctxHeight,
        })
        console.log(vw)
        // 获取简单的用户信息
        var nickName = that.data.info.cardname;
        var avatarUrl = that.data.info.logo;
        console.log(that.data.info)
        wx.getImageInfo({
          src: avatarUrl,
          success: function (res) {
            console.log(res)
            var userImg = res.path;
            wx.getImageInfo({
              src: that.data.qrcodeurl,
              success: function (res) {
                var codeImg = res.path

                wx.hideLoading();

                var ctx = wx.createCanvasContext('card')
                // 画背景色
                ctx.beginPath();
                ctx.setFillStyle('#ffffff')
                ctx.fillRect(0, 0, ctxWidth, ctxHeight)
                ctx.restore()

                if (vw < 330) {
                  ctx.save()
                  ctx.beginPath()
                  ctx.arc(ctxWidth / 2, 50, 30, 0, 2 * Math.PI)
                  ctx.setStrokeStyle('#fff')
                  ctx.stroke()
                  ctx.clip()
                  ctx.drawImage(userImg, ctxWidth / 2 - 30, 20, 60, 60)
                  ctx.restore()

                  ctx.beginPath()
                  ctx.setFontSize(18)
                  ctx.setTextAlign('center')
                  ctx.setFillStyle('#000000')
                  ctx.fillText(nickName, ctxWidth / 2, 100)

                  ctx.drawImage(codeImg, ctxWidth / 2 - 80, 110, 160, 160);

                  ctx.setFontSize(14)
                  ctx.setTextAlign('center')
                  ctx.setFillStyle('#666')
                  ctx.fillText('安建翰林天筑邀请你使用智能名片', ctxWidth / 2, 290)
                } else if (vw < 380) {
                  ctx.save()
                  ctx.beginPath()
                  ctx.arc(ctxWidth / 2, 60, 40, 0, 2 * Math.PI)
                  ctx.setStrokeStyle('#fff')
                  ctx.stroke()
                  ctx.clip()
                  ctx.drawImage(userImg, ctxWidth / 2 - 40, 20, 80, 80)
                  ctx.restore()

                  ctx.beginPath()
                  ctx.setFontSize(18)
                  ctx.setTextAlign('center')
                  ctx.setFillStyle('#000000')
                  ctx.fillText(nickName, ctxWidth / 2, 130)

                  ctx.drawImage(codeImg, ctxWidth / 2 - 90, 160, 180, 180);

                  ctx.setFontSize(14)
                  ctx.setTextAlign('center')
                  ctx.setFillStyle('#666')
                  ctx.fillText('安建翰林天筑邀请你使用智能名片', ctxWidth / 2, 360)
                } else {
                  ctx.save()
                  ctx.beginPath()
                  ctx.arc(ctxWidth / 2, 80, 50, 0, 2 * Math.PI)
                  ctx.setStrokeStyle('#fff')
                  ctx.stroke()
                  ctx.clip()
                  ctx.drawImage(userImg, ctxWidth / 2 - 50, 30, 100, 100)
                  ctx.restore()

                  ctx.beginPath()
                  ctx.setFontSize(18)
                  ctx.setTextAlign('center')
                  ctx.setFillStyle('#000000')
                  ctx.fillText(nickName, ctxWidth / 2, 150)

                  ctx.drawImage(codeImg, ctxWidth / 2 - 100, 180, 200, 200);

                  ctx.setFontSize(14)
                  ctx.setTextAlign('center')
                  ctx.setFillStyle('#666')
                  ctx.fillText('安建翰林天筑邀请你使用智能名片', ctxWidth / 2, 400)
                }

                ctx.draw(false, function (e) {
                  wx.canvasToTempFilePath({

                  })
                })
              },
              fail: function (res) {
                that.getFail('pic2');
              }
            })
          },
          fail: function (res) {
            that.getFail('pic1');
          },
        })
      },
      fail: function (res) {
        that.getFail('rebot');
      },
      complete: function (res) {


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
  onShareAppMessage: function () {
    wx.request({
      url: app.siteInfo.siteroot + 'relay',
      method: "post",
      data: {
        uid: app.siteInfo.uid,
        pid: app.siteInfo.pid,
        replaysource: "index"
      },
      success: function (res) { }
    })
    return {
      title: app.siteInfo.sharetitle,
      path: "/pages/index/index?share_card_id=" + app.siteInfo.pid + "&shareid=" + app.siteInfo.uid,
      success: function (a) {
        wx.request({
          url: app.siteInfo.siteroot + 'relay',
          method: "post",
          data: {
            uid: app.siteInfo.uid,
            pid: app.siteInfo.pid
          },
          success: function (res) { }
        })
      },
      fail: function (a) { } 
    };
  }
})