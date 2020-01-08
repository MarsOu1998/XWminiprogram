var app=getApp();
var userInfo;//存放用户信息
var count;//统计共有多少学生信息需要审核
var finish=false;//当前用户所有证书是否审核完毕
var check=0;
Page({
  
   

  
  onShow:function(){
    var that=this;
    wx.cloud.callFunction({
      name:'countUncheckInfo',
      data:{},
      success:function(res){
        count=res.result.total
        that.setData({
          count
        })
        if(count>0){
          wx.cloud.callFunction({
            name:'selectAllInfo',
            data:{},
            success:function(res){
              userInfo=res.result.data[0];
              for(var j=0;j<userInfo['category'].length;j++){
                if(userInfo['category'][j][0]['check']==1){
                  userInfo['category'].splice(j,1);
                }
              }
              console.log(userInfo)
              that.setData({
                userInfo
              })
            }
          })
        }
      }
    })
  },
  agree:function(){
    var i=0;
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确定通过审核吗',
      success:function(res){
        if(res.confirm){
          userInfo['category'][0][0]['check']=1;
          console.log(userInfo['category'])
          for (i = 0; i < userInfo['category'].length;i++){
            if (userInfo['category'][i][0]['check']==0){
              finish=false;
              break;
            }
          }
          if (userInfo['category'].length==1){
            finish=true;
            count-=1;
            that.setData({ 
              count 
              })
            }
            console.log(finish);
            console.log(count)
          if(finish){
            console.log("当前" + userInfo['nickname']+"的信息已审核完毕");
            wx.cloud.callFunction({
              name: 'agreeUser',
              data:{
                _id:userInfo['_id'],
                category:userInfo['category'],
                check:1
              },
              success:function(res){
                console.log("成功通过")
                if (count != 0) {
                  wx.cloud.callFunction({
                    name: 'selectAllInfo',
                    data: {},
                    success: function (res) {
                      userInfo = res.result.data[0];
                      for (var j = 0; j < userInfo['category'].length; j++) {
                        if (userInfo['category'][j][0]['check'] == 1) {
                          userInfo['category'].splice(j, 1);
                        }
                      }
                      console.log(userInfo)
                      that.setData({
                        userInfo
                      })
                    }
                  })
                }
              }
            })
          }
          else{
            wx.cloud.callFunction({
              name: 'agreeUser',
              data: {
                _id: userInfo['_id'],
                category: userInfo['category'],
                check: 0
              },
              success: function (res) {
                console.log(res)
                console.log("成功通过");
                userInfo['category'].splice(0, 1);
                that.setData({
                  userInfo
                })
                
              }
            })
          }
        }
      }
    })
  },
  disagree:function(res){
    var that=this;
    check=0;
    wx.showModal({
      title: '提示',
      content: '确定拒绝吗',
      success:function(res){
        if(res.confirm){
          userInfo['category'].splice(0,1);
          console.log(userInfo)
          if (userInfo['category'].length==0){
            check=1;
            count-=1;
          }
          console.log(check)
          wx.cloud.callFunction({
            name:'agreeUser',
            data:{
              _id: userInfo['_id'],
              category: userInfo['category'],
              check:check
            },
            success:function(res){
              console.log("已拒绝该证书申请")
              if(count!=0){
                wx.cloud.callFunction({
                  name: 'selectAllInfo',
                  data: {},
                  success: function (res) {
                    userInfo = res.result.data[0];
                    for (var j = 0; j < userInfo['category'].length; j++) {
                      if (userInfo['category'][j][0]['check'] == 1) {
                        userInfo['category'].splice(j, 1);
                      }
                    }
                    console.log(userInfo)
                    that.setData({
                      userInfo
                    })
                  }
                })
              }
              that.setData({
                count,
                userInfo
              })
            }
          })
        }
      }
    })
  }
  
})