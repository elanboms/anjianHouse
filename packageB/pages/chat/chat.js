// pages//chat/chat.js     
var app = getApp();
var socketOpen = false;
var frameBuffer_Data, session, SocketTask;
var url = 'wss://anjian.vshop365.cn/wss:8092';
//var socketUrl = 'https://anjian.vshop365.cn:8092';
Page({
  reconnectTime: 4,
  lockReconnect: false,
  limit: 0,
  unlogin: true,
  ipt_text: "",
  m_userimg: "",
  msgContent: "",
  motto: 'Hello World',
  userInfo: {},
  audio: true,
  msgs: [],
  /**
   * 页面的初始数据 
   */
  data: {
    manualDisconnectSocket: false, // 是否是手动管理socket连接
    reconnectTime: 4,
    news: [
      // 消息模板分类：
      // template:0   第一次进入消息页时展示的欢迎语
      // template:1   由产品页进入时发送的产品信息
      // template:2   发送的文字消息
      // send:0       我发送的
      // send:1       别人发送的 
      {
        list: [
          {
            template: 0,
            send: 1,
            userImg: '',
            text: '你好，欢迎进入我的名片，有什么可以帮你的吗？',
            phone: 123,
          }
        ],
      },

    ],
    emojiChar: "☺-😋-😌-😍-😏-😜-😝-😞-😔-😪-😭-😁-😂-😃-😅-😆-👿-😒-😓-😔-😏-😖-😘-😚-😒-😡-😢-😣-😤-😢-😨-😳-😵-😷-😸-😻-😼-😽-😾-😿-🙊-🙋-🙏-✈-🚇-🚃-🚌-🍄-🍅-🍆-🍇-🍈-🍉-🍑-🍒-🍓-🐔-🐶-🐷-👦-👧-👱-👩-👰-👨-👲-👳-💃-💄-💅-💆-💇-🌹-💑-💓-💘-🚲",
    //0x1f---
    emoji: [
      "60a", "60b", "60c", "60d", "60f",
      "61b", "61d", "61e", "61f",
      "62a", "62c", "62e",
      "602", "603", "605", "606", "608",
      "612", "613", "614", "615", "616", "618", "619", "620", "621", "623", "624", "625", "627", "629", "633", "635", "637",
      "63a", "63b", "63c", "63d", "63e", "63f",
      "64a", "64b", "64f", "681",
      "68a", "68b", "68c",
      "344", "345", "346", "347", "348", "349", "351", "352", "353",
      "414", "415", "416",
      "466", "467", "468", "469", "470", "471", "472", "473",
      "483", "484", "485", "486", "487", "490", "491", "493", "498", "6b4"
    ],
    emojis: [],//qq、微信原始表情
    emojiShow: false,
    current: 0,
    timeout: 10000,
    timeoutObj: null,
    serverTimeoutObj: null,
  },
  redirectTo: function (e) {
    var path = e.currentTarget.dataset.path
    wx.redirectTo({
      url: path,
    })
  },
  //事件处理函数 
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  clearInput: function () {
    this.setData({
      ipt_text: ""
    })
  },
  msginput: function (e) {
    this.setData({
      ipt_text: e.detail.value
    })
  },
  sendmsg: function (e) {
    var formid = e.detail.formId;
    console.log(formid);
    var that = this;
    var a = this.data.ipt_text
    if (null == a || null == a || "" == a) return wx.showToast({
      title: "内容不能为空",
      icon: "none"
    }), !1;
    that.setData({
      ipt_text: '',
    })
    var msg = {
      "uid": app.siteInfo.uid,
      "pid": app.siteInfo.pid,
      "sendid": app.siteInfo.uid,
      "receiveid": that.data.card_userid,
      "log_type": 1,
      "flag": 1,
      "content": a,
      "formid": formid,
      "openid": that.data.openid,
      "headimg": that.data.headimg,
    };
    that.sendSocketMessage(msg)
  },
  formSubmit: function (e) {
    console.log(e.detail.formId);
    var that = this;
    var formid = e.detail.formId;
    wx.request({
      url: app.globalData.hostUrl + 'index/addformid',
      method: "post",
      data: {
        openid: that.data.openid,
        formid: formid,
      },
      success: function (res) {

      }
    })
  },
  scrollTop: function () {
    var that = this;
    var chat_list = that.data.chat_list;
    if (chat_list) {
      var chat_listLen = chat_list.length;
    } else {
      var chat_listLen = 1;
    }

    var scrolltop = chat_listLen * 300;
    that.setData({
      scrolltop: scrolltop,
    })
  },

  //文本域失去焦点时 事件处理
  textAreaBlur: function (e) {
    //获取此时文本域值
    if (this.data.emojiShow) {
      var height = 200
    } else {
      var height = 0
    }
    this.setData({
      ipt_text: e.detail.value,
      height: height,
    })
  },
  //文本域获得焦点事件处理
  textAreaFocus: function (e) {
    let heightVal = e ? e.detail.height : 0;
    var that = this;
    if (that.data.emojiShow) {
      that.setData({
        emojiShow: false,
        height: 0,
      })
      setTimeout(function () {
        that.textAreaFocus();
      }, 100)
    } else {
      let height = 0;
      let height_02 = 0;
      wx.getSystemInfo({
        success: function (res) {
          height_02 = res.windowHeight;
        }
      })
      height = heightVal - (app.globalData.height_01 - height_02);
      that.setData({
        height: height,
      })
    }

  },
  //点击表情显示隐藏表情盒子
  emojiShowHide: function () {
    var emojiShow = !this.data.emojiShow;
    if (emojiShow) {
      var height = 200
    } else {
      var height = 0
    }
    this.setData({
      emojiShow: emojiShow,
      height: height,
    })
  },
  //解决滑动穿透问题
  emojiScroll: function (e) {
    console.log(e)
  },
  //表情选择
  emojiChoose: function (e) {
    var that = this;
    //当前输入内容和表情合并
    if (that.data.ipt_text && that.data.ipt_text != undefined) {
      var content = that.data.ipt_text + e.currentTarget.dataset.emoji
    } else {
      var content = e.currentTarget.dataset.emoji
    }
    that.setData({
      ipt_text: content
    })
  },
  previewImg: function (e) {
    var that = this;
    var imgSrc = e.currentTarget.dataset.src;
    var url = [];
    url[0] = imgSrc;
    wx.previewImage({
      current: imgSrc,
      urls: url,
    })
  },
  /**
   * 生命周期函数--监听页面加载 
   */
  onGotUserInfo: function () {
    app.onGotUserInfo();
    this.setData({
      unlogin: false
    })
  },
  onUnload: function () {
    var that = this
    wx.onSocketClose(function (close) {
      console.log('关闭 WebSocket 连接。', close)
      socketOpen = false;
      that.reconnect()
    })
  },
  onLoad: function (options) {
    var that = this;

    that.setData({
      openid: wx.getStorageSync('openid'),  //用户openid
    })

    var em = {}, emChar = that.data.emojiChar.split("-");
    var emojis = []
    that.data.emoji.forEach(function (v, i) {
      em = {
        char: emChar[i],
        emoji: "0x1f" + v
      };
      emojis.push(em)
    });
    that.setData({
      emojis: emojis
    })

  },
  //关闭重连
  reconnect() {
    if (this.lockReconnect) return;
    this.lockReconnect = true;
    clearTimeout(this.timer)
    if (this.data.limit < 12) {
      this.timer = setTimeout(() => {
        this.webSocket();
        this.lockReconnect = false;
      }, 5000);
      this.setData({
        limit: this.data.limit + 1
      })
    }
  },
  //心跳包开始
  reset: function () {
    var that = this;
    clearTimeout(that.data.timeoutObj);
    clearTimeout(that.data.serverTimeoutObj);
    return that;
  },
  start: function () {
    var that = this;
    that.data.timeoutObj = setTimeout(() => {
      console.log("发送ping");
      if (socketOpen) {
        // 如果打开了socket就发送数据给服务器
        wx.sendSocketMessage({
          data: app.siteInfo.uid + "_ping",
          // success(){
          //   console.log("发送ping成功");
          // }
        });
      }
      that.data.serverTimeoutObj = setTimeout(() => {
        wx.closeSocket();
      }, that.data.timeout);
    }, that.data.timeout);
  },
  //心跳包结束
  //开启websocket
  socketStart: function () {
    var that = this;
    wx.onSocketOpen(res => {
      socketOpen = true;
      console.log('监听 WebSocket 连接打开事件。', res);
      var msg = {
        "uid": app.siteInfo.uid,
        "pid": app.siteInfo.pid,
        "sendid": app.siteInfo.uid,
        "receiveid": that.data.card_userid,
        "log_type": 1,
        "flag": 1,
        "content": '你好',
      };
      that.sendSocketMessage(msg, 1)
      that.reset()
      that.start()
    })
    wx.onSocketClose(onClose => {
      console.log('监听 WebSocket 连接关闭事件。', onClose);
      socketOpen = false;
      that.reconnect()
    })
    wx.onSocketError(onError => {
      console.log('监听 WebSocket 错误。错误信息', onError);
      socketOpen = false;
      that.reconnect()
    })
    wx.onSocketMessage(onMessage => {
      if (onMessage.data == "pong") {
        console.log(onMessage.data)
        that.reset()
        that.start()
      } else {
        console.log('监听WebSocket接受到服务器的消息事件。服务器返回的消息', JSON.parse(onMessage.data))
        var onMessage_data = JSON.parse(onMessage.data)
        //if (!onMessage_data.heartcontent) {
        var chat_list = that.data.chat_list
        if (!chat_list) {
          chat_list = [];
        }
        console.log(chat_list)
        chat_list.push(onMessage_data)
        that.setData({
          chat_list: chat_list || [],
        })
        console.log(chat_list)
        that.scrollTop();
        //}
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    //连接websocket
    if (!socketOpen) {
      that.webSocket()
    }

    wx.showLoading({
      title: '加载中',
      icon: 'loading'
    })

    //获取初始聊天信息
    wx.request({
      url: app.globalData.hostUrl + 'chat/chat',
      method: "get",
      data: {
        uid: app.siteInfo.uid,
        pid: app.siteInfo.pid,
      },
      success: function (res) {
        that.setData({
          logoimg: res.data.one_card.logo,
          m_userimg: res.data.one_card.logo,
          card_userid: res.data.one_card.userid,
          headimg: res.data.one_user.avatarUrl,
          chat_list: res.data.chat_list || [],
        })
        //清空未读消息
        wx.request({
          url: app.globalData.hostUrl + "chat/clearMsg",
          data: { 'receiveid': app.siteInfo.uid, 'sendid': that.data.card_userid },
          method: 'post',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (data) {
          }
        })
        that.scrollTop();
        wx.hideLoading()
      }
    })

    that.scrollTop();
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  // onHide: function () {

  // },

  /**
   * 生命周期函数--监听页面卸载
   */
  onHide: function () {
    var that = this;
    wx.onSocketClose(function (close) {
      console.log('关闭 WebSocket 连接。', close)
      socketOpen = false;
      that.reconnect()
    })
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

  // },
  //上传图片
  uploadImage: function () {
    var that = this;

    wx.chooseImage({
      count: 1,  //最多可以选择的图片总数
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        //启动上传等待中...
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })

        wx.uploadFile({
          url: app.globalData.hostUrl + 'qiniu/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
          },
          header: {
            "Content-Type": "multipart/form-data"
          },
          success: function (res) {
            wx.hideToast();
            //console.log(res);
            var data = JSON.parse(res.data);
            //console.log(data);
            if (data.error == 0) {
              var msg = {
                "uid": app.siteInfo.uid,
                "pid": app.siteInfo.pid,
                "sendid": app.siteInfo.uid,
                "receiveid": that.data.card_userid,
                "log_type": 2,
                "flag": 1,
                "filename": data.url,
                "formid": "",
                "openid": that.data.openid,
                "headimg": that.data.headimg,
              };
              that.sendSocketMessage(msg)
            } else {
              wx.showModal({
                title: '错误提示',
                content: data.message,
                showCancel: false,
                success: function (res) { }
              })
            }
          },
          fail: function (res) {
            wx.hideToast();
            wx.showModal({
              title: '错误提示',
              content: '上传图片失败',
              showCancel: false,
              success: function (res) { }
            })
          }
        });
      }
    });
  },
  // 创建socket
  webSocket: function () {
    var that = this;
    // 创建Socket
    SocketTask = wx.connectSocket({
      url: url,
      data: 'data',
      header: {
        'content-type': 'application/json'
      },
      method: 'get',
      success: function (res) {
        console.log('WebSocket连接创建', res)
        that.socketStart();
      },
      fail: function (err) {
        wx.showToast({
          title: '网络异常！',
        })
        console.log(err)
      },
    })
  },

  //通过 WebSocket 连接发送数据，需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送。
  sendSocketMessage: function (msg, isSend = 0) {
    var that = this;
    //console.log('通过 WebSocket 连接发送数据', JSON.stringify(msg))
    wx.showLoading({
      title: '加载中',
      icon: "loading"
    })
    //保存消息
    if (isSend == 0) {
      wx.request({
        url: app.globalData.hostUrl + "chat/save_msg",
        data: msg,
        method: "post",
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          wx.hideLoading()
          var chat_list = that.data.chat_list
          var ipt_text = that.data.ipt_text
          if (msg.log_type == 1) {  //文本
            var t = {
              uid: app.siteInfo.uid,
              pid: app.siteInfo.pid,
              headimg: that.data.headimg,
              content: msg.content,
              flag: msg.flag,
              log_type: msg.log_type,
            }
          } else if (msg.log_type == 2) {   //文件
            var t = {
              uid: app.siteInfo.uid,
              pid: app.siteInfo.pid,
              headimg: that.data.headimg,
              filename: msg.filename,
              flag: msg.flag,
              log_type: msg.log_type,
            }
          }
          if (!chat_list) {
            chat_list = [];
          }
          chat_list.push(t)
          that.setData({
            chat_list: chat_list || [],
            ipt_text: ""
          })
          // console.log(res)
          if (socketOpen) {
            // 如果打开了socket就发送数据给服务器
            wx.sendSocketMessage({
              data: JSON.stringify(msg),
              success: function (res) {
                //console.log('已发送', res)
              },
              fail: function () {

              }
            })
          }
          that.scrollTop();
        },
        error: function (res) {
          wx.showModal({
            content: '发送失败',
            showCancel: !1
          });
        }
      });
    } else if (isSend == 1) {
      //打开socket连接时重置服务器连接人的身份id，防止第一条消息发不出去
      if (socketOpen) {
        // 如果打开了socket就发送数据给服务器
        wx.sendSocketMessage({
          data: JSON.stringify(msg),
          success: function (res) {
            console.log('已发送', res)
            wx.hideLoading()
          },
          fail: function () {

          }
        })
      }
    }
  },
})