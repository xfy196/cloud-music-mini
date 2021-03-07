// pages/player/index.js
const {getName} = require("../../utils/util")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    song: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({item}) {
    let song = JSON.parse(decodeURIComponent(item))
   
    this.setData({
      song
    })
    wx.setNavigationBarTitle({
      title: song.name,
    })
  },

  /**
   * 初始化请求
   */
  async initRequest(){

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let id = this.data.song.id;
    app.globalData.backgroudAudioManager.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    app.globalData.backgroudAudioManager.title = this.data.song.name
    app.globalData.backgroudAudioManager.epname = this.data.song.name
    app.globalData.backgroudAudioManager.singer = getName(this.data.song.ar ? this.data.song: this.data.song.artists)
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