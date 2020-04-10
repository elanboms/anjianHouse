var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: ["商业贷款", "公积金贷款", "组合贷款"],
    navIndex: 0,  //贷款类型 --
    repayIndex: 0, //还款方式 0/1 --
    repayment: ['等额本息', '等额本金'],
    longYear: 30,
    yearList: [],
    inputValue1: '',//商业贷款金额 --
    inputValue2: '',//贷款年限
    inputValue22: 0,//贷款年限
    inputValue3: '',//商贷利率 --
    loanYears:'', //贷款年限 --
    inputValue4: '',//公积金贷款金额 --
    inputValue5: '',//公积金利率 --
    yearIndex: -1,//选择年限下标
    isMengShow: false,
    isMengYear: false,//选择年限弹窗
    isMengLoan: false,//选择商业贷款弹窗
    isMengLoan2: false,//选择公积金利率弹窗
    customLoanValue: 0,//商贷利率自定义
    customLoanValue2: 0,//公积金利率自定义
    loanIndex: -1,//选择商业贷款下标
    loanIndex2: -1,//选择公积金利率下标
    loanList: [],
    loanList2: [],
  },

  chooseNavIndex: function (e) {
    var that = this;
    var index = e.currentTarget.id;
    this.setData({
      navIndex: index,
    })
  },
  chooseRepayIndex: function (e) {  //选择还款方式
    var that = this;
    var index = e.currentTarget.id;
    that.setData({
      repayIndex: index,
    })
    console.log('还款方式：repayIndex==' + that.data.repayIndex)
  },
  chooseYearIndex: function (e) {
    var that = this;
    var index = e.currentTarget.id;
    var yearVal = that.data.yearList[index] + '年';
    this.setData({
      inputValue2: yearVal,
      inputValue22: that.data.yearList[index],
      yearIndex: index,
      isMengShow: false,
      isMengYear: false,
    })
  },
  chooseLoanIndex: function (e) {
    var that = this;
    var index = e.currentTarget.id;
    var loanVal = that.data.loanList[index].value;
    this.setData({
      loanIndex: index,
      inputValue3: loanVal,
      isMengLoan: false,
      isMengShow: false,

    })
  },
  chooseLoanIndex2: function (e) {
    var that = this;
    var index = e.currentTarget.id;
    var loanVal = that.data.loanList2[index].value;
    this.setData({
      loanIndex2: index,
      inputValue5: loanVal,
      isMengLoan2: false,
      isMengShow: false,

    })
  },
  chooseYear: function () {
    var that = this;
    this.setData({
      isMengShow: true,
      isMengYear: true,

    })
  },
  chooseLoan: function () {
    var that = this;
    this.setData({
      isMengShow: true,
      isMengLoan: true,

    })
  },
  chooseLoan2: function () {
    var that = this;
    this.setData({
      isMengShow: true,
      isMengLoan2: true,

    })
  },
  chooseCustom: function (e) {
    var that = this;
    // console.log(e.detail.value)
    this.setData({
      customLoanValue: e.detail.value,
    })
  },
  chooseCustom2: function (e) {
    var that = this;
    // console.log(e.detail.value)
    this.setData({
      customLoanValue2: e.detail.value,
    })
  },
  loanMoney: function (e) {  //商业贷款金额
    this.setData({
      inputValue1: e.detail.value,
    })
  },

  loanYears:function(e){ //贷款年限
    this.setData({
      loanYears: e.detail.value,
    })
  },

  loanMoney2: function (e) { //公积金贷款金额
    this.setData({
      inputValue4: e.detail.value,
    })
  },
  cancel: function () {
    var that = this;
    this.setData({
      isMengShow: false,
      isMengYear: false,
      isMengLoan: false,
      isMengLoan2: false,
    })
  },
  customSure: function () {
    var that = this;
    var reg = new RegExp(/^\d+(\.\d+)?$/);
    if (that.data.customLoanValue == "") {
      wx.showToast({
        title: '请输入利率',
        image: '/img/fail.png',
        duration: 1500
      });
    } else if (!reg.exec(that.data.customLoanValue)) {
      wx.showToast({
        title: '请输入数字',
        image: '/img/fail.png',
        duration: 1500
      });
    } else {
      this.setData({
        isMengShow: false,
        isMengYear: false,
        isMengLoan: false,
        loanIndex: -1,
        inputValue3: that.data.customLoanValue + '%',
      })
    }
  },
  customSure2: function () {
    var that = this;
    var reg = new RegExp(/^[0-9]*$/);
    if (that.data.customLoanValue2 == "") {
      wx.showToast({
        title: '请输入利率',
        image: '/img/fail.png',
        duration: 1500
      });
    } else if (!reg.exec(that.data.customLoanValue2)) {
      wx.showToast({
        title: '请输入数字',
        image: '/img/fail.png',
        duration: 1500
      });
    } else {
      this.setData({
        isMengShow: false,
        isMengYear: false,
        isMengLoan2: false,
        loanIndex2: -1,
        inputValue5: that.data.customLoanValue2 + '%',
      })
    }
  },
  cacNum: function () { //计算
    var that = this;
    wx.setStorageSync('daikuantype', that.data.navIndex); //贷款方式
    wx.setStorageSync('shopmoney', that.data.inputValue1); //商业贷款金额
    wx.setStorageSync('shopyear', that.data.loanYears);//贷款年限
    wx.setStorageSync('shoprate', that.data.inputValue3);//商贷利率
    wx.setStorageSync('fundmoney', that.data.inputValue4);//公积金贷款金额
    wx.setStorageSync('fundrate', that.data.inputValue5);//公积金利率
    wx.setStorageSync('huankuantype', that.data.repayIndex);//还款方式 0/1

    // var reg = new RegExp(/^[0-9]*$/);
    if (that.data.navIndex == 0) {
      if (that.data.inputValue1 == "" || that.data.loanYears == "" || that.data.inputValue3 == "") {
        if (that.data.inputValue1 == "") {
          wx.showToast({
            title: '请输入贷款额',
            duration: 1500
          });
        } else if (that.data.loanYears=='') {
          wx.showToast({
            title: '请输入贷款年限',
            duration: 1500
          });
        } else if (that.data.inputValue3 == "") {
          wx.showToast({
            title: '请选择商贷利率',
            duration: 1500
          });
        } 
        return;

      } else {
        wx.navigateTo({
          url: '/pages/calculator/calc-result/calc-result'
        })
      }
    } else if (that.data.navIndex == 1) {
      if (that.data.inputValue4 == "" || that.data.loanYears == "" || that.data.inputValue5 == "") {
        if (that.data.inputValue4 == "") {
          wx.showToast({
            title: '请输入贷款额',
            duration: 1500
          });
        } else if (that.data.loanYears=='') {
          wx.showToast({
            title: '请输入贷款年限',
            duration: 1500
          });
        } else if (that.data.inputValue5 == "") {
          wx.showToast({
            title: '请选择利率',
            duration: 1500
          });
        }
        return;

      } else {
        wx.navigateTo({
          url: '/pages/calculator/calc-result/calc-result'
        })
      }
    } else {
      if (that.data.inputValue1 == "" || that.data.inputValue4 == "" || that.data.loanYears == "" || that.data.inputValue3 == "" || that.data.inputValue5 == "") {
        if (that.data.inputValue1 == "") {
          wx.showToast({
            title: '请输入贷款额',
            duration: 1500
          });
        } else if (that.data.inputValue4 == "") {
          wx.showToast({
            title: '请输入贷款额',
            duration: 1500
          });
        } else if (that.data.loanYears == "") {
          wx.showToast({
            title: '请选择年限',
            duration: 1500
          });
        } else if (that.data.inputValue3 == "" || that.data.inputValue5 == "") {
          wx.showToast({
            title: '请选择利率',
            duration: 1500
          });
        }
      } else {
        wx.navigateTo({
          url: '/pages/calculator/calc-result/calc-result'
        })
      }
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // var yearList = [];
    // for (var i = 1; i <= that.data.longYear; i++) {
    //   yearList.push(i);
    // }
    // this.setData({
    //   yearList: yearList
    // })

    //获取利率
    wx.request({
      url: app.globalData.hostUrl + 'calculator/latestRate',
      data: {},
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          loanList: res.data.loanList,
          loanList2: res.data.loanList2,
        });
      },
    })
  },

  bindLoanListChange:function(e){ //选择商业贷款商贷利率
    var that = this;
    console.log(e.detail.value)
    that.setData({
      loanListIdx: e.detail.value,
      inputValue3: that.data.loanList[e.detail.value].value
    })
  },

  bindLoanList2Change: function (e) {//选择公积金贷款公积金利率
    var that = this;
    console.log(e.detail.value)
    that.setData({
      loanList2Idx: e.detail.value,
      inputValue5: that.data.loanList2[e.detail.value].value
    })
  },

  inputValue3Tap:function(e){ //商贷利率
    var that = this;
    that.setData({
      inputValue3: e.detail.value
    })
    console.log('inputValue3==' + that.data.inputValue3)
  },

  inputValue5Tap: function (e) { //商贷利率
    var that = this;
    that.setData({
      inputValue5: e.detail.value
    })
    console.log('inputValue5==' + that.data.inputValue5)

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