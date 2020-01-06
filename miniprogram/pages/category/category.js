var indexCategory=0;//设置默认证书类别
var indexName=0;//设置默认证书名称
Page({
  data: {
    zhaopian: '点击上传证书图片',
    imgUrl: "",
    categoryArray: ['计算机证书', '外语证书', '职业、岗位证书', '专利','专业学科竞赛','省级期刊发表专业类文章','专业相关专题讲座','校技能文化节'],
    computerArray: ['三级国家计算机等级考试','二级国家计算机等级考试','1+X认证(初级)','1+X认证(中级)','1+X(高级)'],
    englishArray: ['全国英语等级考试四级', '全国英语等级考试六级', '全国英语等级考试三级(A级)', '全国英语等级考试B级'],
    occupationArray: ['软件资格程序员、ERP证书初级', '软件资格程序员、ERP证书中级', '软件资格程序员、ERP证书高级'],
    patentArray:['外观设计专利','实用新型专利','发明专利'],
    courseArray: ['市级二类一等奖', '市级二类二等奖', '市级二类三等奖', '市级二类优秀奖', '省级二类一等奖', '省级二类二等奖', '省级二类三等奖', '省级二类优秀奖', '国家级二类一等奖', '国家级二类二等奖', '国家级二类三等奖', '国家级二类优秀奖', ],
    journalArray: ['核心文章', '非核心文章'],
    lectureArray:['一次'],
    skillArray:['一等奖','二等奖','三等奖','参与']

  },
    

  //修改证书类别
  certificationCategory:function(event){
    indexName=0;//每次修改证书类别时重置证书名字
    indexCategory = event.detail.value;
    this.setData({
      indexCategory,
      indexName
    })
  },
  //修改证书名称
  certificationName: function (event) {
    indexName = event.detail.value;
    this.setData({
      indexName
    })
  },
  onShow:function(){
    this.setData({
      indexCategory
    })
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