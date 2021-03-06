// pages/singer/index.js
const request = require("../../utils/requets")
const {alphaTypes, categoryTypes}  = require("../../config/config")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    artists: [],
    alphaTypes: [],
    categoryTypes: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.setData({
      alphaTypes,
      categoryTypes
    })
    this.initRequest()
  },

  async initRequest(){
    let result = await request({
      url: "/top/artists",
      method: "GET",
      data: {
        offset: 0
      }
    })
    if(result.code === 200){
      wx.stopPullDownRefresh({
        success: (res) => {},
      })
      this.setData({
        artists: result.artists
      })
    }else{
      wx.showToast({
        title: '异常错误',
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.initRequest()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})