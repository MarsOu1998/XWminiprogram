var app=getApp();
var isLogin=false;//存放用户是否登陆的变量
var userInfo=[];//存放用户信息
var administrator=false;//判定是否为管理员
Page({
  //当页面显示的时候立刻检测用户是否已经登陆
  onShow:function(){
    userInfo=[];
    //console.log(app.globalData.isLogin)
    isLogin=app.globalData.isLogin;
    //如果已经登陆则在前端显示用户信息
    if(isLogin){
      userInfo=app.globalData.userInfo;
      if (app.globalData.userInfo['administrator']){
        administrator=true;
      }
    }
    this.setData({
      isLogin,
      userInfo,
      administrator
    })
    },
    //跳转到登陆页面
  login:function(){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    },
  logout:function(){
    var that=this;
    wx.showModal({
      title: '提示',
      content: '是否退出账号',
      success:function(res){
        if(res.confirm){
          app.globalData.isLogin = false;
          isLogin = false;
          wx.showToast({
            title: '账号已退出',
            icon: 'none'
          })
          that.setData({
            isLogin
          })
        }
      }
    })
  },
  showCategories: function () {
    wx.switchTab({
      url: "pages/login/login"
    });
  },
  navigateToVerify:function(){
    wx.navigateTo({
      url: '/pages/verify/verify',
    })
  }
})