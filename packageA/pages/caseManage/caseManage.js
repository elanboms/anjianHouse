// packageA/pages/caseManage/caseManage.js
import regeneratorRuntime from '../../../utils/runtime.js';
import { get } from '../../../utils/Helpers';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: '', //当前分类 'style'装修风格 'space'空间名称 'area'面积区间 'type'户型
    showSortItem: false,
    searchCondi: {}, // 搜索条件
    house_space_id: '', // 空间id
    house_area_id: '', // 面积id
    house_type_id: '', // 户型id
    cases: [], // 案例图库
    cate1_id: '', // 当前点击的一级分类id
    cate2_id: '',  // 当前点击二级分类id
    cate2_id_chosed: {}, // 当前选中的二级分类id
    cate1_id_chosed: '', // 当前选中的一级分类id
    selfDefineSettingDetail: {}, // 自定义活动设置资料
    page: 1,
  },

  onReachBottom: function () {
    this.setData({
      page: this.data.page + 1
    }, () => {
      this.getCasesList();
    })
  },
  // 选择分类
  sortHandle: function (e) {
    let { cate1_id } = this.data;
    var cateid = e.currentTarget.dataset.cateid;
    if (cate1_id == cateid) {
      this.setData({
        cate1_id: cateid,
        showSortItem: !this.data.showSortItem
      })
    } else {
      this.setData({
        cate1_id: cateid,
        showSortItem: true
      })
    }
  },
  /**
   * 处理选择1级分类全部
   */
  handleChoseCate1All(e) {
    let cate2_id = e.currentTarget.id
    let pid = e.currentTarget.dataset.pid;
    let { cate2_id_chosed } = this.data;
    cate2_id_chosed[pid] = "";
    this.setData({
      cate2_id,
      cate1_id_chosed: pid,
      cate2_id_chosed,
      page: 1
    }, () => {
      this.getCasesList(true);
    })
  },
  // 选择分类子选项
  sortItemHandle: function (e) {
    let cate2_id = e.currentTarget.id
    let pid = e.currentTarget.dataset.pid;
    let { cate2_id_chosed } = this.data;
    cate2_id_chosed[pid] = cate2_id;
    this.setData({
      cate2_id,
      cate2_id_chosed,
      cate1_id_chosed: '',
      page: 1
    }, () => {
      console.log(this.data.cate2_id_chosed)
      this.getCasesList(true);
    })
  },
  /**
   * 跳转至案例详情
   */
  toDetail: function (e) {
    wx.navigateTo({
      url: `/pages/house-detail/house-detail?id=${e.currentTarget.id}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    var _this = this;

    //await _this.getSearchCondi();
    // _this.getCasesList();
    _this.setData({
      current: 'style',
      showSortItem: true
    })
  },

  /**
   * 获取搜索条件
   */
  getSearchCondi: function () {
    var _this = this;
    return new Promise((resolve) => {
      wx.request({
        url: app.siteInfo.url + 'cases/searchCondi',
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          uid: app.siteInfo.uid,
          pid: app.siteInfo.pid,
          type: 'list'
        },
        success: function (res) {
          console.log(res.data);
          _this.setData({
            searchCondi: res.data
          }, () => { resolve(true); })
        },
        fail: function (e) {
          resolve(e.errMsg || '出错了')
        }
      })
    })
  },
  /**
   * 获取图库列表
   */
  getCasesList: function (refresh = false) {
    let { cate2_id_chosed, cate1_id_chosed, page } = this.data;
    var cate_id_arr = [];
    Object.keys(cate2_id_chosed).map(k => {
      if (Boolean(cate2_id_chosed[k])) cate_id_arr.push(cate2_id_chosed[k]);
    })
    var _this = this;
    return new Promise((resolve) => {
      let data = {
        uid: app.siteInfo.uid,
        pid: app.siteInfo.pid,
        //cate_ids: cate_id_arr,
        //cate_pids: cate1_id_chosed,
        page
      };
      console.log(data)
      wx.request({
        url: app.globalData.hostUrl + 'manager/casesList',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data,
        success: function (res) {
          if (refresh) {
            _this.setData({
              cases: res.data
            })
          } else {
            let cases = _this.data.cases;
            if (res.data.length > 0) cases.push(...res.data);
            _this.setData({
              cases
            })
          }
        },
        fail: function (e) {
          resolve(e.errMsg || '出错了')
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCasesList(true);
  },

  switchHandle: function (e) {
    let that = this
    let id = e.currentTarget.id
    wx.request({
      url: app.globalData.hostUrl + 'manager/chose_case',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        pid: app.siteInfo.pid,
        state: e.currentTarget.dataset.state == 1 ? '0' : '1',
        case_id: id
      },
      success: function (res) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
        that.getCasesList(true);
      },
      fail: function (e) {
        resolve(e.errMsg || '出错了')
      }
    })
  },
 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})