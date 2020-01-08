var app=getApp();
var userInfo;//存放用户信息
Page({
  onShow: function () {
    var that=this;
    userInfo=[]
    wx.cloud.callFunction({
      name:'selectUserInfo',
      data:{
        _id:app.globalData.userInfo['_id']
      },
      success:function(res){
        userInfo = res.result.data[0]['category'];
        console.log(userInfo)
        that.setData({
          userInfo
        })
      }
    })
  },

  
})