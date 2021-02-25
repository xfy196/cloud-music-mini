// app.js
App({
  onLaunch() {
    wx.getSystemInfo({
      success: (result) => {
        this.globalData.windowWidth = result.windowWidth
        this.globalData.windowHeigth = result.windowHeigth
      },
    })
  },
  globalData: {
    userInfo: null,
    windowWidth: 0,
    windowHeigth: 0
  }
})
