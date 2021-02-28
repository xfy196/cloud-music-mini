const requets = require("../../utils/requets")

// pages/recommend/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    paneItems: []
  },

  /**
   * 生命周期函数--监听页面 加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady(){
    this.initRequest()  
  },

  async initRequest(){
    wx.showLoading({
      title: '正在加载中',
    })
    let bannersResult = await requets({
      url: "/banner",
      method: "GET"
    })
    if(bannersResult.code == 200){
      wx.hideLoading({
        success: (res) => {},
      })
      this.setData({
        banners: bannersResult.banners
      })
    }
    let paneResult = await requets({
      url: "/personalized",
      method: "GET"
    })
    if(paneResult.code === 200){
      this.setData({
        paneItems: paneResult.result
      })
    }
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

  }
})