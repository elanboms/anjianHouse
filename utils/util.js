const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function dateFormat(str) {
  var dateStr = "";
  var year = str.substr(0, 4);
  var month = str.substr(5, 2);
  var day = str.substr(8, 2)
  dateStr = year + "-" + month + "-" + day + "";
  return dateStr;
}

// ********获取年月日*********
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}
// *********获取半小时后的时间 (时：分)**********
const formatDetailTime = date => {
  var hour = date.getHours()
  var minute = date.getMinutes()
  if( minute < 30){
    minute = minute +30
  }else{
    minute = minute -30;
    hour = hour + 1;
  }
  if(hour == 23&&minute>=30){
    hour=23;
    minute=59;
  }
  return  [hour, minute].map(formatNumber).join(':')
}




function yearMonthFormat(str) {
  var dateStr = "";
  var year = str.substr(0, 4);
  var month = str.substr(5, 2);
  dateStr = year + "年" + month + "月";
  return dateStr;
}

var length = 60;

function countdown(that) {
  console.log('count down');
  var seconds = that.data.seconds;
  var captchaLabel = that.data.captchaLabel;
  if (seconds <= 1) {
    captchaLabel = '获取验证码';
    seconds = length;
    that.setData({
      captchaDisabled: false
    });
  } else {
    captchaLabel = --seconds + '秒后重发'
  }
  that.setData({
    // seconds: seconds,
    captchaLabel: captchaLabel
  });
}

function substr(fromStr) {
  var backStr = '0.00';
  if (typeof fromStr === 'undefined' || fromStr.length == 0 || fromStr == '') {
    return backStr;
  } else {
    var num = parseInt(fromStr * 100);
    backStr = num / 100;
    return backStr;
  }
}

module.exports = {
  formatTime: formatTime,
  yearMonthFormat: yearMonthFormat,
  dateFormat: dateFormat,
  countdown: countdown,
  length: length,
  substr: substr,
  formatDate: formatDate,
  formatDetailTime: formatDetailTime
}