---
title: 自定义 golang 仓库的 module / 库名
date: 2025-12-03
tags:
  - go
---

如果你写过 golang，那你应该能在导入库时，注意到库名大多都是以 `github.com` 开头，跟一个链接差不多，复制到浏览器里也能直接访问。但有时也能看到一些与众不同的库名，例如 [`gopkg.in/yaml.v3`](https://pkg.go.dev/gopkg.in/yaml.v3) 和 [`go.uber.org/zap`](https://pkg.go.dev/go.uber.org/zap)

你可以点开上面的两个链接看看，就会发现它们在 [pkg.go.dev](https://pkg.go.dev/) 中指向的代码仓库都托管在 GitHub，而它们却又不使用 `github.com/user/repo` 这样的库名，这是怎么做到的呢

## 大概的流程

golang 对这个实现方法在文档中有一个段落，可见：[`cmd/go` #Remote import paths](https://pkg.go.dev/cmd/go#hdr-Remote_import_paths)

### 来自 GitHub 的仓库

简要的来说，当你在终端里运行 `go get` 或 `go install` 命令时，golang 会尝试去解析你传入的库名，如果库名是 `github.com/<user>/<repo>` 这样，它可以直接识别到这是一个 GitHub 仓库，就会走一套标准的流程，检查它是不是一个 golang 库，且这个库名与代码仓库的 `go.mod` 文件中定义的 `module` 名称相符，顺利的话就可以正常下载了

#### 如果不用定义的奇怪库名

你可能会好奇，如果类似 `gopkg.in/yaml.v3` 这样的库名，而我们知道它的代码仓库托管于 GitHub 中，我们能不能绕过这个奇怪名字，像普通托管在 GitHub 的 golang 项目那样下载它呢？

```bash
# 这里在加了后缀 /v3 是因为 gopkg.in/yaml.v3 本来就指向 v3 分支
$ go get github.com/go-yaml/yaml/v3
go: downloading github.com/go-yaml/yaml/v3 v3.0.1
go: github.com/go-yaml/yaml/v3@upgrade (v3.0.1) requires github.com/go-yaml/yaml/v3@v3.0.1: parsing go.mod:
    module declares its path as: gopkg.in/yaml.v3
            but was required as: github.com/go-yaml/yaml/v3
```

显而易见，并不行。通过 `go get` 或 `go install` 命令下载某个库时，它的库名必须与 `go.mod` 文件中定义的 `module` 名称相同，否则就是下不了

### 其他自建的版本控制服务

不来自 GitHub 也没关系，golang 也设计有一些回退方法，这时就会根据库名来判断像不像一个 URL，并尝试向这个 URL 发送 `HTTP` 请求，如果请求的是一个自建的 git 或其他版本控制服务的网页 URL，你的自部署服务大概率会正确的为 golang 提供信息，后续的流程就跟上面差不多了

当然这种情况不多见，更多时候应该是在企业内部的使用场景？

### 自定义 golang 项目的库名

如果要自定义一个 golang 项目的库名，那我们最少需要一个可以存放 `HTML` 文件，支持 `HTTPS` 且可以公开访问的域名。用一些平台提供的二级域名也可以，至于代码仓库托管在哪都可以

首先，你要确定你的库名是什么，它的开头应该是你的域名，然后跟着你的仓库名称，例如下方的演示

```text
我有一个 golang 仓库 https://gitea.trle5.xyz/trle5/tplate
不修改的话，库名就应该是 gitea.trle5.xyz/trle5/tplate
也就是去掉了开头的 https://

你可以看到，它同时包含了二级域名，用户名和仓库名，这显得它又长又难记
同时还要避免冲突，最后决定的库名就是 trle5.xyz/gopkg/tplate
```

> 理论上也可以直接拿一整个二级域名作为库名，就是 `tplate.trle5.xyz` 这样，但我没试过具体行不行

#### 修改原来的库名

如果你之前跟我一样不知道 golang 库名的命名规范，那你的库名大概就是一个单词，而且 golang 的拓展并没有提供一键重命名库名的方法... 于是，只能先修改 `go.mod` 文件开头的 `module` 名称，再看文件的报错逐个替换了

注意：如果你之前发布过 `tag` 或 `release`，那你修改库名后，还要推送一个新的 `tag` 或 `release`，不然你在使用 `go get` 或 `go install` 时，它会默认获取 `latest` 版本的内容，修改库名后最新的一个 `commit` 版本并没有包含此次更改，就会出现类似 [前面](#如果不用定义的奇怪库名) 的错误

#### 创建包含特殊属性的 `<meta>` 标签

能让 golang 从一个 `HTML` 页面中识别仓库信息的关键在于其中的 `<meta>` 标签，golang 不关心这个 `HTML` 页面里有什么其他内容，只要有对应的信息就行了，像 GitHub 上的 golang 仓库默认都会包含这个标签和对应的属性，下方的仓库 URL 填写你存放代码仓库的网页链接，代码仓库中 `go.mod` 文件中的 `module` 名称必须跟你填写的这个库名相同

```html
<meta name="go-import" content="<库名> git <仓库 URL>">
```

下面是一个完整的示例，我把它保存为一个名为 `tplate.html` 的文件，作为资源文件存放到了我的网站里，访问路径就是 [`trle5.xyz/gopkg/tplate`](https://trle5.xyz/gopkg/tplate.html)

```html
<!doctype html>
<html>
  <head>
    <meta name="go-import" content="trle5.xyz/gopkg/tplate git https://gitea.trle5.xyz/trle5/tplate.git">
    <meta name="go-source" content="trle5.xyz/gopkg/tplate _ https://gitea.trle5.xyz/trle5/tplate/src/branch/custom{/dir} https://gitea.trle5.xyz/trle5/tplate/src/branch/custom{/dir}/{file}#L{line}">
  </head>
  <style>body { color: #c8c8b9; background-color: #14140f; } a {color: #b9d282;}</style>
  <body>
    <p>go get trle5.xyz/gopkg/tplate</p>
    <a href="https://gitea.trle5.xyz/trle5/tplate">https://gitea.trle5.xyz/trle5/tplate</a>
  </body>
</html>
```

里面其实很多东西都是多余的，这里是参照了 Gitea 的实现而修改的文件还加上了一些信息和链接，你可以编辑好 `<meta>` 标签，塞到任意一个 `HTML` 页面的 `<head>` 标签里都可以

> 注意：**`go.mod` 文件**、**`<meta>` 标签属性** 和 **对应 URL** 的三个库名必须完全相同，即：
>
> 1. `go.mod` 中库名为 `example.com/package`
> 2. 浏览器中 `example.com/package` 可正常访问
> 3. `example.com/package` 页面为 `HTML` 文档，且其中包含上方的 `<meta>` 标签
> 4. `<meta>` 标签中的属性已经[按照需求](#创建包含特殊属性的--标签)正确填写了

之后确保 CDN 缓存之类的不会干扰你的请求，就可以尝试使用新的库名来导入或安装你的项目了
