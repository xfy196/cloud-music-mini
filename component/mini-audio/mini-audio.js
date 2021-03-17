// component/mini-audio/mini-audio.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    playObj: Object,
    audioPlay: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleSongPlay(){
      if(this.data.audioPlay){
        app.globalData.backgroudAudioManager.pause()
        app.globalData.audioPlay = false
        this.setData({
          audioPlay: false
        })
      }else {
      app.globalData.backgroudAudioManager.play()   
      app.globalData.audioPlay = true
      this.setData({
        audioPlay: true
      })
      }
    }
  },
  lifetimes: {
    ready(){
      app.globalData.backgroudAudioManager.onPause(() => {
        app.globalData.audioPlay = false
        this.setData({
          audioPlay: false
        })
      })
      app.globalData.backgroudAudioManager.onPlay(() => {
        app.globalData.audioPlay = true
        this.setData({
          audioPlay: true
        })
      })
      app.globalData.backgroudAudioManager.onStop(() => {
        app.globalData.audioPlay = false
      app.globalData.backgroudAudioManager.src =  `https://music.163.com/song/media/outer/url?id=${this.data.playObj.id}.mp3`
        this.triggerEvent("handleChangeAudioPlay", {
          audioPlay: false
        })
        this.setData({
          audioPlay: false
        })
      })
    }
  }
})
