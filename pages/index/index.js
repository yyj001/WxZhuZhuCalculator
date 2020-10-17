//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    qualityArray: [{unit:0.000001, name:'pg'}, {unit:0.001, name:'ng'}, {unit:1, name:'ug'},
     {unit:1000, name:'mg'}, {unit:1000000, name:'g'}, {unit:1000000000, name:'kg'}],
    qualityUnitIndex: 3,
    qualityTextValue: "",
    // 浓度
    concentrationArray: [{unit:0.000000000001, name:'fM'}, {unit:0.000000001, name:'pM'}, 
    {unit:0.000001, name:'nM'}, {unit:0.001, name:'uM'}, {unit:1, name:'mM'}, {unit:1000, name:'M'}],
    concentrationUnitIndex: 4,
    concentrationTextValue: "",
    // 体积
    sizeArray: [{unit:0.000001, name:'nL'}, {unit:0.001, name:'uL'}, {unit:1, name:'mL'}, {unit:1000, name:'L'}],
    sizeUnitIndex: 2,
    sizeTextValue: "",

    // 分子量
    moleculeTextValue: "",
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
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


  bindTextInput: function(e){
    if(e.currentTarget.id == "i1"){
      this.setData({qualityTextValue: e.detail.value})
    } else if(e.currentTarget.id == "i2"){
      this.setData({concentrationTextValue: e.detail.value})
    } else if(e.currentTarget.id == "i3"){
      this.setData({sizeTextValue: e.detail.value})
    } else if(e.currentTarget.id == "i4"){
      this.setData({moleculeTextValue: e.detail.value})
    } 
  },

  calculate: function(e){
    console.log('picker发送选择改变，携带值为', this.data.qualityTextValue, this.data.concentrationTextValue, this.data.sizeTextValue, this.data.moleculeTextValue)
    var qualityValue = parseFloat(this.data.qualityTextValue) * this.data.qualityArray[this.data.qualityUnitIndex].unit;
    var concentrationValue = parseFloat(this.data.concentrationTextValue) * this.data.concentrationArray[this.data.concentrationUnitIndex].unit;
    var sizeValue = parseFloat(this.data.sizeTextValue) * this.data.sizeArray[this.data.sizeUnitIndex].unit;
    var moleculeValue = parseFloat(this.data.moleculeTextValue);
    if(isNaN(moleculeValue)){
      wx.showToast({title: '分子量不可为空',  icon: 'none',  mask: 'true'})
    }else if(!isNaN(concentrationValue) && !isNaN(sizeValue) && !isNaN(moleculeValue)){
      // 质量
      var qValue = concentrationValue * sizeValue * moleculeValue / this.data.qualityArray[this.data.qualityUnitIndex].unit;
      if(qValue < 0.000001 || qValue > 1000000){
        qValue = qValue.toExponential(9).toString()
      }
      this.setData({qualityTextValue: qValue});
    }else if(!isNaN(qualityValue) && !isNaN(sizeValue) && !isNaN(moleculeValue) && isNaN(concentrationValue)){
      // 浓度
      var cValue = qualityValue / sizeValue / moleculeValue / this.data.concentrationArray[this.data.concentrationUnitIndex].unit;
      this.setData({concentrationTextValue: cValue});
    }else if(!isNaN(qualityValue) && isNaN(sizeValue) && !isNaN(moleculeValue) && !isNaN(concentrationValue)){
      // 体积
      var value = qualityValue / concentrationValue / moleculeValue / this.data.sizeArray[this.data.sizeUnitIndex].unit;
      this.setData({sizeTextValue: value});
    }else{
      wx.showToast({title: '参数不足', icon: 'none', mask: 'true'})
    }
  }
  
})
