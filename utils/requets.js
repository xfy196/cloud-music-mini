const {baseUrl} = require("../config/config")
let requets = function (options){
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + options.url,
      method: options.method || "GET",
      data: options.data,
      header: options.header || {},
      success: res => {
        if(res.statusCode !== 200){
          wx.showToast({
            icon: "error",
            title: "网络开小差了",
            duration: 1500
          })
        }else {

          resolve(res.data)
        }
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

module.exports = requets