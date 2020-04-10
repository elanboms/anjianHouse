var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagArr:[],
    uploadImgArr:[],
    addTagModel:false,
    inputVal:''
  },
  
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  formSubmit: function (e) {
    var a = e.detail.value;
    var that = this;      
    wx.request({
      url: app.globalData.hostUrl + 'manager/getManagerInfo',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        pid: app.siteInfo.pid,
        action: 'action',
        name: a.name,
        phone: a.phone,
        status: a.status,
        wechat: a.wechat,
        tel: a.tel,
        email: a.email,
        detail: a.detail,
        audiourl: a.audiourl,
        thumb: JSON.stringify(that.data.user.thumb)
      },
      success: function (res) {
        
      }
    })
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'manager/getManagerInfo',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        pid: app.siteInfo.pid,
        action:'look'
      },
      success:function(res){
        that.setData({
          user: res.data,
          // region: [res.data.manager.province, res.data.manager.city, res.data.manager.area]
        })
      }
    })
  },

  // 上传照片
  uploadImg: function () {
    let that = this;
    var user = that.data.user
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        wx.showLoading({
          title: '图片上传中',
          icon: 'loading'
        })
        wx.uploadFile({
          url: app.globalData.hostUrl + 'qiniu/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'host': app.globalData.hostUrl
          },
          success: function (res) {
            wx.hideLoading();
            res.data = JSON.parse(res.data);
            // console.log(JSON.parse(res.data));
            // console.log(res.data.error);
            if (res.data.error == 0) {
              if (!user.thumb) {
                user.thumb = [];
              }
              user.thumb.push(res.data.url)
              that.setData({
                user: user,
                addTagModel: false
              })
            } else {
              wx.showModal({
                title: '提示',
                content: res.data.message,
                showCancel: false,
              })
            }
          }
        })
        
      }
    })
  },

  // 删除照片
  delPhotoHandle: function (e) {
    var index = e.currentTarget.id;
    var that = this;
    var user = that.data.user
    var imageList = that.data.user.thumb;
    var delimg = imageList[index];
    //console.log(delimg);
    wx.request({
      url: app.globalData.hostUrl + 'qiniu/delfile',
      data: { imgurl: delimg },
      method: 'post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        //console.log(res.data);
        if (res.data.code == 200) {
          imageList.splice(index, 1);
          user.thumb = imageList;
          that.setData({
            user: user,
          })
        } else {
          wx.showToast({
            title: res.data.errmsg,
            icon: 'none',
          })
        }
      }
    })
  },

  // 删除标签
  delTagHandle: function(e) {
    console.log(e);
    let that = this
    var id = e.target.dataset.id;
    let { user } = that.data
    wx.request({
      url: app.globalData.hostUrl + 'manager/tags_add',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: id,
        pid: app.siteInfo.pid,
      },
      success: function (res) {
        user.tagslist.splice(e.currentTarget.id, 1)
        that.setData({
          user
        })
      }
    })
    
  },

  // 添加标签input
  inputHandle: function (e) {
    let that = this
    that.setData({
      inputVal: e.detail.value
    })
  },

  // 添加标签
  saveTag: function (e) {
    let { inputVal, tagArr } = this.data
    var user = this.data.user;
    var that = this;
    if (inputVal){
      wx.request({
        url: app.globalData.hostUrl + 'manager/tags_add',
        method: "post",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          title: inputVal,
          pid: app.siteInfo.pid,
        },
        success: function (res) {
          let obj = {
            title: inputVal,
            num: 0,
            id:res.data
          }
          user.tagslist.push(obj)
          that.setData({
            user: user,
            addTagModel: false
          })
        }
      })
      
    }else{
      wx.showToast({
        title: '请输入自定义标签！',
        icon: 'none',
        duration: 2000
      })
    }
  },

  cancelTag: function (e) {
    this.setData({
      addTagModel:false
    })
  },
  showAddTag: function (e) {
    this.setData({
      addTagModel: true
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
  // onShareAppMessage: function () {

  // }
})