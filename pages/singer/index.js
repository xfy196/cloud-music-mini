// pages/singer/index.js
const request = require("../../utils/requets")
const {alphaTypes, categoryTypes}  = require("../../config/config")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    artists: [],
    more: true,
    alphaTypes: [],
    categoryTypes: {},
    cateKey: '',
    alphaKey: '',
    aListQuery: {
      type: 0,
      area: 0,
      initial: '' ,
      offset: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.setData({
      alphaTypes,
      categoryTypes
    })
    this.initRequest()
  },

  // 初始化数据
  async initRequest(){
    try {
      wx.showLoading({
        title: '正在加载中',
      })
      let result;
      if(!(this.data.cateKey || this.data.alphaKey)){
        result = await request({
          url: "/top/artists",
          method: "GET",
          data: {
            offset: 0
          }
        })
      }else {
        result = await request({
          url: '/artist/list',
          method: "GET",
          data: this.data.aListQuery
        })
      }
      if(result.code === 200){
        this.setData({
          artists: result.artists,
          more: result.more
        })
      }else{
        wx.showToast({
          title: '异常错误',
        })
      }
    } catch (error) {
      console.log(error)
      wx.showToast({
        title: '异常错误',
      })
    }finally {
      wx.hideLoading()
    } 
  },

  // 处理点击分类
  async handleSelectCate(data){
    let cate = data.detail
    if(cate.hasOwnProperty('type') && cate.hasOwnProperty('area')){
      this.setData({
        cateKey: `${cate.type}-${cate.area}-${cate.key}`,
        aListQuery: {
          ...this.data.aListQuery,
          type: cate.type,
          area: cate.area,
          offset: 0
        }
      })
    }else {
      this.setData({
        alphaKey: cate.key,
        aListQuery: {
          ...this.data.aListQuery,
          initial: cate.key,
          offset: 0
        }
      })
    }
    this.setData({
      artists: []
    })
    await this.initRequest()
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
  async handleListScroll(){
    // 触底操作我们需要请求数据了
    if(this.data.more){
      // 如果有更多我们需要请求数据
      let offset = this.data.artists.length
      try {
        wx.showLoading({
          title: '正在加载中',
        })
        let result;
        if(!(this.data.cateKey || this.data.alphaKey)){
          result = await request({
            url: "/top/artists",
            method: "GET",
            data: {
              offset
            }
          })
        }else {
          this.setData({
            aListQuery: {
              ...this.data.aListQuery,
              offset
            }
          })
          result = await request({
            url: '/artist/list',
            method: "GET",
            data: this.data.aListQuery
          })
        }
       
        if(result.code === 200){
          this.setData({
            artists: [...this.data.artists, ...result.artists],
            more: result.more
          })
        }else{
          wx.showToast({
            title: '异常错误',
          })
        }
      } catch (error) {
        wx.showToast({
          title: '异常错误',
        })
      }finally {
        wx.hideLoading()
      } 
    }else {
      wx.showToast({
        title: '没有更多了',
      })
    }
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
    this.initRequest()
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

  },
})