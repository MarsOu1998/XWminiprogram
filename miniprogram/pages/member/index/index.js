var app=getApp();
var isLogin;//存放用户是否登陆的变量
var userInfo;//存放用户信息
Page({
  //当页面显示的时候立刻检测用户是否已经登陆
  onShow:function(){
    //console.log(app.globalData.isLogin)
    isLogin=app.globalData.isLogin;
    //如果已经登陆则在前端显示用户信息
    if(isLogin){
      userInfo=app.globalData.userInfo;
    }
    this.setData({
      isLogin,
      userInfo
    })
    },
    //跳转到登陆页面
  login:function(){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    },
  showCategories: function () {
    wx.switchTab({
      url: "pages/login/login"
    });
  },
})