// pages/login/login.js
var app = getApp();
var account = null;//用于存放用户输入的账号
var password = null;//用于存放用户输入的密码

Page({
  //输入用户名
  inputName: function (event) {
    account = event.detail.value//将用户输入的账号放到变量里面
  },
  //输入密码
  inputPassword(event) {
    password = event.detail.value//将用户输入的密码放到变量里面
  },
  //登陆函数
  login:function(){
    console.log("用户的登录账号为:"+account);
    var that = this;
    wx.cloud.callFunction({
      name:'userLogin',
      data:{
        account:account
      },
      success:function(res){
        console.log(res);
        var result = res.result.data;
        var i=0;
      for(i=0;i<result.length;i++){
        if(result[i]['account']==account){
          console.log("存在该账号");
          if(result[i]['password']==password){
            console.log("密码正确，登陆成功");
            app.globalData.isLogin=true;
    app.globalData.userInfo=res.result.data[0];
            wx.navigateBack({
            })
            break;
          }else{
            console.log("密码错误");
            wx.showToast({
              title: '密码错误',
              icon:'none'
            })
            break;
          }
        }
      }
      if(i==result.length){
        console.log("不存此用户");
        wx.showToast({
          title: '不存在此用户',
          icon:'none'
        })
      }
      }
    })
  }
})