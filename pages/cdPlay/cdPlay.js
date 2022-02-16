// pages/cdPlay/cdPlay.js
const request = require("../../utils/requets")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: app.globalData.navHeight,
    statusbarHeight: app.globalData.statusbarHeight,
    id: null,
    lyric: null,
    navHiiden: true,
    audioPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      song: app.globalData.playObj,
      audioPlay: app.globalData.audioPlay,
      id: options.id
    })
    this.getLyricRequest(this.data.id)
  },
  handleSongPlay(){
    if(this.data.audioPlay){
      app.globalData.backgroudAudioManager.pause()
      app.globalData.audioPlay = false
      this.setData({
        audioPlay: false
      })
    }else {
    // app.globalData.backgroudAudioManager.src =  `https://music.163.com/song/media/outer/url?id=${this.data.song.id}.mp3`
    app.globalData.backgroudAudioManager.play()   
    app.globalData.audioPlay = true
    this.setData({
      audioPlay: true
    })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // 返回
  back(){
    wx.navigateBack({
      delta: 1,
    })
  },
  async getLyricRequest(id){
    let result = await request({
      url: "/lyric",
      data: {
        id
      }
    })
    if(result.code === 200){
      this.setData({
        lyric: result.lrc
      })
    }else {
      wx.showToast({
        title: "服务器错误",
        icon: "error"
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