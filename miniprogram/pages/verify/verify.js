var app=getApp();
var userInfo;//用于前端页面显示用户信息
var uploadInfo;//用于数据信息显示
var count;//统计共有多少学生信息需要审核
var finish=false;//当前用户所有证书是否审核完毕
var temp;//存储未被检查的数组
var check=0;
Page({
  onShow:function(res){
    var that=this;
    uploadInfo=[];
    temp=[];
    userInfo=[];
    wx.cloud.callFunction({
      name:'countUncheckInfo',
      data:{},
      success:function(res){
        console.log(res.result.total)
        count = res.result.total;
        if(count>0){
          wx.cloud.callFunction({
            name:'selectAllInfo',
            data:{},
            success:function(res){
              console.log(res.result.data[0]);
              userInfo = res.result.data[0];
          
              for(var i=0;i<userInfo['category'].length;i++){
                if (userInfo['category'][i][0]['check']==1){
                  uploadInfo.push(userInfo['category'][i]);
                  userInfo['category'].splice(i, 1)
                  i = -1;
                }
              }
              for(var i=0;i<userInfo['category'].length;i++){
                if (userInfo['category'][i][0]['check'] == 0) {
                  temp.push(userInfo['category'][i]);   
                  
                }
              }
              
              console.log("已完成检查的内容如下:")
              console.log(uploadInfo)
              console.log("未完成检查内容如下:");
              console.log(temp)
              console.log(userInfo)
              that.setData({
                count,userInfo
              })
              //以上从数据库中获取数据，根据是否检查过进行分割，接下使用agreeUser云函数来对数据库进行更新

            }
          })
        }
      }
    })
         
  },
  agree:function(){
    var that=this;
    finish=false;
    wx.showModal({
      title:'提示',
      content: '确定通过吗',
      success:function(res){
        if(res.confirm){
          userInfo['category'][0][0]['check']=1;
          console.log(userInfo);
          for(var i=0;i<userInfo['category'].length;i++){
            uploadInfo.push(userInfo['category'][i])                
          }
          console.log(uploadInfo)
          temp.splice(0, 1)
          console.log("未检查的内容有");
          console.log(temp)
          wx.cloud.callFunction({
            name:'agreeUser',
            data:{
              _id:userInfo['_id'],
              category:uploadInfo
            },
            success:function(res){
              console.log("成功通过");
              userInfo['category'].splice(0, 1)
              for(var i=0;i<uploadInfo.length;i++){
                if (uploadInfo[i][0]['check'] == 0) {
                  uploadInfo.splice(i,1)
                  i=-1;
                }
              }
              
              if(userInfo['category'].length==0){
                finish=true;
              }
              else
              finish=false;
              console.log("finish:"+finish)
              if(finish){
                count-=1;
              }
              that.setData({
                count
              })
              
              if(finish){
                wx.cloud.callFunction({
                  name:'agreeUser',
                  data:{
                    _id:userInfo['_id'],
                    check:1
                  },
                  success:function(res){
                    console.log("check已修改为1")
                  }
                })
              }
              if(finish){
                userInfo=[];
                temp=[];
                uploadInfo=[];
                wx.cloud.callFunction({
                  'name': 'selectAllInfo',
                  daya: {},
                  success: function (res) {
                    console.log("已获取新成员信息");  

                    console.log(res.result.data[0]);
                    userInfo = res.result.data[0];

                    for (var i = 0; i < userInfo['category'].length; i++) {
                      if (userInfo['category'][i][0]['check'] == 1) {
                        uploadInfo.push(userInfo['category'][i]);
                        userInfo['category'].splice(i, 1)
                        i = -1;
                      }
                    }
                    for (var i = 0; i < userInfo['category'].length; i++) {
                      if (userInfo['category'][i][0]['check'] == 0) {
                        temp.push(userInfo['category'][i]);

                      }
                    }

                    console.log("已完成检查的内容如下:")
                    console.log(uploadInfo)
                    console.log("未完成检查内容如下:");
                    console.log(temp)
                    console.log(userInfo)
                    that.setData({
                      count, userInfo
                    })
              //以上从数据库中获取数据，根据是否检查过进行分割，接下使用agreeUser云函数来对数据库进行更新
                    

                    
                  }
                })
              }

            }
          })
        }
      }
    })
  },
  disagree:function(){
    var that=this;
    finish=false;
    wx.showModal({
      title: '提示',
      content: '是否拒绝',
      success:function(res){
        if(res.confirm){
          temp.splice(0,1);
          if(temp.length==0){
            finish=true;
          }else{
          uploadInfo.push(temp);
          }
          console.log(uploadInfo);
          wx.cloud.callFunction({
            name:'agreeUser',
            data:{
              _id:userInfo['_id'],
              category: uploadInfo
            },
            success:function(res){
              console.log("已拒绝该申请");
              for(var i=0;i<userInfo['category'].length;i++){
                if(userInfo['category'][i][0]['check']==0){
                  userInfo['category'].splice(i,1);
                  count-=1;
                  
                  break;
                }
              }
              
              if (userInfo['category'].length==0){
               finish=true;
              }
              else
              finish=false;
              console.log("finish:"+finish);
              if(finish&&count!=0){
                wx.cloud.callFunction({
                  name:'agreeUser',
                  data:{
                    _id:userInfo['_id'],
                    check:1
                  },
                  success:function(res){
                    userInfo = [];
                    temp = [];
                    uploadInfo = [];
                    wx.cloud.callFunction({
                      'name': 'selectAllInfo',
                      daya: {},
                      success: function (res) {
                        console.log("已获取新成员信息");

                        console.log(res.result.data[0]);
                        userInfo = res.result.data[0];

                        for (var i = 0; i < userInfo['category'].length; i++) {
                          if (userInfo['category'][i][0]['check'] == 1) {
                            uploadInfo.push(userInfo['category'][i]);
                            userInfo['category'].splice(i, 1)
                            i = -1;
                          }
                        }
                        for (var i = 0; i < userInfo['category'].length; i++) {
                          if (userInfo['category'][i][0]['check'] == 0) {
                            temp.push(userInfo['category'][i]);

                          }
                        }

                        console.log("已完成检查的内容如下:")
                        console.log(uploadInfo)
                        console.log("未完成检查内容如下:");
                        console.log(temp)
                        console.log(userInfo)
                        that.setData({
                          count, userInfo
                        })
                        //以上从数据库中获取数据，根据是否检查过进行分割，接下使用agreeUser云函数来对数据库进行更新



                      }
                    })


                  }
                })
                }
             
              else
                that.setData({
                  count,userInfo
                })
              if(count==0){
                wx.cloud.callFunction({
                  name:'agreeUser',
                  data:{
                    _id:userInfo['_id'],
                    check:1
                  },
                  success:function(res){
                    console.log("check已变为1")
                  }
                })
              }
                
            }
          })
        }
      }
    })
  }
})