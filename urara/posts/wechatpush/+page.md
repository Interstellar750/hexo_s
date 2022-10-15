---
title: 使用 FarPush 搭建微信消息推送服务
created: 2022-09-01
updated: 2022-09-15
tags: ['微信', '信息推送', 'FarPush']
---

好久不见，距离上次更新文章的时间是有点长了呢，不过还是欢迎你来看文章！

 ## 前言
  
  如果你像我一样注重手机后台会有哪些软件在运行，哪些软件是必要待在后台持续运行，哪些软件又是没有必要呆在后台占用系统资源的，那你一定知道 QQ 和微信这两个国内常见的社交软件，还有他们恐怖的空间与系统资源占用
  
  我是很不喜欢这样的软件，我并没有那个能力每年跟进最新配置的手机，也没有办法摆脱对它们的依赖，我也不会为了长续航去选择电池大且厚重的手机，我只能防止它们在我的后台占用资源，也就造成了每当有人找我时，并不能及时的获得通知且考虑回复，会耽误事也会尴尬
  
  还好，我发现了搭建微信推送的方法，不过我还是依然讨厌这种软件
  
 # FarPush 介绍
 
  这个软件好像有点年头了，不过我是最近才在 BiliBili 上看到，是有点火星了
  
 ## 应用与项目介绍
  
  [FarPush](https://www.coolapk.com/apk/com.farplace.farpush) 为安卓手机端软件，WeChatPush 项目为其的后端，截至本文发布时，FarPush 依然还提供软件内后端，但这个后端我不太清楚是运行在软件内还是其他服务器，我也没找到作者在哪里有说明
  
  [WeChatPush](https://github.com/TSIOJeft/WeChatPush) 项目由 Python 驱动，只要有 Python 环境就可以运行，可以说是跨平台后端，需要使用 FarPush 作为推送信息接收器，但内存和后台占用比微信本身小了非常多
  
  我在这里会先提供在 Linux 与安卓(依然是用 Termux) 的部署方法，Windows 的话要缓一缓了
  
  
 # 准备部署工作

 ##### 此软件并不使用 Web 的微信，不会因为 Web 端被禁止登录无法使用的问题，但会占用微信 PC 端
 
 ### 需要的东西
  
  ```
  一台拥有 Python 环境的设备，Python 版本至少为 Python3
  pip 软件包管理器，作者推荐使用 pip3，但似乎是非强制要求
  拥有独立 IP 的服务器或拥有独立 IP 且懂得配置端口转发的家庭网络
  // 上一条条件是需要使用到快速回复功能的要求，部署在局域网或获取推送信息的本机上可以不需要独立 IP
  ```

 #### 软件和仓库链接，以及作者的主页 
  FarPush 下载地址: [__酷安__](https://www.coolapk.com/apk/com.farplace.farpush)
  WeChatPush 项目仓库地址: [__GitHub__](https://github.com/TSIOJeft/WeChatPush)
  作者的酷安账号: [__FarPlace__](https://www.coolapk.com/u/2838135)
  BiliBili 用户页: [__远方的重生__](https://sapce.bilibili.com/10721579) (不太确定是不是作者本人) 
  
 # 开始搭建
  
 ## 在 Android (Termux) 上部署 FarPush
  
 ### 获取更新和克隆仓库
  
  ```
  pkg update
  pkg upgrade
  // 可能会询问一些包的设置，可全部按回车
  ```
  
 ### 安装一些必要的软件包
  
  ```
  apt install git python3 pip vim
  ```
  
  以上命令会安装四个软件包，`git` 用于克隆项目仓库，`python3` 为仓库运行需要环境，`pip` 用于安装项目需要的 Python 依赖， `vim` 用于编辑 项目配置文件
  
  软件安装完成后，大概会占用 `600 MB` 左右大小的空间，占的最多的还是 Python3
  
 ### 克隆仓库与配置消息转发的端口
 
 ```
 git clone https://github.com/TSIOJeft/WeChatPush
 ```
 
 克隆项目仓库到当前目录，如果发现在自己不熟悉的目录，可使用 `cd ~` 切换当前工作目录到用户根目录

  克隆完成后需要在手机上安装 FarPush 获取推送特征码，Farpush 下载链接可见[之前部分](./#软件和仓库链接，以及作者的主页)
  
  FarPush 推送特征码可见`左上角菜单` > `转接设备` > `右下角按钮`，可根据手机支持的推送服务复制对应的推送特征码(截至 22.09.07 ，fcm 推送渠道并未支持)，然后编辑项目内的 `WeChatPush/itchat/config.py` 文件
  
  ```
  cd WeChatPush/itchat/ 
  // 切换到项目的 itchat 目录内
  vi config.py
  // 编辑配置文件
  ```
  
  当你执行完上面两行命令时，你会进入到 vim 的操作界面，按方向键把光标移到最下面，你会看见这一段文本
  
  ```
  # if show self send mes // 翻译过来就是在程序运行中是否显示自己回复的信息
  SELF_MES = False
  PUSH_REGID = '删掉此段文字，替换为你在手机上得到的推送特征码'
  # 0 for mi , 1 for oppo 2 for huawei 4 for tencent 
  PHONE_TYPE = 4 // 4 使用即腾讯推送，基本上全部手机都支持，只不过非系统级推送，可能需要给予 FarPush 一直在后台运行的权限
  BLOCK_NAME = [] // 此处填入群或用户的昵称可屏蔽接受对应对话的消息
  # through message if you want reply mes just set it for 1
  MES_THROUGH = 1 // 改为 1 可使用通知栏快捷回复信息
  ```

  根据提示填入推送特征码和根据需求调整选项，vim 使用方法可到网上找找，如果有图形编辑器可以更方便，只不过 Termux 的 `home` 目录在手机根目录的 `/data/data/com.termux/` 内，没有 root 权限可能无法访问和编辑
  