---
title: '搭建一个自己的博客'
created: 2022-03-05 19:01:48
updated: 
tags: ['技术', '博客', 'GitHub', '域名', 'DNS']
---
  你好！这里是 Hubert ，欢迎来我的博客看文章！
 
 ## 如何搭建自己的博客
 搭建博客并没有那么困难，大部分的时候只需要跟着步骤走就行，当然有时候碰见 bug 会是不可避免的事，这就得看运气了 ~~我是属于运气差的那一类人。~~
 
 本文里使用的博客框架为 [Hexo](https://github.com/hexojs/hexo) ，服务器使用 [GitHub Pages](github.io)。域名可使用 Github Pages 默认域名或自定义
 
 ### 那么就正式开始吧，毕竟我也不会写太多介绍
 #### 搭建博客需要准备的东西：
 ```
 1. 可正常使用且没有被限制的 GitHub 账户
 2. 搭载 Windows、Linux 或 Android 的设备
 3. 良好的网络环境（我不知道啊你不要问我）
 ```
首先创建 GitHub 账户，因为我们搭建博客要用到 GitHub Pages ，注册过程我就不多阐述了，看不懂可以打开浏览器的翻译功能，也可以在搜索引擎寻找对应的教程。
创建完了 GitHub 账户，需要创建一个仓库（Repositories）用于存放博客文件和启用 GitHub Pages 。

登录到 GitHub 网页版后，可以看见左上角的 **Recent Repositories** 旁有个 **New** 按钮，点击它来新建仓库![](/images/post/05/github202203051935.png)
如果是使用手机来访问，可以进入 `https://github.com/<你的github用户名>?tab=repositories` ，就能看见那个New按钮了 ![](/images/post/05/github202203051951.png)

创建仓库需要设定仓库名与仓库类型（公开或私密），如果你希望使用 Github Pages 给的二级域名，你需要把仓库名设为 `<你的GitHub用户名>.github.io` ，否则你的 Github Pages 网页会变成 `<你的GitHub用户名>.github.io/<创建的仓库名>`，但如果你使用自定义域名的话随便设置都没问题，仓库类型推荐使用公开，因为似乎只有 Github 付费用户才能在私密的仓库中开启 Github Pages 功能。

到这里  Github 的设置基本就完成了，接下来就应该开始配置 hexo 客户端了

## 配置 Hexo 客户端

一旦配置完 Hexo 客户端，博客控制文件是全平台通用的，所以这里只说明如何在各个客户端配置，搭建以及部署后面统一讲。

------------

### 在 Windows 设备上配置 Hexo 客户端

首先要安装 Windows 版 [Node.js](https://nodejs.org/en/download/) ，选择 **Windows Installer**

安装完成后测试是否正常

```
node -v
npm -v
```

都能正常提示版本号的话，那就可以直接安装 Hexo 客户端

```
npm install -g hexo-cli
hexo version  # 检查 hexo 是否正常
```

然后还需要安装一下 Git , 方法有两个。

1. 进入 [Git官网](https://git-scm.com/) 下载常规安装包
2. 使用winget `winget install --id Git.Git -e --source winget`

这时候就可以部署 Hexo 了，创建一个放博客的文件夹比较好，推荐在用户文件夹下创建一个 hexo 文件夹给它，当然如果你已经在其他平台配置过了，也可以cd到那个文件夹直接进去继续操作。

```
cd C:/Users/<你的用户名>/hexo/
cd /d <目录>  # CMD用户使用这条命令来切换目录
hexo init
```
到这里的 Windwos上的 hexo 已经部署完成了

------------

### 在 Linux 设备上配置 Hexo 客户端

相比于 Windows ，Linux 上的 Hexo 安装更为简单，只用在命令行运行几个命令

```
$ sudo apt update
$ sudo apt install nodejs
$ sudo apt install git # 如果已经安装了git可以跳过这一步
$ sudo npm install -g hexo-cli
$ hexo version
```

挺简单的，接着在`~/`下创建一个`hexo`文件夹再部署就行

```
$ mkdir hexo
$ cd hexo
$ hexo init # 此步如果有报错，请使用sudo执行或清空部署文件夹
```

完成

------------

###  在 Android 设备上配置 Hexo 客户端

#### 由于考虑到一些手机品牌的不可获取 root 性，本文章使用 Termux 来运行命令

#### 但由于 Termux 的默认用户文件夹是在 `/data/data/com.ternux/files/home/` 下，没有 root 权限可能无法读取和写入文件，用户可能要慎重考虑一下，博客可以部署到 GitHub Pages 上，但后端控制文件可能得找其他办法传输出来。


##### 不然也可以尝试在手机上安装完整 Linux 虚拟机

#### 安装 Termux 

下载链接 [~~Play Store~~](https://play.google.com/store/apps/details?id=com.termux) 不推荐，已经很久没更新了 | [F-Droid](https://f-droid.org/repo/com.termux_118.apk) | [Hubert's Box](https://t5d.trle5.tk/Apk/com.termux_118_f-droid.apk) 下载速度有点堪忧


安装并打开，等待下载需要的配置文件

更新源与升级

```
$ pkg update
$ pkg upgrade
# 如果以上命令不可用，可以试试把pkg改成apt，即 apt update
```

upgrade 中途可能有选择停顿，可根据个人喜好选择

安装 Termux root 工具

```
$ pkg install tsu # 手机有 root 权限选择这个
$ pkg install proot # 手机没有 root 权限选择这个
```

切换到 root

```
$ tsu # tsu使用这条命令，执行后会向手机索要root权限
$ termux-chroot # proot 使用这条命令，运行后 ~$ 没有变化 ，但权限有变
```

安装 nodejs 和 git 以及 hexo-cli 

```
$ pkg install nodejs
$ node -v && npm -v # 查看nodejs与npm的版本
$ pkg install git # 已安装git可以忽略此行
$ npm install -g hexo-cli
$ hexo version
```

这下 hexo 客户端已经成功部署到 Termux 了，来创建文件夹部署博客文件吧

Termux 的默认文件夹在安卓系统的 `/data/data/com.termux/files/home/` ，最好也是在 home 下创建一个 hexo 文件夹部署进去

```
$ mkdir hexo # 如果是用的系统 su ，记得观察路径是不是在 Termux 的 home 文件夹下( termux-chroot 显示为 ~$ )，以免破坏 Android 系统
$ cd hexo
$ hexo init
```

走完进度条也就部署完成了

## 在三个平台的部署都完成了，接下来要尝试让它在本地服务器上运行

#### 下面的 `hexo generate`  `hexo server` 和后面要讲的 `hexo deploy`，都可以使用 `hexo g` `hexo s` `hexo d`来代替，作用是一样的，也就是 **g**enerate **s**erver **d**eploy 三个单词的首字母。
```
hexo generate # 初始化博客并生成初始页面，后期每写一篇新文章也需要再执行一次
hexo server # 运行本地服务器，一般用来测试和在推送前检查是否有问题
```
接下来会提示本地服务器已经启用，访问 `http://localhost:4000/` 或 `http://127.0.0.1:4000/` 都可以查看初始博客。

配置文件并部署博客到 Github Pages

进入你的hexo文件夹，然后编辑其中的 `_config.yml` 文件

下面放一些正常的设置类型

```
title: Hexo # 博客主标题
subtitle:   # 博客副标题
author: John Doe # 博客著名者
language: en # 中文填 zh-CN
timezone: Asia/Shanghai # 时间位置，需要按照规范填写
url: http://example.com # 网站链接，影响到点击主副标题的跳转，可以填自定义域名或 Github Pages 二级域名
``` 

接下来是部署设置，配置文件也是在 `_config.yml` 文件里编辑

```
# https://hexo.io/docs/one-command-deployment 查看 hexo 部署帮助文档
deploy: # 此处不用填写，留空
  type: git # 填 git 或 heroku ，根据你的部署位置来
  repository: https://github.com/</username>/<username>.github.io # 也可以填你名下的其他仓库，正确即可
  branch: main # 或 master，根据分支来，例如我的就是 hexo
```

### 这下就可以部署到 Github Pages 了，不过还得设定一些东西

确保你的终端里配置有 git，然后设置一下用户信息

也可以手动编辑，Windows 的 .gitconfig 文件在用户文件夹目录，Linux 在用户文件夹下，Termux 在 home 文件夹下

```
git config --global user.name "<username>" 
git config --global user.mail "<username@github.com>"
# 可能需要使用 root 权限执行
# 可以不用加 "" 号，只是因为用户名有空格的话可能会造成git只记录下前一半
```

### 关于 git config 中的邮箱设定

git config 中的邮箱地址不能直接填写注册 GitHub 的邮箱（其实我也不太清楚能不能，因为我设定的是邮箱不公开），不然并不会算到你的贡献里，当然不在乎的话也可以随便填

前往 [邮箱设定](https://github.com/settings/emails) ，找到你的邮箱地址，旁边会有一个提示符号 ，把鼠标放上去或点击它，就会显示一段话和一个格式为 `<number>+<username>@users.noreply.github.com` 的邮箱地址，复制它然后粘贴到终端里即可![](/images/post/05/github2022-07-19_19.10.08.jpg)


呃，还得安装一下hexo提供的一键部署工具

```
cd hexo  # 需要在博客文件夹里执行
npm install hexo-deployer-git --save
```

## 到这里基本上就完成了，来部署吧！

```
hexo clean # 慎重操作，会清除所有数据，但不会删除 _config.yml 文件，非必要选项
hexo g # 重新生成默认博客，source 文件夹里有新文章时会生成新的页面
hexo d # 复制 public 文件夹里的文件到 .depoly_git 文件夹里，然后根据 _config.yml 里的设置开始部署
```

接下来 git 会向你请求设定的部署网站的用户名与密钥，这里以 GitHub 作为演示

```
Username for 'https://github.com':<username>
Password for 'https://<username>@github.com':<yourpasswd>
```

#### 事实上这个时候填你得 Github 账号密码是没有用的，为了安全你得去 GitHub 申请一个 Personal access tokens

1. 访问 https://github.com/settings/tokens/
2. 点击 **Generate new token**
3. 验证密码 ，然后输入一个名称，以及选择过期时间，为了安全，推荐不要设置成不过期，做好定期更换
4. 在下方选择该令牌的权限，不懂可以全选，也可以自定义
5. 点击 Generate token，生成令牌

生成的令牌格式为 `ghp_1234567890abcdefghijklmnopqrst` ，也就是`ghp_` 加上`0-9` `a-z` `A-Z` 的随机生成数，一般也记不住，但也不要为方便直接保存在明文文件里

#### 后面就可以继续博客的部署了，接下来说说博客自定义域名与DNS解析如何设置的问题

如果需要自定义域名，请在 hexo 的 `public` 和 `.deploy_git` 文件夹里都新建一个 `CNAME` 文件，用文本编辑器打开，里面填上你希望使用的域名，也可以在 GitHub 项目的设置里找到 Pages ，再找到 Custom domain ，填入域名，但你不在 hexo 里放的话，每更新 `(hexo d)` 一次你就得重新进这个页面设置一次，很麻烦

### 自定义域名的 DNS 设置

这个我也摸索了很久，但现在碰壁多了也就会了

按照 [Github 的 DNS 解析设置](https://docs.github.com/cn/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)，需要创建四条 `A` 记录，并分别定向到：

```
name: @ # 全都要使用 @ 号 (有些服务商的设置方法是留空)
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

还有四条 `AAAA` 记录，也得分别定向到：

```
name: @ # 全都要使用 @ 号 (有些服务商的设置方法是留空)
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

以及一条 `CNAME` 记录

```
name: www 
<username>.github.io. # 也就是 GitHub Pages 的默认页面
```

填写完成的样子就如下表，顺序没有关系

| 类型 | 名称 | 内容 |
| ------------ | ------------ | ------------ |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |
| CNAME | www | username.github.io. |

设置完成点击保存，然后等个十来分钟应该就可以访问自定义域名了，如果访问出现 Github Pages 页面，但没有定位到你的博客，那可能是你 Github 仓库的 `CNAME` 文件被顶掉了

到这里你的博客就搭建完成了，写文章的教程我会在后面再发一篇教程

参考文章：

[从零开始搭建个人博客（超详细）](https://zhuanlan.zhihu.com/p/102592286)
[Termux 高级终端安装使用配置教程](https://www.sqlsec.com/2018/05/termux.html)

