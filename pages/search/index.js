// pages/search/index.js
const request = require("../../utils/requets")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hots: [],
    searchResult: [],
    searchStatus: false,
    searchValue: ""
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
    let id = e.currentTarget.dataset.id;
    let bgam = wx.createInnerAudioContext()
    bgam.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    bgam.play()
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