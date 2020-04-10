// pages/shareCard/shareCard.js  
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getFail: function (e) {

    wx.showModal({
      title: '获取失败',
      content: '获取信息失败' + e,
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
    if (options.source) {
      if (options.source == 'product' && options.productid) {
        that.setData({
          productid: options.productid
        })
        if (that.data.productid) {
          wx.request({
            url: app.siteInfo.siteroot + 'product_one',
            method: "post",
            data: {
              uid: app.siteInfo.uid,
              pid: app.siteInfo.pid,
              aid: that.data.productid,
              flag: 'getimg'
            },
            success: function (res) {
              if (res.data.logo1) {
                var imgsrc_main = res.data.logo1;
              } else {
                var imgsrc_main = res.data.logo;
              }
              that.setData({
                imgsrc_main: imgsrc_main
              })
            }
          })
        }
      }
    }
    wx.request({
      url: app.siteInfo.managerpath + 'getManagerInfo',
      method: "post",
      data: {
        com_part_id: app.siteInfo.com_part_id,
        pid: app.siteInfo.pid,
        action: 'look',
      },
      success: function (res) {
        console.log(res);
        that.setData({
          info: res.data
        })
        var qrcode = that.data.info.qrcode;
        if (!qrcode) {
          wx.request({
            url: app.siteInfo.managerpath + 'qrcode',
            method: "post",
            data: {
              pid: app.siteInfo.pid,
              com_part_id: app.siteInfo.com_part_id
            },
            success: function (res) {
              that.setData({
                qrcodeurl: res.data.qrcode
              })
              that.ht_fun();
            }
          })
        } else {
          that.setData({
            qrcodeurl: qrcode
          })
          that.ht_fun();
        }
      }
    })



  },
  ht_fun: function (e) {
    var that = this;
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
            if (that.data.imgsrc_main) {
              var imgsrc_main = that.data.imgsrc_main
            } else {
              var imgsrc_main = that.data.qrcodeurl
            }
            console.log(imgsrc_main);
            wx.getImageInfo({
              src: imgsrc_main,
              success: function (res) {
                var codeImg = res.path

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
                  ctx.fillText('志邦家居邀请你使用智能名片', ctxWidth / 2, 290)
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
                  ctx.fillText('志邦家居邀请你使用智能名片', ctxWidth / 2, 360)
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
                  ctx.fillText('志邦家居邀请你使用智能名片', ctxWidth / 2, 400)
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

  }
})