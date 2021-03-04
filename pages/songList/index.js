// pages/songLIst/index.js
const request = require("../../utils/requets")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.intirequest("5481314588")
  },

  /**
   * 初始化请求
   */
  async intirequest(id){
    try {
      let result = await request({
        url: "/playlist/detail",
        data : {
          id
        }
      })
      if(result.code == 200){
        this.setData({
          detail: {
            playlist: result.playlist,
            privileges: result.privileges
          }
        })
      }
    } catch (error) {
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