// pages/login/login.js
var app = getApp();
var name = null;//变量，用于存放用户输入的账号
var password = null;//变量，用于存放用户输入的密码

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //输入用户名
  inputName: function (event) {
    name = event.detail.value//将用户输入的账号放到变量里面
  },
  //输入密码
  inputPassword(event) {
    password = event.detail.value//将用户输入的密码放到变量里面
  },
  //登陆函数
  login() {
    let that = this;
    wx.cloud.callFunction({
      name:'test',
      data:{},
      success:function(res){
        console.log(res.result.data);
        var result = res.result.data;
        var i=0;
      for(i=0;i<result.length;i++){
        if(result[i]['account']==name){
          console.log("存在该账号");
          if(result[i]['password']==password){
            console.log("密码正确，登陆成功");
            wx.navigateTo({
              url: '/pages/index/index',
            })
            break;
          }else{
            console.log("密码错误");
            break;
          }
        }
      }
      if(i==result.length){
        console.log("不存此用户");
      }
      }
    })
  }
})