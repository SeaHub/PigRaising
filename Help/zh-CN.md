* # PigRaising

  这是一个在iFanr与Segmentfault举办的广州黑客马拉松上产生的微信小程序，用于专注管理时间。

  - 程序小览

    ![QuickLooking](https://github.com/samrayleung/wechat_pit_images/blob/master/assets/img/PigRaising.gif?raw=true)

  - 程序相关

    - 程序版本: 1.0.0
    - 开发环境：微信Web开发者工具 + Egret Wing 3

  - 程序介绍

    - 每只猪代表一个持续的时间段，选择一只猪，把它养大！
    - 点击开始按钮选择一个时间段（选择一只猪）。点击确认后程序开始倒计时，在倒计时范围内，任何打断程序的功能都不能使用（比如说把程序切换到后台以及退出程序等）。一旦切换，则可爱的小猪将会死亡。每度过专注时间的20%，40%，80%，猪将会获得一次长大。在完全度过专注时间后，倒计时将停止，可爱的小猪将会在猪场出现。赶快来养猪吧:-P！

  - 程序主要功能

    - 倒计时钟：主界面，用于倒计时，养猪过程中会播放一段纯音乐（已完成）。
    - 养猪场：用于显示已养大的所有的猪（已完成）。
    - 杀猪场历史：可以查看之前养大的猪（已完成）。
    - 杀猪事件：监听程序退出、界面转换以及切换后台，一旦切换则杀猪，并播放杀猪声音（已完成）。
    - 每周完成概况：用于显示每天 ~~养了~~ 专注了多少小时的 ~~猪~~ 时间（开发中）。
    - 缓存优化：减少使用过程中的流量消耗（开发中）。
    - 分享功能：用于分享（未完成）。
    - 偷猪功能：可以偷好友的猪（未完成）。

  - 参与开发

    1. Git克隆/ 直接下载本代码。

    2. 使用 [微信Web开发者工具（v 0.9)](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html?t=1475052055364) 打开已下载好的项目文件。

    3. 填写下面的项目设置，AppID选择无。

       ![Quick Looking](https://raw.githubusercontent.com/SeaHub/PigRaising/master/Help/Settings.png)

    4. 希望你能够享受开发过程的快乐！

  - 下载资源

    - 所有程序用到的资源（包括音频与图片）都在 [Samrayleung`s github](https://github.com/samrayleung/wechat_pit_images) 上。

  - 感谢

    - 我的队友
      - [Seahub](https://seahub.github.io)
      - [Samray](https://github.com/samrayleung)
      - [Nomadcheng](https://github.com/Nomadcheng)
    - iFanr x Segmentfault
      - 感谢他们举办了广州第一场微信小程序的黑客马拉松，让我们有机会创造这个小程序!
    - 支持者
      - 感谢你们使用我们的小程序！