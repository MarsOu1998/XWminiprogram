//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'hello-wpfps'
    })

  },
  globalData: {
    userInfo: null
  }
})