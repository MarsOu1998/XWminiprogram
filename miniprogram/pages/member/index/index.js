var app=getApp();
var isLogin;//存放用户是否登陆的变量
Page({
  //当页面显示的时候立刻检测用户是否已经登陆
  onShow:function(){
    //console.log(app.globalData.isLogin)
    isLogin=app.globalData.isLogin;//从全局变量中判定用户是否已登陆
    //console.log(isLogin)
    this.setData({
      isLogin
    })
    },
    //跳转到登陆页面
  login:function(){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    },
  showCategories: function () {
    // wx.navigateTo({
    // 	url: "../login/login"
    // });
    wx.switchTab({
      url: "pages/login/login"
    });
  },
})