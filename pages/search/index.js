// pages/search/index.js
const request = require("../../utils/requets")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hots: [],
    searchResult: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initRequest()
  },

  /**
   * 初始化的请求
   */
  async initRequest(){
    try {
      let hotResult = await request({
        url: "/search/hot",
      })
      if(hotResult.code == 200){
        this.setData({
          hots: hotResult.result.hots
        })
      }else {
        wx.showToast({
          title: '请求失败',
        })
      }
    } catch (error) {
      wx.showToast({
        title: '异常错误',
      })
    }
    
  },
  /**
   * search的搜索的函数
   */
  handleSearchInput(e){
    console.log(e.detail.value)
  },

  async handleSearch(e){
    try {
      wx.showLoading({
        title: '搜索中...',
      })
      let searchResult = await request({
        url: "/search/suggest",
        data: {
          keywords: e.detail.value
        },
        method: "GET"
      })
      if(searchResult.code == 200){
        this.setData({
          searchResult: searchResult.result
        })
        wx.hideLoading({
          success: (res) => {},
        })
      }else {
        wx.hideLoading({
          success: (res) => {},
        })
        wx.showToast({
          title: '异常错误',
        })
      }
    } catch (error) {
      
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