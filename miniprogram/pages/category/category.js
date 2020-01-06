Page({
  data: {
    zhaopian: '点击上传证书图片',
    imgUrl: "",
  },

  //上传图片
  chuantupian() {
    wx.cloud.init({
      traceUser: true,
    })
    let that = this;
    let timestamp = (new Date()).valueOf();
    wx.chooseImage({
      success: chooseResult => {
        wx.showLoading({
          title: '上传中。。。',
        })
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: timestamp + '.png',
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
          // 成功回调
          success: res => {
            console.log('上传成功', res)
            wx.hideLoading()
            wx.showToast({
              title: '上传图片成功',
            })
            if (res.fileID) {
              that.setData({
                zhaopian: '图片如下',
                imgUrl: res.fileID
              })
            }

          },
        })
      },
    })
  },
  //获取用户输入的名字
  addName(event) {
    name = event.detail.value
  },
  //获取用户输入的成绩
  addFraction(event) {
    fraction = event.detail.value
  },


  //添加数据
  addData() {
    DB.add({
      data: {
        name: name,
        fraction: fraction
      },
      success(res) {
        console.log("添加成功", res)
      },
      fail(res) {
        console.log("添加失败", res)
      }
    })
  },

  //查询数据
  getData() {
    DB.get({
      success(res) {
        console.log("查询数据成功", res)
      }
    })
  }
})