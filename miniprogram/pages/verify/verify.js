var app=getApp();
var userInfo;//存放用户信息
var count;//统计共有多少学生信息需要审核
Page({
 
  onShow:function(){
    var that=this;
    wx.cloud.callFunction({
      name:'countUncheckInfo',
      data:{},
      success:function(res){
        console.log(res)
        count=res.result.total
        that.setData({
          count
        })
      }
    })
  }
})