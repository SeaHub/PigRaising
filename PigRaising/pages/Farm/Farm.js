const util = require('../../utils/util.js')

const PIG_POSITION_ARR = [
  "PigImage1", "PigImage2", "PigImage3", "PigImage4", "PigImage5", "PigImage6",
  "PigImage7", "PigImage8", "PigImage9", "PigImage10", "PigImage11", "PigImage12"
]

Page({
  data: {
    // Modal Hidden
    modalHidden: true,
    // Modal Msg
    modalMsg: "",
    // 当前日期 - 用于显示
    dateText: "",
    // 当天猪的数量 - 动态
    numberOfTodayPigs: 0,
    // 当天猪的品种 - 动态
    arrayOfTodayPigsImgsName: [],

    // 判断目前globalData.currentDate是否当前日
    isCurrentDate: true,

    PigImage1: "", PigImage2: "", PigImage3: "", PigImage4: "", PigImage5: "", PigImage6: "",
    PigImage7: "", PigImage8: "", PigImage9: "", PigImage10: "", PigImage11: "", PigImage12: ""
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.storageGet()
    this.chooseArea()
  },

  onReady: function () {
    // 页面渲染完成
    let app = getApp()
    let date = app.globalData.currentDate

    let dateString = date.toLocaleDateString()

    this.setData({
      dateText: dateString
    })
  },

  onShow: function () {
    // 页面显示
  },

  onHide: function () {
    // 页面隐藏
  },

  onUnload: function () {
    // 页面关闭
  },

  // 清空猪
  clearArea: function (e) {
    this.setData({
      PigImage1: "1", PigImage2: "2", PigImage3: "3", PigImage4: "4", PigImage5: "5", PigImage6: "6",
      PigImage7: "7", PigImage8: "8", PigImage9: "9", PigImage10: "10", PigImage11: "11", PigImage12: "12"
    })
  },

  // 存放猪
  chooseArea: function (e) {
    // 避免不同猪放在同一位置
    let isPositionHasPig = [false, false, false, false, false, false,
      false, false, false, false, false, false]

    for (var idx = 0; idx < this.data.arrayOfTodayPigsImgsName.length; ++idx) {
      // 产生[0, 11]的随机数
      let randomNumber = Math.floor(Math.random() * 12)
      // 取出位置名称
      let positionName = PIG_POSITION_ARR[randomNumber]
      // 取出猪 
      let pig = this.data.arrayOfTodayPigsImgsName[idx]
      let basePath = "https://raw.githubusercontent.com/samrayleung/wechat_pit_images/master/assets"
      let pigPath = basePath + "/img/" + pig + ".png"

      // 存放猪 - 待优化
      while (isPositionHasPig[randomNumber] === true) {
        randomNumber = Math.floor(Math.random() * 12)
      }

      if (randomNumber === 0) {
        this.setData({
          PigImage1: pigPath
        })
      } else if (randomNumber === 1) {
        this.setData({
          PigImage2: pigPath
        })
      } else if (randomNumber === 2) {
        this.setData({
          PigImage3: pigPath
        })
      } else if (randomNumber === 3) {
        this.setData({
          PigImage4: pigPath
        })
      } else if (randomNumber === 4) {
        this.setData({
          PigImage5: pigPath
        })
      } else if (randomNumber === 5) {
        this.setData({
          PigImage6: pigPath
        })
      } else if (randomNumber === 6) {
        this.setData({
          PigImage7: pigPath
        })
      } else if (randomNumber === 7) {
        this.setData({
          PigImage8: pigPath
        })
      } else if (randomNumber === 8) {
        this.setData({
          PigImage9: pigPath
        })
      } else if (randomNumber === 9) {
        this.setData({
          PigImage10: pigPath
        })
      } else if (randomNumber === 10) {
        this.setData({
          PigImage11: pigPath
        })
      } else if (randomNumber === 11) {
        this.setData({
          PigImage12: pigPath
        })
      }
      isPositionHasPig[randomNumber] = true
    }
  },

  // Modal事件  
  modalChange: function (e) {
    this.setData({
      modalHidden: !this.data.modalHidden
    })
  },

  // 获取缓存
  storageGet: function () {
    let date = new Date()
    let currentDateString = date.toLocaleDateString()
    let storage = wx.getStorageSync(currentDateString)

    if (!storage) {
      return
    } else {
      let arr = storage.ArrayOfTodayPigsImgsName
      let num = storage.NumberOfTodayPigs

      this.setData({
        numberOfTodayPigs: num,
        arrayOfTodayPigsImgsName: arr
      })
    }
  },

  // 点击左边按钮 - Blinding  
  leftBtnClicked: function (e) {

    // 获取上一天的时间字符串    
    let app = getApp()
    let date = app.globalData.currentDate

    let theDayBeforeTheDate = new Date(date.getTime() - 24 * 60 * 60 * 1000)
    let formattedDate = theDayBeforeTheDate.toLocaleDateString()

    // 将日期推前一天
    app.globalData.currentDate = theDayBeforeTheDate
    this.setData({
      isCurrentDate: false,
      dateText: formattedDate
    })

    // 获取上一天的缓存
    let storage = util.getSpecialDateDate(formattedDate)
    if (!storage) {
      this.setData({
        modalHidden: !this.data.modalHidden,
        modalMsg: "That day you didn`t raise your pig!"
      })
      return
    }

    let arr = storage.ArrayOfTodayPigsImgsName
    let num = storage.NumberOfTodayPigs
    this.setData({
      numberOfTodayPigs: num,
      arrayOfTodayPigsImgsName: arr
    })
    this.clearArea()
    this.chooseArea()
  },

  // 点击右边按钮 - Blinding  
  rightBtnClicked: function (e) {
    if (this.data.isCurrentDate === false) {
      let app = getApp()
      let date = app.globalData.currentDate
      let theDayAfterTheDate = new Date(date.getTime() + 24 * 60 * 60 * 1000)
      let formattedDate = theDayAfterTheDate.toLocaleDateString()

      app.globalData.currentDate = theDayAfterTheDate

      // 获取后一天的缓存
      let storage = util.getSpecialDateDate(formattedDate)
      // 当最后一天没有缓存，代表是当前天
      if (!storage) {
        wx.navigateTo({
          url: "../Week/Week"
        })

        app.globalData.currentDate = new Date(date.getTime() - 24 * 60 * 60 * 1000)

        this.setData({
          isCurrentDate: true,
        })

        return
      }

      let arr = storage.ArrayOfTodayPigsImgsName
      let num = storage.NumberOfTodayPigs
      this.setData({
        numberOfTodayPigs: num,
        arrayOfTodayPigsImgsName: arr,
        dateText: formattedDate
      })
      this.clearArea()
      this.chooseArea()

    } else {
      wx.navigateTo({
        url: "../Week/Week"
      })
    }
  }
})