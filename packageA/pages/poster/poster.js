// packageA/pages/poster/poster.js
import regeneratorRuntime from '../../../utils/runtime.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width:'',
    height:'',
    imgHeight:'',
    imgurlNew:'',
    img: '',
    codeImg:'',
  },
  huan:function(){
    let that = this
    wx.request({
      url: app.globalData.hostUrl + 'manager/posterday',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        pid: app.siteInfo.pid,
        uid: app.siteInfo.uid,
      },
      success: function (res) {
        that.canvasHandle(res.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    let that = this
    wx.request({
      url: app.globalData.hostUrl + 'manager/posterday',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        pid: app.siteInfo.pid,
        uid: app.siteInfo.uid,
      },
      success: function (res) {
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
          success: function (res2) {
            that.setData({
              qrcodeurl: res2.data.qrcode
            })
            that.canvasHandle(res.data)
          }
        })
      }
    })
    
  },

  async canvasHandle (imgurl)  {
    let that = this
    let { width, height, imgHeight, img, codeImg } = that.data
    var ctx = wx.createCanvasContext('canvas')
    // 获取屏幕宽度
    await new Promise((resolve) => {
      wx.getSystemInfo({
        success(res) {
          // console.log(res.pixelRatio)
          that.setData({
            width: res.windowWidth * 0.9
          }, () => { resolve(true) })
        },
        fail: function (e) {
          resolve(e.errMsg || '出错了')
        }
      })
    })
    await new Promise((resolve) => {
      //获取图片信息
      wx.getImageInfo({
        src: imgurl,
        success(res) {

          that.setData({
            imgHeight: (that.data.width * res.height / res.width),
            height: (that.data.width * res.height / res.width) + 100,
            imgurlNew: res.path
          }, () => { resolve(true) })
          var qrcode = that.data.qrcodeurl;
          wx.getImageInfo({
            src: qrcode,
            success(res) {
              var qrcode = res.path; //海报图
              console.log(qrcode)
              that.setData({
                qrcode
              })

              ctx.drawImage(that.data.imgurlNew, 0, 0, that.data.width, that.data.imgHeight)
              ctx.rect(0, that.data.imgHeight, that.data.width, 100)
              ctx.setFillStyle('white')
              ctx.fill()

              //用户信息
              var cardname = app.siteInfo.user.cardname


              var phone = app.siteInfo.user.phone
              console.log(app.siteInfo.user)
              var position = app.siteInfo.user.position ? app.siteInfo.user.position : '销售经理'
              ctx.beginPath()
              ctx.setFillStyle('#1A1A1A')
              ctx.setFontSize(20)
              ctx.fillText(cardname, 30, that.data.imgHeight + 40)
              const metrics = ctx.measureText(cardname)
              ctx.setFontSize(15)
              ctx.fillText(position, parseInt(metrics.width) + 40, that.data.imgHeight + 39)
              ctx.setFillStyle('#909090')
              ctx.fillText(phone, 30, that.data.imgHeight + 68)
              ctx.drawImage(that.data.qrcode, that.data.width - 95, that.data.imgHeight + 10, 75, 75)
              ctx.draw()

            }
          })

        },
        fail: function (e) {
          resolve(e.errMsg || '出错了')
        }
      })
    })
  
  },

  saveHandle: function () {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'canvas',
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
})