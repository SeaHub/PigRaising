const util = require('../../utils/util.js')

const STATUS_WAITING = 0 // 应用开始时状态
const STATUS_RUNNING = 1 // 应用计时状态
const STATUS_COMPLETED = 2 // 应用完成状态

const PIG_GROW_CHANGE_1ST = 0.2 // 第一次因成长而更换猪的图片的时候, 达到目标的20%
const PIG_GROW_CHANGE_2ND = 0.4 // 第二次因成长而更换猪的图片的时候, 达到目标的40%
const PIG_GROW_CHANGE_3RD = 0.8 // 第三次因成长而更换猪的图片的时候, 达到目标的80%

const IMG_SIZE_SMALL = 50  // 原有尺寸
const IMG_SIZE_MIDDLE = 80  // 第一次因成长长大的尺寸 (80, 80)
const IMG_SIZE_LARGE = 100 // 第二次因成长长大的尺寸 (100, 100)
const IMG_SIZE_EXTRA_LARGE = 150 // 第三次因成长长得大尺寸 (150, 150)

// 计时圈初始角度
const INIT_DEGREE = {
  LEFT: 45,
  RIGHT: -45
}

// 每只猪的时间(单位:mins)
const PIG_TIME = {
  "ArrogantPig": 30,
  "CutePig": 60,
  "BlackPig": 80,
  "SuperPig": 120
}

// 猪名数组
const PIG_NAME_ARR = ["ArrogantPig", "CutePig", "BlackPig", "SuperPig"]
const defaultPigIdx = 0  // 默认的猪

Page({
  data: {
    // ------------------ Binding Datasource ------------------
    // modal2 Msg
    modal2Msg: "Your lovely pig was killed",
    // modalHidden2状态
    modalHidden2: true,
    // killPigModal状态
    killPigModalHidden: true,
    // actionSheet状态
    actionSheetHidden: true,
    // actionSheet Items
    actionSheetItems: [
      "ArrogantPig(Need: " + PIG_TIME["ArrogantPig"] + " minutes)",
      "CutePig(Need: " + PIG_TIME["CutePig"] + " minutes)",
      "BlackPig(Need: " + PIG_TIME["BlackPig"] + " minutes)",
      "SuperPig(Need: " + PIG_TIME["SuperPig"] + " minutes)"
    ],
    // modal状态
    modalHidden: true,
    // modal - confirm text
    confirm: "YES",
    // modal - cancel text
    cancel: "NO",
    // 猪的图片名字 - 静态
    pigImgName: "ArrogantPig",
    // 猪的图片 - 动态
    pigImg: "https://raw.githubusercontent.com/samrayleung/wechat_pit_images/master/assets/img/" + this.pigImgName + ".png",
    // 猪的大小 - 动态
    pigSize: "width: " + IMG_SIZE_SMALL + "px;" +
    "height: " + IMG_SIZE_SMALL + "px;",
    // 剩余的时间 - 动态
    showTime: PIG_TIME[PIG_NAME_ARR[defaultPigIdx]] + ":00",
    // 按钮文字 - 动态
    btnText: "Start",
    // 按钮是否允许点击 - 动态
    isBtnDisabled: false,
    // 左计时圈角度 - 动态
    leftDegree: INIT_DEGREE.LEFT,
    // 右计时圈角度 - 动态
    rightDegree: INIT_DEGREE.RIGHT,

    // ----------------- UnBinding Datasource -----------------
    // 用户选择的持续的时间范围，[10 - 120], 单位：分钟，用于计算 - 不变
    selectedTime: PIG_TIME[PIG_NAME_ARR[defaultPigIdx]],
    // 剩余的持续毫秒数 - 动态
    lastedMS: PIG_TIME[PIG_NAME_ARR[defaultPigIdx]] * 60 * 1000,
    // 终止时间 - 不变
    endedTime: Date.now() + PIG_TIME[PIG_NAME_ARR[defaultPigIdx]] * 60 * 1000,
    // 开始时间 - 固定
    startTime: 0,
    // 计时状态 - 动态
    status: STATUS_WAITING,
    // 毫秒计时 - 动态
    currentTime: 0,
    // 猪因成长第一次改变的时间 - 动态
    firstChangeTime: 0,
    // 猪因成长第二次改变的时间 - 动态
    secondChangeTime: 0,
    // 猪因成长第三次改变的时间 - 动态
    thirdChangeTime: 0,
    // 猪是否被杀死
    isPigKilled: false,
    // 是否选猪状态
    isChoosingPig: false
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    util.createTestStorageData()
    this.setData({
      pigImg: "https://raw.githubusercontent.com/samrayleung/wechat_pit_images/master/assets/img/" + this.data.pigImgName + ".png"
    })
  },

  onReady: function () {
    // 页面渲染完成
  },

  onShow: function () {
    // 页面显示
    if (this.data.isPigKilled === true) {
      this.setData({
        modalHidden2: false
      })
    }

  },

  onHide: function () {
    // 页面隐藏
    if (this.data.status === STATUS_RUNNING) {
      this.killPig()
    }
  },

  onUnload: function () {
    // 页面关闭
  },

  // 跳转函数 - Binding
  navigateToFarm: function (e) {
    if (e.currentTarget.id === "332") {
      // Right Btn
      this.setData({
        actionSheetItems: [
          "Share To Wechat Moment",
          "Share To QQ Zone",
          "Share To Wechat Friends",
          "Share To QQ Friends"
        ],
        actionSheetHidden: false,
        isChoosingPig: false
      })

    } else {
      // Left Btn
      if (this.data.status === STATUS_RUNNING) {
        this.setData({
          actionSheetItems: [
            "ArrogantPig(Need: " + PIG_TIME["ArrogantPig"] + " minutes)",
            "CutePig(Need: " + PIG_TIME["CutePig"] + " minutes)",
            "BlackPig(Need: " + PIG_TIME["BlackPig"] + " minutes)",
            "SuperPig(Need: " + PIG_TIME["SuperPig"] + " minutes)"
          ],
          killPigModalHidden: false,
          isChoosingPig: true
        })

      } else {
        wx.navigateTo({
          url: "../Farm/Farm"
        })
      }
    }
  },

  // 开始按钮动作 - Binding  
  startBtnClicked: function (e) {
    this.setData({
      actionSheetItems: [
        "ArrogantPig(Need: " + PIG_TIME["ArrogantPig"] + " minutes)",
        "CutePig(Need: " + PIG_TIME["CutePig"] + " minutes)",
        "BlackPig(Need: " + PIG_TIME["BlackPig"] + " minutes)",
        "SuperPig(Need: " + PIG_TIME["SuperPig"] + " minutes)"
      ],
      isChoosingPig: true,
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  // 开始计时
  startTimer: function (e) {
    if (this.data.status !== STATUS_RUNNING) {
      this.setData({
        status: STATUS_RUNNING,
        startTime: Date.now(),
        lastedMS: this.data.selectedTime * 60 * 1000 - 1000,
        endedTime: this.data.selectedTime * 60 * 1000 + Date.now(),
        isBtnDisabled: true,
        currentTime: 0,
        leftDegree: INIT_DEGREE.LEFT,
        rightDegree: INIT_DEGREE.RIGHT,
      })

      let lastedMS = this.data.lastedMS
      this.setData({
        firstChangeTime: lastedMS * PIG_GROW_CHANGE_1ST,
        secondChangeTime: lastedMS * PIG_GROW_CHANGE_2ND,
        thirdChangeTime: lastedMS * PIG_GROW_CHANGE_3RD,
        pigSize: "width: " + IMG_SIZE_SMALL + "px;" +
        "height: " + IMG_SIZE_SMALL + "px;"
      })

      this.timer = setInterval((function () {
        this.updateTimer()
        this.pigGrowingUp()
        this.updateCircleProgress()
      }).bind(this), 1000)

    } else {
      this.resetBtn()
    }
  },

  // 更新计时器  
  updateTimer: function () {
    if (Date.now() >= this.data.endedTime) {
      this.setData({
        status: STATUS_COMPLETED,
        showTime: "Complete",
        btnText: "Reset"
      })

      this.storageHandle()
      this.resetBtn()

    } else {
      let lastedMS = this.data.lastedMS
      this.setData({
        lastedMS: lastedMS - 1000
      })

      let dic = util.formatMS(lastedMS)
      let hour = dic["hour"]
      let minute = dic["minute"]

      hour = util.padLeft(hour, 2)
      minute = util.padLeft(minute, 2)

      this.setData({
        showTime: hour + ":" + minute
      })
    }
  },

  // 重置内容
  resetBtn: function () {
    this.setData({
      status: STATUS_COMPLETED,
      isBtnDisabled: false,
      btnText: "Start"
    }),
      this.timer && clearInterval(this.timer)

    // 通过播放空音频的方法 - 停止音乐
    wx.playBackgroundAudio({
      dataUrl: "https://raw.githubusercontent.com/samrayleung/wechat_pit_images/master/assets/audio/" + "none" + ".mp3"
    })
  },

  // 更新计时圈状态
  updateCircleProgress: function () {
    let lastedTime = this.data.selectedTime * 60 * 1000
    let lastedMS = this.data.lastedMS
    let currentTime = this.data.currentTime
    let halfTime = lastedTime / 2

    if (lastedMS > lastedTime / 2) {
      this.setData({
        leftDegree: INIT_DEGREE.LEFT - (180 * currentTime / halfTime)
      })
    } else {
      this.setData({
        leftDegree: -135,
        rightDegree: INIT_DEGREE.RIGHT
        - (180 * (Date.now() - (this.data.startTime + halfTime)) / halfTime)
      })
    }
  },

  // 设置时间 - deprecated
  // setTimer: function (e) {
  //   // 运行时不能设置时间
  //   if (this.data.status === STATUS_RUNNING) {
  //     return
  //   }

  //   // 根据角度设置时间
  //   console.log(e)
  // },

  // 猪因成长而改变图片  
  pigGrowingUp: function () {
    let currentTime = this.data.currentTime
    this.setData({
      currentTime: currentTime + 1000
    })

    if (currentTime >= this.data.firstChangeTime &&
      currentTime < this.data.secondChangeTime) {
      this.setData({
        pigSize: "width: " + IMG_SIZE_MIDDLE + "px;" +
        "height: " + IMG_SIZE_MIDDLE + "px;"
      })
    } else if (currentTime >= this.data.secondChangeTime &&
      currentTime < this.data.thirdChangeTime) {
      this.setData({
        pigSize: "width: " + IMG_SIZE_LARGE + "px;" +
        "height: " + IMG_SIZE_LARGE + "px;"
      })
    } else if (currentTime >= this.data.thirdChangeTime) {
      this.setData({
        pigSize: "width: " + IMG_SIZE_EXTRA_LARGE + "px;" +
        "height: " + IMG_SIZE_EXTRA_LARGE + "px;"
      })
    }
  },

  // 点击背景隐藏actionSheet - Binding
  actionSheetChange: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  // 选猪事件
  bindItemTap: function (e) {
    let idx = e.currentTarget.id

    if (this.data.isChoosingPig === true) {
      let pigName = PIG_NAME_ARR[idx]
      this.setData({
        pigImgName: pigName,
        pigImg: "https://raw.githubusercontent.com/samrayleung/wechat_pit_images/master/assets/img/" + pigName + ".png",
      })

      this.setData({
        selectedTime: PIG_TIME[PIG_NAME_ARR[idx]],
        showTime: PIG_TIME[PIG_NAME_ARR[idx]] + ":00",
        modalHidden: !this.data.modalHidden
      })


    } else {
      this.setData({
        modal2Msg: "The Api Of Wechat haven`t been opened",
        modalHidden2: !this.data.modalHidden2
      })
    }

    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  // 确定开始 - Binding  
  modalChange: function (e) {
    if (e.type === "confirm") {
      this.startTimer()

      // 加载背景纯音乐
      wx.playBackgroundAudio({
        dataUrl: "https://raw.githubusercontent.com/samrayleung/wechat_pit_images/master/assets/audio/" + "kevin-kern" + ".mp3"
      })
    }

    this.setData({
      modalHidden: !this.data.modalHidden
    })
  },

  // 猪死提示 - Binding  
  modalChange2: function (e) {
    this.setData({
      modalHidden2: !this.data.modalHidden2
    })
  },

  // 确认杀猪 - Binding  
  killPigModalChange: function (e) {
    if (e.type === "confirm") {
      wx.navigateTo({
        url: "../Farm/Farm"
      })
      // kill pig
      this.killPig()
    }

    this.setData({
      killPigModalHidden: !this.data.killPigModalHidden
    })
  },

  // 杀猪函数
  killPig: function () {
    this.resetBtn()
    this.setData({
      modal2Msg: "Your lovely pig was killed",
      pigImgName: "blood_meat",
      pigImg: "https://raw.githubusercontent.com/samrayleung/wechat_pit_images/master/assets/img/" + "blood_meat" + ".png",
      pigSize: "width: " + IMG_SIZE_EXTRA_LARGE + "px;" +
      "height: " + IMG_SIZE_EXTRA_LARGE + "px;",
      isPigKilled: true
    })

    wx.playBackgroundAudio({
      dataUrl: "https://raw.githubusercontent.com/samrayleung/wechat_pit_images/master/assets/audio/" + "kill_pig" + ".mp3"
    })
  },

  // 缓存处理
  storageHandle: function () {
    let date = new Date()
    let currentDate = date.toLocaleDateString()
    let storage = wx.getStorageSync(currentDate)
    if (!storage) {
      let arr = [this.data.pigImgName]
      let num = 1
      wx.setStorageSync(currentDate, {
        "NumberOfTodayPigs": num,
        "ArrayOfTodayPigsImgsName": arr
      })

      console.log("None Storage")
    } else {
      let arr = storage.ArrayOfTodayPigsImgsName
      let num = storage.NumberOfTodayPigs

      arr.push(this.data.pigImgName)
      num += 1

      wx.setStorageSync(currentDate, {
        "NumberOfTodayPigs": num,
        "ArrayOfTodayPigsImgsName": arr
      })
    }
  }

})