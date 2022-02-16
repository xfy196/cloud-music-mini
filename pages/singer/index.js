// pages/singer/index.js
const request = require("../../utils/requets")
const {alphaTypes, categoryTypes}  = require("../../config/config")
const { times } = require("underscore")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    artists: [],
    more: true,
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
    try {
      wx.showLoading({
        title: '正在加载中',
      })
      let result = await request({
        url: "/top/artists",
        method: "GET",
        data: {
          offset: 0
        }
      })
      if(result.code === 200){
        this.setData({
          artists: result.artists,
          more: result.more
        })
      }else{
        wx.showToast({
          title: '异常错误',
        })
      }
    } catch (error) {
      wx.showToast({
        title: '异常错误',
      })
    }finally {
      wx.hideLoading()
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
  async handleListScroll(){
    // 触底操作我们需要请求数据了
    if(this.data.more){
      // 如果有更多我们需要请求数据
      let offset = this.data.artists.length
      try {
        wx.showLoading({
          title: '正在加载中',
        })
        let result = await request({
          url: "/top/artists",
          method: "GET",
          data: {
            offset
          }
        })
        if(result.code === 200){
          this.setData({
            artists: [...this.data.artists, ...result.artists],
            more: result.more
          })
        }else{
          wx.showToast({
            title: '异常错误',
          })
        }
      } catch (error) {
        wx.showToast({
          title: '异常错误',
        })
      }finally {
        wx.hideLoading()
      } 
    }else {
      wx.showToast({
        title: '没有更多了',
      })
    }
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