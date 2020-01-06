var app=getApp();//获取全局变量

Page({
  //跳转到证书提交页面，如果用户暂未登陆，限制用户进入此页面，显示提示信息
showCategories: function () {
    if(app.globalData.isLogin==false){
      wx.showToast({
        title: '请先登陆',
        icon:"none"
      })
    }else{
      wx.switchTab({
        url: "../category/category"
      });
    }
    
  },
  //跳转到成绩查询页面，如果用户暂未登陆，限制用户进入此页面，显示提示信息
  showOrders: function () {
    if (app.globalData.isLogin == false) {
      wx.showToast({
        title: '请先登陆',
        icon: "none"
      })
    }else{
      wx.navigateTo({
      url: "../query/query"
    });
    }
  },

 
})