// pages/songLIst/index.js
const request = require("../../utils/requets")
const {getName} = require("../../utils/util")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    audioPlay: false,
    playObj: {},
    showMiniPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({id}) {
    this.setData({
      audioPlay: app.globalData.audioPlay,
      showMiniPlay: app.globalData.showMiniPlay,
      playObj: app.globalData.playObj
    })
    this.intirequest(id)
  },

  /**
   * 初始化请求
   */
  async intirequest(id){
    wx.showLoading({
      title: "正在加载中...",
    })
    try {
      let result = await request({
        url: "/playlist/detail",
        data : {
          id
        }
      })
      if(result.code == 200){
        
        let ids = result.playlist.trackIds.reduce((prev, cur, index, arr) => {
          return prev.concat(cur.id)
        }, []).join(",")
        let songs = await request({
          url: "/song/detail",
          data: {
            ids
          }
        })
        if(songs.code === 200){
          wx.hideLoading({
            success: (res) => {},
          })
          this.setData({
            detail: {
              playlist: {
                ...result.playlist,
                tracks: songs.songs
              },
              privileges: songs.privileges
            }
          })
        }
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
   * 处理播放歌曲
   * @param {*} e 
   */
  handlePlaySong(e){
    app.globalData.playObj = e.detail
    app.globalData.backgroudAudioManager.src = `https://music.163.com/song/media/outer/url?id=${e.detail.id}.mp3`
    app.globalData.backgroudAudioManager.title = e.detail.name
    app.globalData.backgroudAudioManager.epname = e.detail.name
    app.globalData.backgroudAudioManager.singer = getName(e.detail.ar)
    app.globalData.audioPlay = true
    app.globalData.playObj = e.detail
    app.globalData.showMiniPlay = true
    this.setData({
      audioPlay: true,
      playObj: e.detail,
      showMiniPlay: true
    })
  },
  handleChangeAudioPlay(e){
    this.setData({
      showMiniPlay: e.detail.audioPlay
    })
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