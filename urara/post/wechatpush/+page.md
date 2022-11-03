---
title: '使用 FarPush 搭建微信消息推送服务'
created: 2022-09-01
updated: 2022-11-03
image: /post/wechatpush/farpush-hms.jpg
tags: 
   - FarPush
   - 推送服务
summary: '在不保留微信后台的前提下正常收到通知推送'
---

这张图使用了 FarPush 中支持的 HMS Push 服务，在非华为手机上启用 HMS Push 可见 [fei-ke](https://github.com/fei-ke/) 的 [HMSPush](https://github.com/fei-ke/HMSPush) 项目

##### 好久不见，距离上次更新文章的时间是有点长了呢，不过还是欢迎你来看文章！

## 前言

如果你像我一样注重手机后台会有哪些软件在运行，哪些软件是必要待在后台持续运行，哪些软件又是没有必要呆在后台占用系统资源的，那你一定知道 QQ 和微信这两个国内常见的社交软件，还有他们恐怖的空间与系统资源占用

我是很不喜欢这样的软件，我并没有那个能力每年跟进最新配置的手机，也没有办法摆脱对它们的依赖，我也不会为了长续航去选择电池大且厚重的手机，我只能防止它们在我的后台占用资源，也就造成了每当有人找我时，并不能及时的获得通知且考虑回复，会耽误事也会尴尬

还好，我发现了搭建微信推送的方法，不过我还是依然讨厌这种软件

# FarPush 介绍

这个软件好像有点年头了，不过我是最近才在 BiliBili 上看到，是有点火星了

## 应用与项目介绍

[FarPush](https://www.coolapk.com/apk/com.farplace.farpush) 为安卓手机端软件，WeChatPush 项目为其的后端，**截至本文发布时，FarPush 依然还提供软件内后端，但这个后端我不太清楚是运行在软件内还是其他服务器，我也没找到作者在哪里有说明**

[WeChatPush](https://github.com/TSIOJeft/WeChatPush) 项目由 Python 驱动，只要有 Python 环境就可以运行，可以说是跨平台后端，需要使用 FarPush 作为推送信息接收器，但内存和后台占用比微信本身小了非常多

我在这里会先提供在 Linux 与安卓(依然是用 Termux) 的部署方法，Windows 的话要缓一缓了

# 准备部署工作

**此软件并不使用 Web 的微信，不会因为 Web 端被禁止登录无法使用的问题，但会占用微信 PC 端**

### 需要的东西

```
一台拥有 Python 环境的设备，Python 版本至少为 Python3
pip 软件包管理器，作者推荐使用 pip3，不过我自己试了试，不是强制要求
拥有独立 IP 的服务器或拥有独立 IP 且懂得配置端口转发的家庭网络
// 上一条条件是需要使用到快速回复功能的要求，部署在局域网或获取推送信息的本机上可以不需要独立 IP
```

#### 软件和仓库链接，以及作者的主页

FarPush 下载地址: [__酷安__](https://www.coolapk.com/apk/com.farplace.farpush)

WeChatPush 项目仓库地址: [__GitHub__](https://github.com/TSIOJeft/WeChatPush)

作者的酷安账号: [__FarPlace__](https://www.coolapk.com/u/2838135)

BiliBili 用户页: [__远方的重生__](https://sapce.bilibili.com/10721579) (不太确定是不是作者本人) 

# 开始搭建

**这里先讲如何安装 WeChatPush 到设备上，后面再统一讲如何配置**

------------

## 在 Android (Termux) 上配置 WeChatPush

**作者的视频里说的方法是用 Termux 来安装完整 Linux 容器后再安装在容器里，但我自己试了试发现其实在 Termux 的模拟环境里也能跑，还能节省空间**

#### 获取更新与升级软件，安装必要软件包

```
pkg update
pkg upgrade
// 安装过程可能会询问一些包的设置，可全部按回车
apt install git vim python3 pip
```

以上命令会安装四个软件包，`git` 用于克隆项目仓库，`python3` 为仓库运行需要环境，`pip` 用于安装项目需要的 Python 依赖， `vim` 用于编辑项目配置文件

软件安装完成后，大概会多占用 `600 MB` 左右大小的空间，其中占的最多的还是 python3，不安装其他大软件包的话，Termux 就得占用大致 `900 MB` 了，空间不足的话要注意一下

------------

## 在 Linux 上部署 WeChatPush

**提一句架构问题，见过好多软件因为处理器架构的问题跑不起来，目前我在 arm64 与 x86-64 价格的 Linux 上尝试过搭建 WeChatPush，未见兼容性问题，其他架构的需要自己试试了**

好像之前都没有说关于 Linux 版本的问题，没有特殊说明的话一般都是用 Debian 系，apt 包管理器

### 更新源并升级软件，安装软件

```
sudo apt update
sudo apt upgrade
// 中途有停顿也可以根据个人喜好选择
```

```
sudo apt install git vim python3 python3-pip
```

|| 提一句：作者好像喜欢用 `nano`，使用 `nano` 以支持作者 (这里说的作者不是我) ||

------------

## 修改配置文件

|| 上面的安装过程我觉得应该足够详细了吧... ||

### 克隆仓库与配置消息转发的端口

```
git clone https://github.com/TSIOJeft/WeChatPush
```

克隆项目仓库到当前目录，如果发现在自己不熟悉的目录，可使用 `cd ~` 切换当前工作目录到用户根目录

克隆完成后需要在手机上安装 FarPush 获取推送特征码，Farpush 下载链接可见[之前部分](/post/wechatpush/#准备部署工作)

FarPush 推送特征码可见应用内`左上角菜单` > `转接设备` > `右下角按钮`，可根据手机支持的推送服务复制对应的推送特征码(截至 22.11.03 ，fcm 推送渠道并未支持)，然后编辑项目内的 `WeChatPush/itchat/config.py` 文件

```
cd WeChatPush/itchat/ 
// 切换到项目的 itchat 目录内
vi config.py
// 编辑配置文件
```

当你执行完上面两行命令时，你会进入到 vim 的操作界面，按方向键把光标移到最下面，你会看见这一段文本

```
# if show self send mes // 翻译过来就是在程序运行中是否显示自己发送出去的信息，改下一行
SELF_MES = False
PUSH_REGID = '删掉此段文字，替换为你在手机上得到的推送特征码'
# 0 for mi , 1 for oppo 2 for huawei 4 for tencent 
PHONE_TYPE = 4 // 如果使用腾讯推送可能需要给予 FarPush 一直在后台运行的权限
BLOCK_NAME = [] // 此处填入群名称或用户名可屏蔽接受对应的通知
# through message if you want reply mes just set it for 1
MES_THROUGH = 1 // 改为 1 可使用快捷回复信息
```

根据提示填入推送特征码和根据需求调整选项，vim 使用方法可到网上找找，如果有图形编辑器可以更方便，

**注意 Termux 的 `home` 目录在手机根目录的 `/data/data/com.termux/` 内，没有 root 权限可能无法访问和编辑**

## 开启推送服务

当你确保配置都配置完了，就可以尝试启动它了

确保你目前的工作目录在项目的根目录，然后使用 pip 来安装需要的程序包和依赖

```
pip install -r requirements.txt
// 如果使用 Linux， 也可以用 pip3 代替 pip
```

当安装完所需的软件后，就可以运行推送服务了

**需要注意，如果终端缩放过小，可能会导致二维码生成不完整或错乱，在 Termux 界面里可使用双指缩放来调整大小***

```
python3 main.py
```

执行以上命令后会输出一个二维码，使用手机微信客户端扫描登录即可，~~可截图登录，不需要用另一台手机拍照再扫描~~ **已失效**

登录可能会有点慢，登录完成后会对终端页面进行清屏，会显示登录微信帐号的用户名

这个时候就可以找个朋友或开个小号测试，但不可在手机客户端切换帐号测试，因为一切换就会判定微信退出登录，也会同时把微信的网页版、电脑桌面端和平板状态的微信客户端给退出登录

#### 一些注意事项

**如果使用 Termux， 要注意不要让它被系统省电策略干掉**

Termux 是支持卡片被划掉后终端继续运行的（至少在我的 Xperia 1 与 s10e 上可以），不过可能还是会被系统的省电策略干掉，WeChatPush 如果网络条件不好也可能蹦掉，但似乎它在崩掉之前会给你推送一条通知表示它掉了，这个问题我见过不少，但我不太清楚崩的原因是什么
