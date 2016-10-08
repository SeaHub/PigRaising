/*
  传入173,000ms 返回 2:53
  @parma millisecond 毫秒值
  @return Object
  - "hour"   => 小时
  - "minute" => 分钟
*/
function formatMS(millisecond) {
    let temp = millisecond % 60000
    let hour = millisecond / 60000
    let minute = temp / 1000

    return {
        "hour": Math.floor(hour),
        "minute": minute
    }
}

// 左补0
function padLeft(str, len) {
    str = '' + str;
    return str.length >= len ? str : new Array(len - str.length + 1).join("0") + str;
}

// 右补0
function padRight(str, len) {
    str = '' + str;
    return str.length >= len ? str : str + new Array(len - str.length + 1).join("0");
}

// 创建测试缓存数据
function createTestStorageData() {
    let baseDateString = "2016/10/"
    let dateString = baseDateString + "7"
    let num = 2
    let arr = ["SuperPig", "SuperPig"]


    wx.setStorageSync(dateString, {
        "NumberOfTodayPigs": num,
        "ArrayOfTodayPigsImgsName": arr
    })
}

// 根据日期获取缓存
function getSpecialDateDate(dateString) {
    let storage = wx.getStorageSync(dateString)
    if (!storage) {
        console.log("No Storage")
        return
    }

    return {
        "NumberOfTodayPigs": storage.NumberOfTodayPigs,
        "ArrayOfTodayPigsImgsName": storage.ArrayOfTodayPigsImgsName
    }
}

module.exports = {
    formatMS: formatMS,
    padLeft: padLeft,
    padRight: padRight,
    createTestStorageData: createTestStorageData,
    getSpecialDateDate: getSpecialDateDate
}
