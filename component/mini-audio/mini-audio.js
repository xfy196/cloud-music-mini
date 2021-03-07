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
        app.globalData.innerAudioContext.pause()
        this.setData({
          audioPlay: false
        })
      }else {
      app.globalData.innerAudioContext.play()   
      this.setData({
        audioPlay: true
      })
      }
    }
  },
  lifetimes: {
    ready(){
      
    }
  }
})
