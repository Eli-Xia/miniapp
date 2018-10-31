function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  // console.log(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')
  const now_day = new Date().getDate()
  let time = ''
  if (day == now_day) {
    time = [hour, minute].map(formatNumber).join(':')
  } else {
    time = [month, day].map(formatNumber).join('/')
  }
  return time
}

function getBase64(url) {
  //通过构造函数来创建的 img 实例，在赋予 src 值后就会立刻下载图片，相比 createElement() 创建 <img> 省去了 append()，也就避免了文档冗余和污染
  var Img = new Image(),
    dataURL = '';
  Img.src = url;
  Img.onload = function () { //要先确保图片完整获取到，这是个异步事件
    //创建canvas元素
    var canvas = document.createElement("canvas"),
      width = Img.width, //确保canvas的尺寸和图片一样
      height = Img.height;
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(Img, 0, 0, width, height); //将图片绘制到canvas中
    dataURL = canvas.toDataURL('image/jpeg'); //转换图片为dataURL
  };
  return dataURL;
}

export default {
  formatNumber,
  formatTime,
  getBase64
}