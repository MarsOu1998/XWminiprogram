var app=getApp();
var indexCategory=0;//设置默认证书类别
var indexName=0;//设置默认证书名称
var tempImg;//存放图片的FileID
var imgFlag=false;//判断用户是否已经上传头像
var gradeFlag=false;//判定用户是否已经输入成绩
var category;//存放用户的证书信息
var uploadCategory;//存放从数据库获取的信息
//存放证书类别、名称、学分
var categoryArray;
var computerArray;
var englishArray;
var occupationArray;
var patentArray;
var courseArray;
var journalArray;
var lectureArray;
var skillArray;
var computerCreditArray;
var englishCreditArray;
var occupationCreditArray;
var patentCreditArray;
var courseCreditArray;
var journalCreditArray;
var lectureCreditArray;
var skillCreditArray;
var check=0;//用户上传的证书信息都未经审核
var fraction;//用户输入的成绩
var uploadFlag=false;//是否已经上传证书资料

Page({
  data: {
    zhaopian: '点击上传证书图片',
    imgUrl: "",
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
    categoryArray=['计算机证书', '外语证书', '职业、岗位证书', '专利', '专业学科竞赛', '省级期刊发表专业类文章', '专业相关专题讲座', '校技能文化节'],
    computerArray=['三级国家计算机等级考试', '二级国家计算机等级考试', '1+X认证(初级)', '1+X认证(中级)', '1+X(高级)'],
    englishArray= ['全国英语等级考试六级', '全国英语等级考试四级', '全国英语等级考试三级(A级)', '全国英语等级考试B级'],
    occupationArray= ['软件资格程序员、ERP证书初级', '软件资格程序员、ERP证书中级', '软件资格程序员、ERP证书高级'],
    patentArray= ['外观设计专利', '实用新型专利', '发明专利'],
    courseArray= ['市级二类一等奖', '市级二类二等奖', '市级二类三等奖', '市级二类优秀奖', '省级二类一等奖', '省级二类二等奖', '省级二类三等奖', '省级二类优秀奖', '国家级二类一等奖', '国家级二类二等奖', '国家级二类三等奖', '国家级二类优秀奖',],
    journalArray= ['核心文章', '非核心文章'],
    lectureArray= ['一次'],
    skillArray= ['一等奖', '二等奖', '三等奖', '参与'],
    computerCreditArray=[1.5,1,2,3,5];
    englishCreditArray=[5,3,2,1],
    occupationCreditArray=[2,3,5],
    patentCreditArray=[2,3,5],
    courseCreditArray=[4,3,2,1,8,6,4,2,16,12,8,4],
    journalCreditArray=[5,2],
    lectureCreditArray=[0.2],
    skillCreditArray=[0.8,0.5,0.2,0.2]
    this.setData({
      indexCategory,
      categoryArray,
      computerArray,
      englishArray,
      occupationArray,
      patentArray,
      courseArray,
      journalArray,
      lectureArray, 
      skillArray
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
          title: '上传中',
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
              tempImg=res.fileID;
              imgFlag=true;
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
    gradeFlag=true;
  },
  onUnload:function(res){
        if(!uploadFlag){
          wx.cloud.deleteFile({
            fileList:[tempImg],
            success:function(res){
              console.log("已返回，删除已上传的证书")
            }
          })
        }
  },


  //添加数据
  addData:function(){
    uploadCategory=[];
    console.log(gradeFlag)
    if(!gradeFlag){
      wx.showToast({
        title: '尚未输入成绩',
        icon:'none'
      })
    }
    if(!imgFlag){
      wx.showToast({
        title: '尚未上传证书图片',
        icon: 'none'
      })
    }
    if(gradeFlag&&imgFlag)
      wx.showModal({
        title: '提示',
        content: '是否上传',
        success:function(res){
            if(indexCategory==0){
              category=[
                {category:categoryArray[0],
                name:computerArray[indexName],
                credit:computerCreditArray[indexName],
                fileID:tempImg,
                check: 0
                },
                
              ]
            }
              else if (indexCategory == 1) {
                category = [
                  {
                    category: categoryArray[1],
                    name: englishArray[indexName],
                    credit: englishCreditArray[indexName],
                    fileID: tempImg,
                    check: 0
                  },
                ]
              }
            else if (indexCategory == 2){
              category = [
                {
                  category: categoryArray[2],
                  name: occupationArray[indexName],
                  credit: occupationCreditArray[indexName],
                  fileID: tempImg,
                  check: 0
                },
              ]
             }
           else if(indexCategory == 3){
              category = [
                {
                  category: categoryArray[3],
                  name: patentArray[indexName],
                  credit: patentCreditArray[indexName],
                  fileID: tempImg,
                  check: 0
                },
              ]
              }
            else if (indexCategory == 4){
              category = [
                {
                  category: categoryArray[4],
                  name: courseArray[indexName],
                  credit: courseCreditArray[indexName],
                  fileID: tempImg,
                  check: 0
                },
              ]
            }
           else if(indexCategory == 5){
              category = [
                {
                  category: categoryArray[5],
                  name: journalArray[indexName],
                  credit: journalCreditArray[indexName],
                  fileID: tempImg,
                  check: 0
                },
              ]
             }
            else if (indexCategory == 6){
              category = [
                {
                  category: categoryArray[6],
                  name: lectureArray[indexName],
                  credit: lectureCreditArray[indexName],
                  fileID: tempImg,
                  check: 0
                },
              ]
             }
            else{
              category = [
                {
                  category: categoryArray[7],
                  name: skillArray[indexName],
                  credit: skillCreditArray[indexName],
                  fileID: tempImg,
                  check:0
                },
              ]
             }
             
          console.log(category)
          if (res.confirm) {
            wx.cloud.callFunction({
              name:'selectUserInfo',
              data:{
                _id:app.globalData.userInfo['_id']
              },
              success:function(res){
                console.log(res.result.data);
                if(res.result.data[0]['category']){
                  uploadCategory = res.result.data[0]['category']
                }
                uploadCategory.push(category);
                console.log(uploadCategory)
                wx.cloud.callFunction({
                  name: 'uploadInfo',
                  data: {
                    _id: app.globalData.userInfo['_id'],
                    category: uploadCategory
                  },
                  success:function(res){
                    console.log("上传成功")
                    uploadFlag=true;
                    wx.navigateBack({
                    })
                  }
                })
              }
            })
            
          }

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