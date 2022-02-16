// pages/singerSongList/index.js
const request = require("../../utils/requets")
const {getName} = require("../../utils/util")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    more: true,
    artist: {},
    songs: [],
    playObj: [],
    showMiniPlay: false,
    audioPlay: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function ({id}) {
    try {
      this.setData({
        audioPlay: app.globalData.audioPlay,
        showMiniPlay: app.globalData.showMiniPlay,
        playObj: app.globalData.playObj
      })
      await this.requestArtistsData(id)
    } catch (error) {
    }finally{
    }
  },
  handlePlaySong(e){
    let song = e.currentTarget.dataset.song
    app.globalData.playObj = song
    app.globalData.backgroudAudioManager.src = `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
    app.globalData.backgroudAudioManager.title = song.name
    app.globalData.backgroudAudioManager.epname = song.name
    app.globalData.backgroudAudioManager.singer = getName(song.ar)
    app.globalData.audioPlay = true
    app.globalData.playObj = song
    app.globalData.showMiniPlay = true
    this.setData({
      audioPlay: true,
      playObj: song,
      showMiniPlay: true
    })
  },
  async requestArtistsData(id){
    try {
      wx.showLoading({
        title: "正在加载中..."
      })
      wx.showNavigationBarLoading()
      let res = await request({
        url: '/artists',
        method: "GET",
        data: {
          id
        }
      })
      this.setData({
        artist: res.artist,
        songs: res.hotSongs,
        more: res.more
      })
    } catch (error) {
      
    }finally{
      wx.hideLoading()
      wx.hideNavigationBarLoading()
      wx.setNavigationBarTitle({
        title: this.data.artist.name,
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