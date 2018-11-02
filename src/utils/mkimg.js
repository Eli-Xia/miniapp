const mkimg = {}

mkimg.getAvaterInfo = function (cardInfo) { //cardInfo是传入的信息参数，按实际需要。
  wx.showLoading({ title: '生成中...', mask: true, });
  var that = this;
  if (cardInfo.CardInfo.Avater) {
    wx.downloadFile({
      url: cardInfo.CardInfo.Avater,
      success: function (res) {

        wx.hideLoading();
        if (res.statusCode === 200) {
          var avaterSrc = res.tempFilePath;
          console.log(res)
          that.getQrCode(avaterSrc, cardInfo);
        } else {
          wx.showToast({
            title: '头像下载失败！',
            icon: 'none',
            duration: 2000,
            success: function () {
              that.getQrCode(avaterSrc = "", cardInfo); //回调另一个图片下载
            }
          })
        }
      },
      fail(e) {
        console.log(e)
      }
    })
  } else {
    console.log("没下载到图像")
    wx.hideLoading();
    that.getQrCode(avaterSrc = "", cardInfo); //回调另一个图片下载
  }
}

mkimg.getQrCode = function (avaterSrc, cardInfo) {
  wx.showLoading({ title: '生成中二维码', mask: true, });
  var that = this;
  if (cardInfo.CardInfo.QrCode) {
    wx.downloadFile({
      url: cardInfo.CardInfo.QrCode,
      success: function (res) {
        wx.hideLoading();
        if (res.statusCode === 200) {
          var codeSrc = res.tempFilePath;
          console.log('二维码下载完成')
          that.sharePosteCanvas(cardInfo, avaterSrc, codeSrc); //真正的绘图方法
        } else {
          wx.showToast({
            title: '二维码下载失败！',
            icon: 'none',
            duration: 2000,
            success: function () {
              var codeSrc = "";
              that.sharePosteCanvas(cardInfo, avaterSrc, codeSrc); //真正的绘图方法
            },
            fail(e) {
              console.log(e)
            }
          })
        }
      }
    })
  } else {
    wx.hideLoading();
    var codeSrc = "";
    that.sharePosteCanvas(cardInfo, avaterSrc, codeSrc); //真正的绘图方法
  }
}

mkimg.sharePosteCanvas = function (cardInfo, avaterSrc, codeSrc) {
  wx.showLoading({
    title: '生成中海报.',
    mask: true,
  })
  var that = this;
  let ctx = wx.createCanvasContext('myCanvas');
  var width = "";

  var height = 500
  console.log('获取到高度')
  width = 500 * 0.8;
  var left = 100 + 5;
  ctx.setFillStyle('#fff');
  ctx.fillRect(0, 0, 500, height);

  //头像
  if (avaterSrc) {
    console.log('设置头像')
    ctx.drawImage(avaterSrc, left, 20, width, width);
    ctx.setFontSize(14);
    ctx.setFillStyle('#fff');
    ctx.setTextAlign('left');
  }

  if (cardInfo.TagList.length > 0) {
    ctx.fillText(cardInfo.TagList[0].TagName, left + 20, width - 4); //标签
    const metrics = ctx.measureText(cardInfo.TagList[0].TagName); //测量文本信息
    ctx.stroke();
    //   ctx.rect(left + 10, width - 20, metrics.width + 40, 25);
    ctx.setFillStyle('rgba(255,255,255,0.4)');
    ctx.fill();
  }

  if (cardInfo.CardInfo.Name) {
    ctx.setFontSize(14);
    ctx.setFillStyle('#000');
    ctx.setTextAlign('left');
    ctx.fillText(cardInfo.CardInfo.Name, left, width + 60); //姓名
  }

  //  绘制二维码cardInfo.CardInfo.QrCode
  if (codeSrc) {
    console.log('设置二维码')
    ctx.drawImage(codeSrc, left + 150, width + 40, width / 3, width / 3)
    ctx.setFontSize(10);
    ctx.setFillStyle('#000');
    ctx.setTextAlign('right');
    ctx.fillText("微信扫码或长按识别", left + 235, width + 150);
  }

  ctx.draw(false, () => {
    // mkimg.saveShareImg()
    wx.hideLoading();
  })




}


mkimg.textByteLength = function (text, num) { // text为传入的文本  num为单行显示的字节长度
  let strLength = 0; // text byte length
  let rows = 1;
  let str = 0;
  let arr = [];
  for (let j = 0; j < text.length; j++) {
    if (text.charCodeAt(j) > 255) {
      strLength += 2;
      if (strLength > rows * num) {
        strLength++;
        arr.push(text.slice(str, j));
        str = j;
        rows++;
      }
    } else {
      strLength++;
      if (strLength > rows * num) {
        arr.push(text.slice(str, j));
        str = j;
        rows++;
      }
    }
  }
  arr.push(text.slice(str, text.length));
  return [strLength, arr, rows] //  [处理文字的总字节长度，每行显示内容的数组，行数]
}

mkimg.saveShareImg = function () {

  const that = this;
  wx.showLoading({
    title: '正在保存',
    mask: true,
  })

  wx.canvasToTempFilePath({
    canvasId: 'myCanvas',
    success: function (res) {
      console.log('保存图片中')
      wx.hideLoading();
      var tempFilePath = res.tempFilePath;
      wx.saveImageToPhotosAlbum({
        filePath: tempFilePath,
        success(res) {
          wx.showModal({
            content: '图片已保存到相册，赶紧晒一下吧~',
            showCancel: false,
            confirmText: '好的',
            confirmColor: '#333',
            success: function (res) {
              if (res.confirm) {}
            },
            fail: function (res) {
              console.log(res)
            }
          })
        },
        fail: function (res) {
          console.log(res)
          wx.showToast({
            title: res.errMsg,
            icon: 'none',
            duration: 2000
          })
        }
      })
    },
    fail(res) {
      console.log(res)
    }
  });

}

export default mkimg