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
    //选中态
    color1: '#f3f3f3',
    color2: '#fff',
    color3: '#fff',
    color4: '#fff',

    selectedIndex: 0,
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

  inputFocus: function(e){
    console.log('监听focus', e.currentTarget.id)
    this.setData({color1: '#fff'})
    this.setData({color2: '#fff'})
    this.setData({color3: '#fff'})
    this.setData({color4: '#fff'})

    if(e.currentTarget.id == "item1"){
      this.setData({color1: '#f3f3f3' ,selectedIndex: 0})
      
    } else if(e.currentTarget.id == "item2"){
      this.setData({color2: '#f3f3f3', selectedIndex: 1})
      
    } else if(e.currentTarget.id == "item3"){
      this.setData({color3: '#f3f3f3', selectedIndex :2})
      
    } else if(e.currentTarget.id == "item4"){
      this.setData({color4: '#f3f3f3', selectedIndex :3})
    } 
  },

  setSelectIndex: function(index){
    console.log(index)
    this.setData({color1: '#fff'})
    this.setData({color2: '#fff'})
    this.setData({color3: '#fff'})
    this.setData({color4: '#fff'})
    if(index == 0){
      this.setData({color1: '#f3f3f3' ,selectedIndex: 0})
    } else if(index == 1){
      this.setData({color2: '#f3f3f3', selectedIndex: 1})
    } else if(index == 2){
      this.setData({color3: '#f3f3f3', selectedIndex :2})
    } else if(index == 3){
      this.setData({color4: '#f3f3f3', selectedIndex :3})
    } 
  },

  inputBlur: function(e){
    console.log('取消focus', e.currentTarget.id)
    if(e.currentTarget.id == "i1"){
      this.setData({color1: '#fff'})
    } else if(e.currentTarget.id == "i2"){
      this.setData({color2: '#fff'})
    } else if(e.currentTarget.id == "i3"){
      this.setData({color3: '#fff'})
    } else if(e.currentTarget.id == "i4"){
      this.setData({color4: '#fff'})
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
  },

  getSelectedText: function(){
    if(this.data.selectedIndex == 0){
      return this.data.qualityTextValue
    }else if(this.data.selectedIndex == 1){
      return this.data.concentrationTextValue
    }else if(this.data.selectedIndex == 2){
      return this.data.sizeTextValue
    }else{
      return this.data.moleculeTextValue
    }
  },

  setSelectedText: function(text){
    if(this.data.selectedIndex == 0){
      this.setData({qualityTextValue: text})
    }else if(this.data.selectedIndex == 1){
      this.setData({concentrationTextValue: text})
    }else if(this.data.selectedIndex == 2){
      this.setData({sizeTextValue: text})
    }else{
      this.setData({moleculeTextValue: text})
    }
  },

  onKeyClick: function(e){
    var text = this.getSelectedText().toString()
    if(e.currentTarget.id == "key_delete"){
      if(text.length > 0){
        text = text.substring(0,text.length - 1)
      }
      this.setSelectedText(text)
    } else if(e.currentTarget.id == "key_move_up"){
      var index = (this.data.selectedIndex - 1 ) % 4
      if(index < 0){
        index = 3
      }
      this.setSelectIndex(index)
    } else if(e.currentTarget.id == "key_move_down"){
      var index = (this.data.selectedIndex + 1 ) % 4
      this.setSelectIndex(index)
    } else if(e.currentTarget.id == "key_equal"){
      this.calculate(e)
    } else {
      text = text + e.currentTarget.dataset.num
      this.setSelectedText(text)
    } 
  },

  clearText: function(e){
    this.setSelectedText('')
    wx.vibrateShort({
      success: (res) => {
        console.log('viberate sucess')
      },
    })
  }


  
})
