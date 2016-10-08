const util = require('../../utils/util.js')

Page({
  data: {
    percentA: 0, percentB: 0, percentC: 0, percentD: 0, percentE: 0, percentF: 0, percentG: 0
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },

  onReady: function () {
    // 页面渲染完成
    this.storageGet()
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

  // 获取缓存

  storageGet: function () {
    let app = getApp()
    let date = app.globalData.currentDate
    let day = date.getDay()
    let total = 0

    let key = date.toLocaleDateString();
    let data = wx.getStorageSync(key);
    let theDayBeforeTheDate = (date.getTime() - 24 * 60 * 60 * 1000);

    if (day === 1) {
      // 只取周一
      let num = data.NumberOfTodayPigs;
      this.setData({
        percentA: 10 * num
      })
    } else if (day === 2) {
      // 取周一和周二
      let theDayBefore2 = new Date(theDayBeforeTheDate);
      let key2 = theDayBefore2.toLocaleDateString();
      let data2 = wx.getStorageSync(key2);
      let num1 = data.NumberOfTodayPigs;
      let num2 = data2.NumberOfTodayPigs;
      this.setData({
        percentA: 10 * num1,
        percentB: 10 * num2
      })
    } else if (day === 3) {
      // 取周一周二、周三
      let theDayBefore2 = new Date(theDayBeforeTheDate);
      let key2 = theDayBefore2.toLocaleDateString();
      let data2 = wx.getStorageSync(key2);
      let theDayBeforeTheDate3 = (theDayBefore2.getTime() - 24 * 60 * 60 * 1000);
      let theDayBefore3 = new Date(theDayBeforeTheDate3);
      let key3 = theDayBefore3.toLocaleDateString();
      let data3 = wx.getStorageSync(key3);
      let num1 = data.NumberOfTodayPigs;
      let num2 = data2.NumberOfTodayPigs;
      let num3 = data3.NumberOfTodayPigs;
      this.setData({
        percentA: 10 * num1,
        percentB: 10 * num2,
        percentC: 10 * num3
      })
    } else if (day === 4) {
      // 取周一、周二、周三、周四 
      let theDayBefore2 = new Date(theDayBeforeTheDate);
      let key2 = theDayBefore2.toLocaleDateString();
      let data2 = wx.getStorageSync(key2);
      let theDayBeforeTheDate3 = (theDayBefore2.getTime() - 24 * 60 * 60 * 1000);
      let theDayBefore3 = new Date(theDayBeforeTheDate3);
      let key3 = theDayBefore3.toLocaleDateString();
      let data3 = wx.getStorageSync(key3);
      let theDayBeforeTheDate4 = (theDayBefore3.getTime() - 24 * 60 * 60 * 1000);
      let theDayBefore4 = new Date(theDayBeforeTheDate4);
      let key4 = theDayBefore4.toLocaleDateString();
      let data4 = wx.getStorageSync(key4);
      let num1 = data.NumberOfTodayPigs;
      let num2 = data2.NumberOfTodayPigs;
      let num3 = data3.NumberOfTodayPigs;
      let num4 = data4.NumberOfTodayPigs;
      this.setData({
        percentA: 10 * num1,
        percentB: 10 * num2,
        percentC: 10 * num3,
        percentD: 10 * num4
      })
    } else if (day === 5) {
      // 取周一到周五
      let theDayBefore2 = new Date(theDayBeforeTheDate);
      let key2 = theDayBefore2.toLocaleDateString();
      let data2 = wx.getStorageSync(key2);
      let theDayBeforeTheDate3 = (theDayBefore2.getTime() - 24 * 60 * 60 * 1000);
      let theDayBefore3 = new Date(theDayBeforeTheDate3);
      let key3 = theDayBefore3.toLocaleDateString();
      let data3 = wx.getStorageSync(key3);
      let theDayBeforeTheDate4 = (theDayBefore3.getTime() - 24 * 60 * 60 * 1000);
      let theDayBefore4 = new Date(theDayBeforeTheDate4);
      let key4 = theDayBefore4.toLocaleDateString();
      let data4 = wx.getStorageSync(key4);
      let theDayBeforeTheDate5 = (theDayBefore4.getTime() - 24 * 60 * 60 * 1000);
      let theDayBefore5 = new Date(theDayBeforeTheDate5);
      let key5 = theDayBefore5.toLocaleDateString();
      let data5 = wx.getStorageSync(key5);
      let num1 = data.NumberOfTodayPigs;
      let num2 = data2.NumberOfTodayPigs;
      let num3 = data3.NumberOfTodayPigs;
      let num4 = data4.NumberOfTodayPigs;
      let num5 = data5.NumberOfTodayPigs;
      this.setData({
        percentA: 10 * num1,
        percentB: 10 * num2,
        percentC: 10 * num3,
        percentD: 10 * num4,
        percentE: 10 * num5
      })
    } else if (day === 6) {
      //取周一到周六
      let theDayBefore2 = new Date(theDayBeforeTheDate);
      let key2 = theDayBefore2.toLocaleDateString();
      let data2 = wx.getStorageSync(key2);
      let theDayBeforeTheDate3 = (theDayBefore2.getTime() - 24 * 60 * 60 * 1000);
      let theDayBefore3 = new Date(theDayBeforeTheDate3);
      let key3 = theDayBefore3.toLocaleDateString();
      let data3 = wx.getStorageSync(key3);
      let theDayBeforeTheDate4 = (theDayBefore3.getTime() - 24 * 60 * 60 * 1000);
      let theDayBefore4 = new Date(theDayBeforeTheDate4);
      let key4 = theDayBefore4.toLocaleDateString();
      let data4 = wx.getStorageSync(key4);
      let theDayBeforeTheDate5 = (theDayBefore4.getTime() - 24 * 60 * 60 * 1000);
      let theDayBefore5 = new Date(theDayBeforeTheDate5);
      let key5 = theDayBefore5.toLocaleDateString();
      let data5 = wx.getStorageSync(key5);
      let theDayBeforeTheDate6 = (theDayBefore5.getTime() - 24 * 60 * 60 * 1000);
      let theDayBefor6 = new Date(theDayBeforeTheDate6);
      let key6 = theDayBefore6.toLocaleDateString();
      let data6 = wx.getStorageSync(key6);
      let num1 = data.NumberOfTodayPigs;
      let num2 = data2.NumberOfTodayPigs;
      let num3 = data3.NumberOfTodayPigs;
      let num4 = data4.NumberOfTodayPigs;
      let num5 = data5.NumberOfTodayPigs;
      let num6 = data6.NumberOfTodayPigs;
      this.setData({
        percentA: 10 * num1,
        percentB: 10 * num2,
        percentC: 10 * num3,
        percentD: 10 * num4,
        percentE: 10 * num5,
        percentG: 10 * num6
      })
    } else {
      //取全周数据
      let theDayBefore2 = new Date(theDayBeforeTheDate);
      let key2 = theDayBefore2.toLocaleDateString();
      let data2 = wx.getStorageSync(key2);
      let theDayBeforeTheDate3 = (theDayBefore2.getTime() - 24 * 60 * 60 * 1000);
      let theDayBefore3 = new Date(theDayBeforeTheDate3);
      let key3 = theDayBefore3.toLocaleDateString();
      let data3 = wx.getStorageSync(key3);
      let theDayBeforeTheDate4 = (theDayBefore3.getTime() - 24 * 60 * 60 * 1000);
      let theDayBefore4 = new Date(theDayBeforeTheDate4);
      let key4 = theDayBefore4.toLocaleDateString();
      let data4 = wx.getStorageSync(key4);
      let theDayBeforeTheDate5 = (theDayBefore4.getTime() - 24 * 60 * 60 * 1000);
      let theDayBefore5 = new Date(theDayBeforeTheDate5);
      let key5 = theDayBefore5.toLocaleDateString();
      let data5 = wx.getStorageSync(key5);
      let theDayBeforeTheDate6 = (theDayBefore5.getTime() - 24 * 60 * 60 * 1000);
      let theDayBefor6 = new Date(theDayBeforeTheDate6);
      let key6 = theDayBefore6.toLocaleDateString();
      let data6 = wx.getStorageSync(key6);
      let theDayBeforeTheDate7 = (theDayBefore6.getTime() - 24 * 60 * 60 * 1000);
      let theDayBefor7 = new Date(theDayBeforeTheDate7);
      let key7 = theDayBefore7.toLocaleDateString();
      let data7 = wx.getStorageSync(key6);
      let num1 = data.NumberOfTodayPigs;
      let num2 = data2.NumberOfTodayPigs;
      let num3 = data3.NumberOfTodayPigs;
      let num4 = data4.NumberOfTodayPigs;
      let num5 = data5.NumberOfTodayPigs;
      let num6 = data6.NumberOfTodayPigs;
      let num7 = data7.NumberOfTodayPigs;
      this.setData({
        percentA: 10 * num1,
        percentB: 10 * num2,
        percentC: 10 * num3,
        percentD: 10 * num4,
        percentE: 10 * num5,
        percentF: 10 * num6,
        percentG: 10 * num7
      })
    }
  }

})