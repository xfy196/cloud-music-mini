// pages/search/index.js
const request = require("../../utils/requets")
const {getName} = require("../../utils/util")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hots: [],
    searchResult: [],
    searchStatus: false,
    searchValue: "",
    audioPlay: false,
    playObj: {},
    showMiniPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '搜索歌曲',
    })
    this.setData({
      audioPlay: app.globalData.audioPlay,
      showMiniPlay: app.globalData.showMiniPlay,
      playObj: app.globalData.playObj
    })
    this.initRequest()
  },

  /**
   * 初始化的请求
   */
  async initRequest(){
    try {
      wx.showLoading({
        title: '正在加载中',
      })
      let hotResult = await request({
        url: "/search/hot",
      })
      if(hotResult.code == 200){
        wx.stopPullDownRefresh({
          success: (res) => {},
        })
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
    }finally {
      wx.hideLoading()
    }
    
  },

  async handleSearch(value){
    if(value === ""){
      this.setData({
        searchStatus: false
      })
      return;
    }
    this.setData({
      searchValue: value
    })
    try {
      wx.showLoading({
        title: '搜索中...',
      })
      let searchResult = await request({
        url: "/search/suggest",
        data: {
          keywords: value
        },
        method: "GET"
      })
      let songs = await request({
        url: "/search",
        data: {
          keywords: value
        }
      })
      
      if(searchResult.code == 200 && songs.code == 200){
        wx.hideLoading({
          success: (res) => {},
        })
        this.setData({
          searchStatus: true,
          searchResult: {
            artists: searchResult.result.artists ? searchResult.result.artists : [],
            songs: songs.result
          }
        })
      }else {
        wx.showToast({
          title: '异常错误',
        })
      }
    } catch (error) {
      wx.showToast({
        title: '异常错误',
      })
    }
  },

  /**
   * 返回首页
   */
  handleBack(){
    this.setData({
      searchValue: ""
    })
    this.handleSearch("")
    wx.switchTab({
      url: '/pages/recommend/index',
    })
  },

  /**
   * 点击歌曲
   * @param {*} e 
   */
  handleClickSong(e){
    let item = e.currentTarget.dataset.item
    app.globalData.playObj = item
    app.globalData.backgroudAudioManager.src = `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`
    app.globalData.backgroudAudioManager.title = item.name
    app.globalData.backgroudAudioManager.epname = item.name
    app.globalData.backgroudAudioManager.singer = getName(item.ar ? item.ar: item.artists)
    app.globalData.audioPlay = true
    app.globalData.playObj = item
    app.globalData.showMiniPlay = true
    this.setData({
      audioPlay: true,
      playObj: item,
      showMiniPlay: true
    })
    // wx.navigateTo({
    //   url: `/pages/player/index?item=${encodeURIComponent(JSON.stringify(item))}`,
    // })
  },
  handleHotTap(e){
    this.handleSearch(e.currentTarget.dataset.value)
  },

  handleInputSearch(e){
    this.handleSearch(e.detail.value)
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
   * 改变当前歌曲的播放状态的函数
   */
  handleChangeAudioPlay(e){
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