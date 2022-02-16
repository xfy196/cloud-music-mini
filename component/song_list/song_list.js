// component/song_list/song_list.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detail: Object,
    showMiniPlay: Boolean,
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
    handlePlaySong(e){
      this.triggerEvent("handlePlaySong", e.currentTarget.dataset.item, {

      })
    }
  },
  lifetimes: {
    ready(){
    }
  }
})
