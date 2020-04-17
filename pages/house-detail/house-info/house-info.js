// pages/house-detail/house-info/house-info.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTap:0,
    typeList:[],
    buildInfo:{},
    content:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //https://anjian.vshop365.cn/home/default/roomList?type=%E9%AB%98%E5%B1%82
  onLoad: function (options) {
    let that = this;
    wx.showLoading({
      title: '请稍等',
    })
    wx.request({
      url: 'https://anjian.vshop365.cn/home/default/offerRoom',
      success:(res)=>{
        wx.hideLoading()
        console.log(res.data);
        let result = res.data;
        let anno = result.buildInfo.anno
        that.setData({
          typeList:result.typeList,
          buildInfo:result.buildInfo,
          content: anno.replace('<img', '<img style="display:block;width:100%;height:auto;"'),
        });
        //设置导航栏标题
        wx.setNavigationBarTitle({
          title: result.buildInfo.title,
        })
        //拉取每个项目的数据
        that.fetchData();
      }
    })
  },
  fetchData(){
    let that = this;
    let types = that.data.typeList;
    for(let i = 0;i<types.length;i++){
      that.fetch(i,types[i].name);
    }
  },
  fetch(i,name,page=1){
    let that = this;
    let url = `https://anjian.vshop365.cn/home/default/roomList?type=${name}&page=${page}`;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: url,
      success:(res)=>{
        let data = that.data.roomList||[];
        data[i] = res.data;
        that.setData({
          roomList:data
        })
      },fail(){},complete(){
        wx.hideLoading()
      }
    })
  },
  // 类型选择
  selectAreaType: function (e) {
    //console.log(e)
    var that = this;
    var currentTap = e.currentTarget.dataset.index;
    if (currentTap == that.data.currentTap) {
      return;
    }
    that.setData({
      currentTap: currentTap
    })
    console.log(that.data.currentTap);
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