// component/scrollY/scrollY.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: Array,
    scrollX: Boolean,
    scrollY: Boolean,
    height: String
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
    handleToSongList(e){
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: '/pages/singerSongList/index?id='+e.currentTarget.dataset.id,
      })
    }
  }
})
