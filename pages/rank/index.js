const request = require("../../utils/requets.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    officalList: [],
    globalList: [],
    audioPlay: false,
    playObj: {},
    showMiniPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let result = await request({
      url: "/toplist/detail",
      method: "GET"
    })
    if (result.code == 200) {
      let index = this.findIndex(result.list)
      let officalList = result.list.slice(0, index)
      let globalList = result.list.slice(index)
      let diff = 3 - globalList.length % 3
      for (let i = 0; i < diff; i++) {
        globalList.push({})
      }
      this.setData({
        officalList,
        globalList,
        audioPlay: app.globalData.audioPlay,
        showMiniPlay: app.globalData.showMiniPlay,
        playObj: app.globalData.playObj
      })
    } else {
      wx.showToast({
        title: '异常错误，请重试',
      })
    }
  },
  /**
   * 
   * @param {*} e 
   * 处理每一个歌单的点击的事件
   */
  handleItemTab(e) {
    wx.navigateTo({
      url: '/pages/songList/index?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 找到第一个没有歌曲的下标这就是全球榜的第一个数据
   * @param {*} rankList 
   */
  findIndex(rankList) {
    for (let i = 0; i < rankList.length; i++) {
      if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
        return i + 1
      }
    }
  },
  handleChangeAudioPlay(e){
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      audioPlay: app.globalData.audioPlay,
      showMiniPlay: app.globalData.showMiniPlay,
      playObj: app.globalData.playObj
    })
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