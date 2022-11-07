---
title: '在 Chrome OS 上为 Linux 虚拟机开启动态磁盘大小'
created: 2022-10-22
updated: 2022-11-08
image: /post/动态分配crostini/Linux.png
tags: 
   - Chrome OS
   - Linux
   - 小教程
summary: '不用再反复给 Linux 虚拟机调整磁盘大小了'
---

好像有段时间没写文章了，这次整一篇挺简单但没什么人知道的小教程

**此教程对支持 Linux 容器的 Chrome OS / Chromium OS 同通用，不过都写上就名称太长，就只用 Chrome OS 这个名称了**

## 关于 Chrome OS 上的 Linux 容器

这个功能是 Chrome OS 设置里的开发者选项中的一个功能，名为 **Linux 开发环境**，也就是一个运行在容器内的 Linux 系统（可以安装 GUI 程序来运行哦）

一些第三方的 Chromium OS 也支持这个功能，例如 [Fyde OS](https://fyde.com/) 和 [ChromeOS Flex](https://chromeenterprise.google/os/chromeosflex/)，他们的差别大同小异，运行的发行版都是 [Debian Bullseye](https://www.debian.org/releases/bullseye/)

## 为 Chrome OS 的 Linux 容器磁盘开启动态分区

其实挺简单的，具体一句话就可以说完，就是拿个备份还原到没有开启 Linux 容器的机子上就行

首先你必须有一份后缀名为 `.crostini` 的 Linux 容器备份文件，在系统的 `开发者选项` > `Linux 开发环境` > `备份和恢复` 即可看到创建备份文件的选项

如果你还没有启用 Linux 开发环境，直接启用然后再备份也行，一份刚安装好的 Linux 容器备份出来的 crostini 镜像大小大概在 320MB 左右

但如果你已经安装好它且用了一段时间甚至用了更长时间了的话，是要备份还是重新搞一个就需要自己取舍了

开始备份后你可以在系统的通知面板看到备份进度，耐心等等

备份成功后你会在系统的下载内容目录中看到一个后缀名为 `.crostini` 的文件，此时就可以开始操作了

### 1. 删除原有的 Linux 开发环境

是没什么注意事项，就是不要在有重要文件但还没备份成功的时候就删掉就行，说出去可能会让人家笑话

删除的地方在系统的 `开发者选项` > `Linux 开发环境` > `移除 Linux 开发环境`

### 2. 还原 .crostini 备份镜像

在下载内容中找到备份的镜像，右键还原即可

||不要忘记自己把文件放哪去了||

## 成功

还原成功后，再进入设置查看 Linux 开发环境就可以看到磁盘大小为 **动态分配** 了，再打开 Linux 应用测试一下是否正常就可以了

**我没碰见什么 bug，之前我还以为需要在 crosh 里使用 vmc 新建一个虚拟机才行，看来是我想多了**
