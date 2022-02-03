// app.js
App({
  onLaunch() {
    this.globalData.backgroudAudioManager = wx.getBackgroundAudioManager()
    wx.getSystemInfo({
      success: (result) => {
        this.globalData.windowWidth = result.windowWidth
        this.globalData.windowHeigth = result.windowHeight
        this.globalData.navHeight = result.statusBarHeight + 46
        this.globalData.statusbarHeight = result.statusBarHeight
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
    navHeight: 0,
    statusbarHeight: 0
  }
})
