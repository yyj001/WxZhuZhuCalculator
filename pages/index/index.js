//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 质量
    qualityArray: ['pg', 'ng', 'ug', 'mg', 'g', 'kg'],
    qualityUnitIndex: 3,
    qualityTextValue: "wed",
    // 浓度
    concentrationArray: ['fM', 'pM', 'nM', 'uM', 'mM', 'M'],
    concentrationUnitIndex: 3,
    concentrationTextValue: "nongdu",
    // 体积
    sizeArray: ['nL', 'uL', 'mL', 'L'],
    sizeUnitIndex: 2,
    sizeTextValue: "size",
    // 体积
    sizeArray: ['nL', 'uL', 'mL', 'L'],
    sizeUnitIndex: 2,
    sizeTextValue: "size",
    // 分子量
    moleculeTextValue: "fenzi",
  },



  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },


  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.currentTarget.id)
    if(e.currentTarget.id == "p1"){
      this.setData({qualityUnitIndex: e.detail.value})
    } else if(e.currentTarget.id == "p2"){
      this.setData({concentrationUnitIndex: e.detail.value})
    } else if(e.currentTarget.id == "p3"){
      this.setData({sizeUnitIndex: e.detail.value})
    } 
  },


  qualityInput: function(e){
    this.setData({
      qualityTextValue: e.detail.value
    })
  },

  concentrationInput: function(e){
    this.setData({
      concentrationTextValue: e.detail.value
    })
  },

  sizeInput: function(e){
    this.setData({
      sizeTextValue: e.detail.value
    })
  },

  moleculeInput: function(e){
    this.setData({
      moleculeTextValue: e.detail.value
    })
  },

  calculate: function(e){
    console.log('picker发送选择改变，携带值为', this.data.qualityTextValue, this.data.concentrationTextValue, this.data.sizeTextValue, this.data.moleculeTextValue)
    // val quality = 
  }
  
})
