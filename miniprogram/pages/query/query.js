var app=getApp();
var userInfo;//存放用户信息
Page({
  onShow: function () {
    var that=this;
    userInfo=[]
    wx.cloud.callFunction({
      name:'selectUserInfo',
      data:{
        _id: "0511cba1-1fcf-4cfa-b6aa-0a33ec02926b"

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