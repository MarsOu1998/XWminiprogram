//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'hello-wpfps'
    })

  },
  globalData: {
    isLogin:false,//判定当前用户是否已经登陆
    userInfo:[]
  }
})