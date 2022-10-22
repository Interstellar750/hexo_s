---
title: '手机使用 ADB 与 Fastboot 给另一台手机执行命令'
created: 2022-05-10 22:01:50
updated: 2022-10-23
tags: ['ADB', '技术']
summary: '未完成，而且好像没找到免 root 执行 fastboot 命令的办法'
---

  **你好，欢迎来看文章！**~~请问你是手机坏了还是电脑坏了~~
  
  **这次就不说什么前言了，adb 不会用我也难教**
 
 # 准备工作
  
  **首先确定这篇教程是干嘛的，使用一台手机给另一台手机运行 adb 与 fastboot 命令**
  所以主要说的地方是如何在手机上建立起 adb 环境，当然 adb 命令基本通用，也可以参考一下
  
  ### 需要的东西
  
  ```
  连接两台设备(手机)的数据线，也可以用一条线加OTG的方法
  如果是进行非救砖操作，也可以通过网络 adb 进行命令
  至少有一台设备(手机)能正常运行，可访问网络
  ```
 
 ## 在你的手机上建立起 adb 环境
 
 ### 针对拥有 root 权限的手机
 
 **很好，你拥有 root 权限，那么这个过程对你来说会顺利很多，没 root 可就麻烦咯**
 
 #### 1. 使用~~熟悉的~~ Termux
 
 **首先，做好前置准备工作，有些人可能不知道，所以再讲一遍**
 
 ```
 pkg update // 更新包
 pkg install android-tools // 安装安卓工具（包含adb工具）
 ```
 
 确定安装等进度条跑完后，试着运行 `` adb devices `` 看看有没有反应，正常情况如下
 
 ```
 ~ $ adb devices
 * daemon not running; starting now at tcp:5037
 * daemon started successfully
 List of devices attached
 /* 如果有已连接的设备会在此列出 */
 ```
 
 连接到设备然后看看行不行，安卓机子相互连大部分时候是不需要驱动的
 
 #### 2. 使用 ADB 工具安装器
 
 下载 ADB 工具安装器   **[酷安](https://www.coolapk.com/apk/crixec.adbtoolkitsinstall)  |  [Hubert's Box](https://t5d.trle5.tk/Apk/ADB-tools-3.0.apk)**
 
 这个工具可以让你直接运行 adb 命令，但没有 root 权限会导致无法运行 fastboot 命令，也提供了可以把 adb 命令安装到系统里的功能
 
 