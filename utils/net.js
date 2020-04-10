function request(url, params, success, fail) {
  this.requestLoading(url, params, "", method , success, fail)
}
// 展示进度条的网络请求
// url:网络请求的url
// params:请求参数
// message:进度条的提示信息
// method: GET || POST
// success:成功的回调函数
// fail：失败的回调
function requestLoading(url, token, params, message, method, success, fail, complete) {
  wx.showNavigationBarLoading()
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  wx.request({
    url: url,
    data: params,
    header: {
      //'Content-Type': 'application/json'
      'content-type': 'application/x-www-form-urlencoded',
      'token': token,
    },
    method: method,
    success: function (res) {
      // console.log(res)
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      if (res.statusCode == 200) {
        success(res.data)
      } else {
        fail(res.data)
      }

    },
    fail: function (res) {
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      fail(res.data)
    },
    complete: function (res) {
      complete(res.data)
    },
  })
}
module.exports = {
  request: request,
  requestLoading: requestLoading
}