// component/scroll/scroll.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    scrollX: Boolean,
    scrollY: Boolean,
    list: Array,
    title: String,
    currentKey: String
  },
  ready(){
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
    handleClick(e){
      let {cate} = e.currentTarget.dataset
      this.triggerEvent("handleSelectCate", cate)
    }
  }
})
