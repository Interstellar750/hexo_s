---
title: 'Urara 入门教程'
created: 2022-11-20
updated: 2022-11-20
image: /post/urara-intro/urara.webp
tags: 
   - Urara
   - 技术
   - 博客
summary: '力所能及写的搭建教程'
---

题图来自 [Urara demo](https://urara-demo.netlify.app/)

**填坑写文章咯 😇** 

# 介绍 Urara

**什么是 Urara？**

如果你在我的网站上看到了这篇文章，那么你现在浏览的这个网页就是基于 Urara 搭建的，不过这个网站被我改的地方有点多，可以 [**点击这里**](https://urara-demo.netlify.app/) 看看官方 demo，以及 [**官方入门教程**](https://urara-docs.netlify.app/) 

简单来说，Urara 是一个博客模板，如果我看过我之前写的 [**搭建一个自己的博客**](/post/搭建一个自己的博客/) 文章的话，就可以看出 Urara 似乎和 Hexo 差不多，也是写完文章交给它就可以生产博客网页的程序，不过他们差距有点大，从外观和内部技术来说都有很大差距

那么我为什么要从 Hexo 换到 Urara 呢？这个其实就是个人喜好，如果你目前在用 Hexo，而且还用了一堆主题和插件，你迁移到 Urara 的话会失去你所用的所有主题和插件，也得重新习惯 Urara 的后端结构

当然选择权在你自己手上，想怎么折腾就怎么折腾 😆

下面会先教如何在自己的机器上部署一个官方 demo，再细说想改哪些地方要去改哪个文件，要怎么改，以及一些会遇到的坑

# 搭建 Urara demo

## 配置环境

**首先我们需要安装 nodejs**

__node 与 nodejs 是同一个东西，我也不清楚为什么会这样，我现在虚拟机中 node 的版本号为 `v12.22.12`，nodejs 为 `v16.18.0`__

Urara 需要 `nodejs` v16.x 以上版本，但在我的 Linux 虚拟机中使用 `apt` 安装 `node` 只能安装到 `12.22.12` 版本，想升级的话需要通过 `npm` 安装 `n` 软件包（名字就是一个 n ），如果你的 Linux 发行版能直接装到 16.x 版本的话，可以跳过这一步了

```
sudo apt install nodejs // 如果提示找不到包可以试试替换为 node
// nodejs 可能会附带安装 npm，如果有的话可以跳过下面那句命令
sudo apt install npm
nodejs -v ; npm -v // 查看它们的版本号
```

如果执行上面命令最后一句后第一行显示出的版本号低于 v16 的话，就需要进行升级了

```
npm install -g n // 安装 n 软件包
n stable // 使用 n 程序把 nodejs 升级到 stable 渠道
npm install npm@latest -g // 升级 `npm` 包管理器（可选）
```

安装完再测试一下版本号，正常的话就可以安装其他需要的软件了

**其次是安装 pnpm**

Urara 使用 [pnpm](https://pnpm.io/) 包管理器进行组件安装，所以这个软件包是必须安装的，有两种安装 pnpm 的方法

```
npx pnpm add -g pnpm // 这个是官方文档里的安装办法
npm add -g pnpm // 测试可用
```

安装完成后，运行 `pnpm -v` 看看版本号，截至到文章修改日期，pnpm 最新版本号为 `7.16.0`

**接下来就是克隆仓库，可以使用 `git` 或按照官方教程使用 `degit`**

```
sudo apt install git // 已经安装过 git 的话就不要重新安装了
git clone https://github.com/importantimport/urara
```

另一个办法

```
npx degit importantimport/urara urara
// 新建一个名为 urara 的文件夹并把项目克隆到里面去
```

这两种方法的差别就是用 `git` 克隆会保留原本的 git 信息和一些其他许可证文件，而使用 `degit` 并不会保留这些信息

也就是说你使用 `git` 克隆下来的话要手动删掉 `.git` 文件夹并根据你自己的想法修改许可证等文件，而使用 `degit` 不用删，但你依然得手动来搞

## 开启本地测试服务器

首先，切换到目录并安装拓展

```
cd urara // 也可根据你的项目名
pnpm i // 根据文件夹内的 package.json 和 pnpm-lock.yaml 按照需要的拓展
```

如果没有意外，那么安装过程会顺利的跑完，~~网络条件可不算意外~~，接下来就可以完成最后一步了

```
pnpm dev
```

运行命令后静候一段时间，当然这个要看设备，直到屏幕被清屏，输出以下内容

```
  VITE v3.2.4  ready in 147 ms

  ➜  Local:   http://127.0.0.1:5173/
  ➜  Network: use --host to expose
 
🌼 daisyUI components 2.40.1  https://github.com/saadeghi/daisyui
  ✔︎ Including:  base, components, themes[29], utilities
```

之后，打开你设备上的浏览器，在地址栏输入 `127.0.0.1:5173` 并按下回车，加载完成后即可看到 Urara 的 demo 已经在你的本地设备上跑起来了 🎉

注意请使用较新的浏览器，使用过时的浏览器可能会导致渲染错误以及一些其他 bug

**搭建完成后，接下来就是根据你自己的想法来修改博客了**

# 自定义博客

|| 改改改，但不要把改好的东西搞没了 ||

## 如何安排文章目录

Urara 的后端结构大致为 `src` 与 `urara` 文件夹，其中 `src` 文件夹存储了绝大多数的配置文件， `urara` 文件夹为存放图片资源与 [Markdown](https://markdown.com.cn/basic-syntax/) 格式文件的地方，首先来讲一下如何写文章

打开其中的 `urara` 目录，你会看到两个文件夹与一张图片，第一个文件夹 `assets` 中也有几张图片，它们是 demo 自带的资源，我也不清楚哪里用的到，自己琢磨要不要删除吧

![](/post/urara-intro/urara-folder.png)

还有另一个 `hello-world` 文件夹，点进去可以看到两个文件夹、一张图片和一个名为 `+page.svelte.md` 的文件，再打开其中的 `toc-disabled` 文件夹，能看到另一个名为 `+page.md` 的文件

至于它们是什么关系嘛，`+page.svelte.md` 为启用了 svelte 特性的 Markdown 文档，而 `+page.md` 则是常规的 Markdown 文档，我不太懂 svelte，就不介绍了 😥

看到这里不知道你有没有看出来，这里的 Markdown 文档除了 `+page.svelte.md` 就是 `+page.md`，这其实也是 Urara 的文档要求，这个与 Hexo 的逻辑有些差别，需要适应

那怎么把文章放在对应的目录呢，其实看看文件浏览器的地址栏就知道了

Urara 是把文件夹当目录，像这个 demo 的 `urara` 资源文件夹里有一个 `hello-world` 文件夹，那么在构建和测试时，软件会自动检测这个文件夹里的 `.md` 文件，并生成可访问页面，这个页面对应的目录就是 `127.0.0.1:5173/hello-world`，其中还有 `elements` 文件夹，那么对应的目录就是 `127.0.0.1:5173/hello-world/elements`

如果你发现你设定好的文件夹里有 `+page.md` 或 `+page.svelte.md` 文件，但测试访问的时候发现页面却是空白的，那你就要注意一下是不是这个文件夹根目录里有一个以上这种文件了，出现这种情况就是软件不知道应该选择哪个文件来生成页面导致的

## 文章格式设置

文件夹里的目录也不是随便写点文字丢进去就可以直接生成的了，首先得写文档头，再按照 Markdown 的格式写文章

> 不会写 Markdown？很简单，来看 [Markdown 官方教程](https://markdown.com.cn/basic-syntax/) 

首先我在这里放一个普通的文档头（其实就本文的）

```
---
title: 'Urara 入门教程' // 此为文章的标题
created: 2022-11-20 // 文章创建时间，可在博客主页文章标题上方看到
updated: 2022-11-20 // @ 文章更新时间，把鼠标放在文章创建时间上即可看到
image: /post/urara-intro/urara.webp // @ 题图，会在主页作为文章卡片的底图，进入文章后将在文章标题下方显示
tags:  // @ 标签，即用来说明文章包含哪些部分的东西，会在桌面端主页右侧显示，移动端平排在个人资料下方
   - Urara
   - 技术
   - 博客 // 只要遵循这个标签格式，可以一直添加
summary: '力所能及写的搭建教程' // @ 概括语句，会显示在主页文章卡片下方看到，进入文章后会被隐藏
---
```

上面里面以 @ 开头的注释表示这个部分并非必须内容，为演示，下面再放一个最简单的文档头

```
---
title: '测试页面' // 标题
created: 2000-01-01 // 创建时间
---
```

其实你想的话创建时间也能忽略掉，不过就排版会乱掉

## 博客风格自定义

接下来就是修改例如个人资料、标题和页脚之类的东西了，对于没什么代码知识的人可能会觉得非常难搞，加油 😇
