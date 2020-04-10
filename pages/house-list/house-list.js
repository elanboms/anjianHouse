// pages/house-list/house-list.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchText:'', //搜索内容
    selectArea: false,
    areaList: [ //区域
    ],
    selectPriceType:true, //默认总价
    selectPriceIdx:'', //选择价格
    priceList:[   //默认总价
     
    ],
    totalPriceList:[], //总价
    unitpriceList:[], //单价
    minPrice:'', //最低价
    maxPrice:'', //最高价
    typeList:[ //户型
    ],
    moreState:[{ //筛选
      moreStateTit:'面积',
      moreCard:[
        ]
    }, {
        moreStateTit: '房屋类型',
        moreCard: [
        ]
      }, {
        moreStateTit: '售卖状态',
        moreCard: [
        ]
    }],
    sortList: [ //排序
      { id: '001', sort: '默认排序', selected: true },
      { id: '002', sort: '单价由低到高', selected: false },
      { id: '003', sort: '单价由高到低', selected: false },
      { id: '004', sort: '开盘时间顺序', selected: false },
      { id: '005', sort: '开盘时间倒序', selected: false }
    ],

    area: {
      title: "区域",
      isTap:false,
    },
    price: {
      title: "价格",
      isTap: false,
    },
    type: {
      title: "户型",
      isTap: false,
    },
    more: {
      title: "筛选",
      isTap: false,
    },
     sort: {
      title: "",
      isTap: false,
    },
    houseList: [ //楼盘列表
    ],
    area_id: 0, //区域id
    totalPrice_id: 0, //总价id
    minTotalVal: '', //自定义总价最小值
    maxTotalVal: '', //自定义总价最大值
    unitPrice_id: 0, //单价id
    minUnitVal: '', //自定义单价最小值
    maxUnitVal: '', //自定义单价最大值
    houseType_id: 0, //户型id
    houseArea_id: 0, //面积id
    houseTypes_id:0 , //类型id
    status:0 , //售卖状态id
    keyword: '', //关键词
    saleCost: '', //单价 down/up
    open_time: '', //开盘时间 down/up
  },

  searchTap:function(e){ //搜索内容
    var that = this;
    var text = e.detail.value;
    that.setData({
      searchText: text
    })
    console.log(text)
    that.startSearch();

  },

  startSearch:function(){ //开始搜索
    var that = this;
    wx.showLoading({
      title: '搜索中',
    })
    wx.request({
      url: app.globalData.hostUrl + 'default/getBuild',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        keyword: that.data.searchText
      },
      success: (res) => {
        console.log(res)
        that.setData({
          houseList: res.data.build,
        })
        wx.hideLoading();
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },




  tapArea: function() { //点击区域
    var area = this.data.area;
    var price = this.data.price;
    var type = this.data.type;
    var sort = this.data.sort;
    var more = this.data.more;
    if (area.isTap == false) {
      area.isTap = true;
    } else {
      area.isTap = false;
    }
    price.isTap = false;
    type.isTap = false;
    sort.isTap = false;
    more.isTap = false;
    this.setData({
      area: area, 
      price: price,
      type: type,
      more: more,
      sort: sort,
    })
  },
  tapPrice: function() { //点击价格
    var area = this.data.area;
    var price = this.data.price;
    var type = this.data.type;
    var sort = this.data.sort;
    var more = this.data.more;
    if (price.isTap == false) {
      price.isTap = true;
    } else {
      price.isTap = false;
    }
    area.isTap = false;
    type.isTap = false;
    sort.isTap = false;
    more.isTap = false;
    this.setData({
      area: area,
      price: price,
      type: type,
      more: more,
      sort: sort,
    })
  },

  tapType: function() { //点击户型
    var area = this.data.area;
    var price = this.data.price;
    var type = this.data.type;
    var sort = this.data.sort;
    var more = this.data.more;
    if (type.isTap == false) {
      type.isTap = true;
    } else {
      type.isTap = false;
    }
    area.isTap = false;
    price.isTap = false;
    sort.isTap = false;
    more.isTap = false;
    this.setData({
      area: area,
      price: price,
      type: type,
      more: more,
      sort: sort,
    })
  },


  tapMore: function () { //点击筛选
    var area = this.data.area;
    var price = this.data.price;
    var type = this.data.type;
    var sort = this.data.sort;
    var more = this.data.more;
    if (more.isTap == false) {
      more.isTap = true;
    } else {
      more.isTap = false;
    }
    area.isTap = false;
    type.isTap = false;
    price.isTap = false;
    sort.isTap=false;
    this.setData({
      area: area,
      type: type,
      price: price,
      more: more,
      sort: sort,
    })
  },

  tapSort: function () { //点击排序
    var area = this.data.area;
    var price = this.data.price;
    var type = this.data.type;
    var more = this.data.more;
    var sort = this.data.sort;
    if (sort.isTap == false) {
      sort.isTap = true;
    } else {
      sort.isTap = false;
    }
    area.isTap = false;
    type.isTap = false;
    price.isTap = false;
    more.isTap=false;
    this.setData({
      area: area,
      type: type,
      price: price,
      more: more,
      sort: sort,
    })
  },

  // 区域中选择
  selectAreaTap: function(e) {
    console.log(e)
    var that = this;
    var areaIndex = e.currentTarget.dataset.idx
    var areaId = e.currentTarget.dataset.id
    console.log(areaIndex)
    that.setData({
      areaIndex: areaIndex,
      area_id: areaId,
    })
  },
  // 清空区域
  areaClear:function(){
    var that = this; 
    that.setData({
      areaIndex: 0,
      area_id:0
    })
  },
  
  // 确认选择区域
  areaConfirm:function(){
    var that = this;
    var area_id = that.data.area_id;
    wx.showLoading({
      title: '加载中',
    })
    console.log(area_id)
    wx.request({
      url: app.globalData.hostUrl + 'default/getBuild',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        area_id: area_id
      },
      success: (res) => {
        console.log(res)
        that.setData({
          houseList: res.data.build,
          'area.isTap':false,
        })
        wx.hideLoading();
      },
      fail: (err) => {
        console.log(err)
      }
    })
    

  },

  //总价&&单价
  priceTypeTap:function(e){
    let that = this;
    let type = e.currentTarget.dataset.type;
    if (type=='1'){  //总价
      that.setData({ 
        selectPriceIdx: 0,
        minPrice:'',
        maxPrice:'',
        priceList:that.data.totalPriceList,
        selectPriceType: true,
      })
    } else{ //单价
      that.setData({
        selectPriceIdx: 0,
        minPrice: '',
        maxPrice: '',
        priceList: that.data.unitpriceList,
        selectPriceType:false
      })
    }

  },

  //选择价格搜索
  selectPriceTap:function(e){
    let that = this;
    let selectPriceIdx = e.currentTarget.dataset.priceidx;
    let priceId = e.currentTarget.dataset.id;
    let totalPrice_id; //总价id
    let unitPrice_id; //单价id
    console.log(selectPriceIdx)
    console.log('价格类别==' + that.data.selectPriceType)
    console.log('priceId==' + priceId)
    if (that.data.selectPriceType==true){
      totalPrice_id = priceId;
      unitPrice_id = 0;
    
    }else{
      totalPrice_id = 0;
      unitPrice_id = priceId
    }
    console.log(totalPrice_id)
    console.log(unitPrice_id)
    that.setData({
      selectPriceIdx: selectPriceIdx,
    })
    wx.showLoading({
      title: '搜索中',
    })
    wx.request({
      url: app.globalData.hostUrl + 'default/getBuild',
      data: {
        totalPrice_id: totalPrice_id,
        unitPrice_id: unitPrice_id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        wx.hideLoading();
        that.setData({
          houseList: res.data.build,
          'price.isTap':false,
        })
      },
      fail: function(res) {
        wx.hideLoading();
        console.log(res)
      },
      complete: function(res) {},
    })
  },

  minPriceInputTap:function(e){ //输入最低价
     var that = this;
     that.setData({
       minPrice: e.detail.value
     })
    console.log('最低价==' + e.detail.value)
  },

  maxPriceInputTap: function (e) { //输入最高价
    var that = this;
    that.setData({
      maxPrice: e.detail.value
    })
    console.log('最高价==' + e.detail.value)
  },

  customPriceSearch:function(){  //自定义价格搜索
    var that = this;
    var selectPriceType = that.data.selectPriceType; //价格类型，true:总价
    var minPrice = that.data.minPrice;
    var maxPrice = that.data.maxPrice;
    var minTotalVal; //自定义总价最小值
    var maxTotalVal;
    var minUnitVal; //自定义单价最小值
    var maxUnitVal;
     
    console.log(minPrice)
    console.log(maxPrice)
    if (minPrice == '' && maxPrice == ''){
      wx.showToast({
        title: '价格不能为空！',
        icon:'none'
      })
      return;
    } else if ((minPrice == '' && maxPrice != '') || (minPrice != '' && maxPrice == '')){
      wx.showToast({
        title: '最低价和最高价必须同时填写！',
        icon: 'none'
      })
      return;
    } else if ( Number(minPrice) >= Number(maxPrice) ) {
      wx.showToast({
        title: '最低价必须低于最高价！',
        icon: 'none'
      })
      return;
    }else{

      if (selectPriceType){
        minTotalVal = minPrice;
        maxTotalVal = maxPrice;
        minUnitVal = 0;
        maxUnitVal = 0;
      } else {
        minTotalVal = 0;
        maxTotalVal = 0;
        minUnitVal = minPrice;
        maxUnitVal = maxPrice;
      }
      wx.showLoading({
        title: '搜索中',
      })
      wx.request({
        url: app.globalData.hostUrl + 'default/getBuild',
        data: {
          minTotalVal: minTotalVal,
          maxTotalVal: maxTotalVal,
          minUnitVal: minUnitVal,
          maxUnitVal: maxUnitVal,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          wx.hideLoading();
          that.setData({
            houseList: res.data.build,
            'price.isTap': false,
          })
        },
        fail: function (res) {
          wx.hideLoading();
          console.log(res)
        },
        complete: function (res) { },
      })

    }

  },


  // 选择户型
  selectTypeTap:function(e){
    console.log(e)
    var that = this;
    var typeIndex = e.currentTarget.dataset.idx
    var houseType_id = e.currentTarget.dataset.id; //户型id
    console.log(houseType_id)
    that.setData({
      typeIndex: typeIndex,
      houseType_id: houseType_id
    })
  },

  typeConfirm:function(){ //搜索户型
    var that = this;
    var houseType_id = that.data.houseType_id;
    wx.showLoading({
      title: '加载中',
    })
    console.log(houseType_id)
    wx.request({
      url: app.globalData.hostUrl + 'default/getBuild',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        houseType_id: houseType_id
      },
      success: (res) => {
        console.log(res)
        that.setData({
          houseList: res.data.build,
          'type.isTap': false,
        })
        wx.hideLoading();
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },


  //筛选类型
  selectMoreCard:function(e){
    var that = this;
    let { moreState } = that.data;
    let idx = e.currentTarget.dataset.idx;
    let idy = e.currentTarget.dataset.idy;
    (moreState[idx]['moreCard'] || []).map((v,k)=>{
      v['isChoose5'] = false;
      v['isChoose6'] = false;
      v['isChoose7'] = false;
    })
    console.log(moreState[idx]['moreCard'][idy]['id'])
    var houseArea_id = that.data.houseArea_id;
    var houseTypes_id = that.data.houseTypes_id
    var status = that.data.status ;
    if(idx==0){
      moreState[idx]['moreCard'][idy]['isChoose5'] = true;
      houseArea_id = moreState[idx]['moreCard'][idy]['id'];
      that.setData({
        houseArea_id: houseArea_id
      })
    }else if(idx==1){
      moreState[idx]['moreCard'][idy]['isChoose6'] = true;
      houseTypes_id = moreState[idx]['moreCard'][idy]['id'];
      that.setData({
        houseTypes_id: houseTypes_id
      })
    }else{
      moreState[idx]['moreCard'][idy]['isChoose7'] = true;
      status = moreState[idx]['moreCard'][idy]['id'];
      that.setData({
        status: status
      })
    }

    console.log('houseArea_id==' + that.data.houseArea_id)
    console.log('houseTypes_id==' + that.data.houseTypes_id)
    console.log('status==' + that.data.status)

    // moreState[idx]['moreCard'][idy]['selected'] = true
    // var idCardSelected = e.currentTarget.dataset.id
    that.setData({
      moreState
    })
  },

  moreStateConfirm:function(){ //筛选确定
    var that = this;
    var houseArea_id = that.data.houseArea_id;
    var houseTypes_id = that.data.houseTypes_id
    var status = that.data.status;
    wx.showLoading({
      title: '加载中',
    })
    console.log(houseArea_id)
    console.log(houseTypes_id)
    console.log(status)
    wx.request({
      url: app.globalData.hostUrl + 'default/getBuild',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        houseArea_id: houseArea_id,
        houseTypes_id: houseTypes_id,
        status: status,
      },
      success: (res) => {
        console.log(res)
        that.setData({
          houseList: res.data.build,
          'more.isTap': false,
        })
        wx.hideLoading();
      },
      fail: (err) => {
        wx.hideLoading();
        console.log(err)
      }
    })
  },

  moreStateClear:function(){ //筛选清空
    var that = this;
    var houseArea_id = that.data.moreState[0]['moreCard'][0]['id'];
    var houseTypes_id = that.data.moreState[1]['moreCard'][0]['id'];
    var status = that.data.moreState[2]['moreCard'][0]['id'];
    var {moreState} = that.data;

    (moreState[0]['moreCard'] || []).map((v, k) => {
      v['isChoose5'] = false;
    });
    (moreState[1]['moreCard'] || []).map((v, k) => {
      v['isChoose6'] = false;
    });
    (moreState[2]['moreCard'] || []).map((v, k) => {
      v['isChoose7'] = false;
    });
    that.data.moreState[0]['moreCard'][0]['isChoose5'] = true;
    that.data.moreState[1]['moreCard'][0]['isChoose6'] = true;
    that.data.moreState[2]['moreCard'][0]['isChoose7'] = true;

    that.setData({
      houseArea_id: houseArea_id,
      houseTypes_id: houseTypes_id,
      status: status,
      moreState: that.data.moreState
    })
  },

  // 选择排序模式
  selectSortTap: function (e) {
    console.log(e)
    var that = this;
    var sortIndex = e.currentTarget.dataset.idx
    var sortId = e.currentTarget.dataset.id
    console.log(sortIndex)
    console.log('sortId==' + sortId)
    var saleCost='up';
    var open_time='up';

    if (sortIndex == 0 ||sortIndex==2){
      saleCost='down';
      open_time='';
    } else if (sortIndex == 1 ){
      saleCost = 'up';
      open_time = '';
    } else if (sortIndex == 3) {
      saleCost = '';
      open_time = 'down';
    } else if (sortIndex == 4) {
      saleCost = '';
      open_time = 'up';
    }

    wx.showLoading({
      title: '搜索中',
    })
    wx.request({
      url: app.globalData.hostUrl + 'default/getBuild',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        saleCost,
        open_time,
      },
      success: (res) => {
        console.log(res)
        that.setData({
          sortIndex: sortIndex,
          houseList: res.data.build,
          'sort.isTap': false,
        })
        wx.hideLoading();
      },
      fail: (err) => {
        wx.hideLoading();
        console.log(err)
      }
    })

  },


  // 打开楼盘详情
  openHouseDetail: (e) => {
    console.log(e);
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../house-detail/house-detail?id=' + id,
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var searchText = options.searchText;
    that.setData({
      searchText,
    })
   
    that.getCondition(); //获取楼盘搜索条件
    that.getBuildList(); //获取楼盘列表

    if (options.searchCode == 1) { //首页跳转搜索
      that.startSearch();
    }
  },

  getCondition:function(){
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + 'default/getCondition',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {},
      success: (res) => {
        console.log(res)
        that.setData({
          areaList: res.data.chooseArea,
          priceList: res.data.chooseTotalPrice, //总价
          totalPriceList: res.data.chooseTotalPrice, //总价
          unitpriceList: res.data.chooseUnitPrice, //单价
          typeList: res.data.chooseProportion, //户型
          "moreState[0].moreCard": res.data.chooseYield,
          "moreState[1].moreCard": res.data.chooseTypes,
          "moreState[2].moreCard": res.data.chooseSale,
          // houseArea_id: that.data.moreState[0]['moreCard'][0]['id'],
          // houseTypes_id: that.data.moreState[1]['moreCard'][0]['id'],
          // status: that.data.moreState[2]['moreCard'][0]['id'],
        })

        var houseArea_id = that.data.moreState[0]['moreCard'][0]['id'];
        var houseTypes_id = that.data.moreState[1]['moreCard'][0]['id'];
        var status = that.data.moreState[2]['moreCard'][0]['id'];
        that.setData({
          houseArea_id,
          houseTypes_id,
          status,
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },

  getBuildList:function(){  //获取楼盘列表
    var that = this;
    var area_id = that.data.area_id;
    var totalPrice_id = that.data.totalPrice_id;
    var minTotalVal = that.data.minTotalVal;
    var maxTotalVal = that.data.maxTotalVal;
    var unitPrice_id = that.data.unitPrice_id;
    var minUnitVal = that.data.minUnitVal;
    var maxUnitVal = that.data.maxUnitVal;
    var houseType_id = that.data.houseType_id;
    var houseArea_id = that.data.houseArea_id;
    var houseTypes_id = that.data.houseTypes_id;
    var status = that.data.status;
    var keyword = that.data.keyword;
    var saleCost = that.data.saleCost;
    var open_time = that.data.open_time;
    wx.request({
      url: app.globalData.hostUrl + 'default/getBuild',
      method: 'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        area_id, totalPrice_id, minTotalVal, maxTotalVal, unitPrice_id, minUnitVal, maxUnitVal, houseType_id, houseArea_id, houseTypes_id, status, keyword, saleCost, open_time
      },
      success: (res) => {
        console.log(res)
        that.setData({
          houseList:res.data.build
        })
      },
      fail:(err)=>{
        console.log(err)
      }
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
  onShareAppMessage: function() {

  },

  /**
   * 防止弹出层蒙板触摸贯穿
   */
  preventTouchMove: function() {
  }
})