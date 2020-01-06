Page({
showCategories: function () {
    // wx.navigateTo({
    // 	url: "../category/category"
    // });
    wx.switchTab({
      url: "../category/category"
    });
  },
  showOrders: function () {
    wx.navigateTo({
      url: "../query/query"
    });
  },

 
})