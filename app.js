// app.js
App({
  onLaunch() {
    this.globalData.backgroudAudioManager = wx.getBackgroundAudioManager()
    wx.getSystemInfo({
      success: (result) => {
        this.globalData.windowWidth = result.windowWidth
        this.globalData.windowHeigth = result.windowHeight
      },
    })
  },
  globalData: {
    windowWidth: 0,
    windowHeigth: 0,
    audioPlay: false,
    playObj: {},
    backgroudAudioManager: null,
    showMiniPlay: false,
  }
})
