---
title: golang template 库入门教程
date: 2026-05-16
summary: 不是很好写
category: post
tags:
  - go
  - tmpl
  - 教程
flags:
  - hide_post
  - show_in_category_and_tag
---

这篇文章本来是 [golang template 库使用教程](/post/go-template/) 的一部分，没写完又不是很好写就拆出来了

本文中展示的库默认使用 `html/template` 库，可能与 `text/template` 用法有些差别

## 基本

首先让我们来看看怎么定义、解析和调用模板

### 定义模板

当我们使用 `template.ParseFiles()` 函数加载模板文件时，默认会按单个文件生成一个模板，并以此文件的文件名作为模板名，统一存放在 `template.Template > nameSpace > set` map 对象中

#### 不定义模板名称
如果只是使用少量的模板且不嵌套使用，那不定义模板名称没有什么问题，否则可能出现一些混乱的情况：

```bash
.
├── dir
│   └── abc.tmpl # 存放在子目录中
├── 123.tmpl
├── abc.tmpl # 文件名与 ./dir/abc.tmpl 相同
└── xyz.tmpl

# 解析的结果
["123.tmpl", "abc.tmpl", "xyz.tmpl"]
```

可以看到我们在 `./` 目录中定义了四个 `.tmpl` 文件，而解析的结果只有三个模板对象

而其中的 `abc.tmpl` 模板更是一个叠加态，它可能是 `./dir/abc.tmpl`，也可能是 `./abc.tmpl`，这取决于哪个文件最后被解析，而且模板名中并不会保留路径名，你会没法分辨具体是哪个文件

#### 定义模板名称
但若我们手动定义模板名称，就可以避免上方的问题：

```bash
# ./abc.tmpl 文件
{{ define "abc" }} # 定义一个模板并命名为 "abc"
{{/* 模板中的逻辑 */}}
{{ end }} # 结束定义模板

# ./dir/abc.tmpl 文件
{{ define "dir/abc" }} # 定义一个模板并命名为 "dir/abc"
{{/* 模板中的逻辑 */}}
{{ end }} # 结束定义模板

# 解析的结果
["abc", "dir/abc", "abc.tmpl"]
```

可以看到，我们通过定义模板名称来让模板保留了层级信息，这样我们可以更清楚的知道使用了哪个模板

就算定义了模板名称，但在结果中可以看出，程序还是会按照原来的方式解析文件并保留到 template map 对象中，这个问题似乎也没有什么好办法，在解析大量模板时会不会额外占用内存也不清楚，但为了更方便的调用模板，推荐还是手动定义模板名称

### 解析模板

`html/template` 库提供了三个函数来加载模板，它们分别是：

1. [ParseFiles(filenames ...string) (*Template, error)](https://pkg.go.dev/html/template#ParseFiles)
2. [ParseFS(fs fs.FS, patterns ...string) (*Template, error)](https://pkg.go.dev/html/template#ParseFS)
3. [ParseGlob(pattern string) (*Template, error)](https://pkg.go.dev/html/template#ParseGlob)

综合使用最多的还是 `template.ParseFiles()` 搭配 `filepath.WalkDir()`

#### ParseFiles()
接受可变参数的模板路径，通常搭配 `filepath.WalkDir()` 函数来自动解析一个文件夹及其全部子目录下的全部模板文件：

```go
var paths []string
var dir string = "templates"

err := filepath.WalkDir(dir, func(path string, d os.DirEntry, err error) error {
    if err != nil { return err }
    if !d.IsDir() && filepath.Ext(path) == ".tmpl" {
        paths = append(paths, path)
    }
    return nil
})
if err != nil { log.Println(err) }

tmpl, err := template.ParseFiles(paths...)
if err != nil { log.Println(err) }
```

#### ParseFS()
用法类似 `ParseFiles()`，从一个 `fs.FS` 文件系统中加载文件而不是本地目录，一般也是搭配 `fs.WalkDir()` 函数来解析一个文件夹及其全部子目录下的全部模板文件：

```go
var fsys fs.FS // 需要从其他地方传入一个真实可用的 fs.FS
var paths []string
var dir string = "templates"

err := fs.WalkDir(fsys, dir, func(path string, d fs.DirEntry, err error) error {
    if err != nil { return err }
    if !d.IsDir() && filepath.Ext(path) == ".tmpl" {
        paths = append(paths, path)
    }
    return nil
})
if err != nil { log.Println(err) }

tmpl, err := template.ParseFS(p.EmbedFS, files...)
if err != nil { log.Println(err) }
```

#### ParseGlob()
接受一个目录路径，仅解析此目录下的文件（拓展名不确定），**不包含子目录和其中的文件**

```go
var dir string = "templates"

tmpl, err := template.ParseGlob(dir)
if err != nil { log.Println(err) }
```

### 调用模板

`template.Template` 结构体有两个方法可以执行模板，分别是：

1. [(t *Template) Execute(wr io.Writer, data any) error](https://pkg.go.dev/html/template#Template.Execute)
2. [(t *Template) ExecuteTemplate(wr io.Writer, name string, data any) error](https://pkg.go.dev/html/template#Template.ExecuteTemplate)

#### 调用单个模板
当仅解析一个 `.tmpl` 文件时，可以简单的调用 `Template.Execute()` 方法来执行这个模板：

```go
tmpl, err := template.ParseFiles("./a.tmpl") // 只传入了一个模板文件路径
if err != nil { log.Println(err) }

var buf bytes.Buffer // 创建一个 buffer 作为执行模板的缓冲

// 执行模板时传入 buf 的地址作为 io.Writer 接口，因为暂时不需要数据，data 传入 nil
err = tmpl.Execute(&buf, nil)
if err != nil { log.Println(err) }

// 在终端里输出执行模板后的结果
fmt.Println(buf.String())
```

#### 多个模板调用一个
但在实际使用中，更多的情况是初始化时一次性加载多个模板，在使用时指定模板名称来执行，这里我们就可以使用 `Template.ExecuteTemplate()` 方法:

```go
tmpl, err := template.ParseFiles("./a.tmpl", "./b.tmpl", "./c.tmpl") // 传入了三个模板文件的路径
if err != nil { log.Println(err) }

var buf bytes.Buffer // 创建一个 buffer 作为执行模板的缓冲

// 第一个参数同样传入 buf 的地址
// 第二个参数为模板的名称，这里我使用了文件名，实际上应该自定义模板名称
// 第三个参数因为暂时不需要数据，同样传入 nil
err = tmpl.ExecuteTemplate(&buf, "a.tmpl", nil)
if err != nil { log.Println(err) }

fmt.Println(buf.String())
```

**如果解析了多个模板，但调用时使用 `Template.Execute()` 方法，我不清楚具体会发生什么，但不推荐这样做**

## 入门示例

很可惜，golang 的工具包并没有对 golang template 文件的静态检查，语法也没有，如果你使用的是 [vscode](https://code.visualstudio.com/) 编辑器，你可以安装 [gotemplate-syntax](https://marketplace.visualstudio.com/items?itemName=casualjim.gotemplate) 拓展来获得语法高亮

### 简单示例

下面是一个简单的模板内容：

```bash
{{ define "base" }}
大家好啊，我是 {{ . }}，今天来点大家想看的东西啊
{{ end }}
```

第一行的 `{{ define "base" }}` 的作用是定义了一个模板，名称为 `base`，前面讲过，这样我们可以在解析多个模板文件时通过此名称精确指定执行这个模板

第二行则是一段文字，可以看到 `我是 {{ . }}` 处应该跟着的是一个名字，但这里却使用了 `{{ . }}` 来作为占位符，这是一个 template 的语法，其中的 `.` 代表了执行此模板时将传入的数据

第三行是 `{{ end }}`，其中的 end 代表了某个逻辑块的结束，这里对应的是第一行，定义模板时需要以 `{{ define "模板名称" }}` 作为开始，使用 `{{ end }}` 结束。每个逻辑块都需要使用 `{{ end }}` 结束，否则执行模板时会发生错误

让我们试试执行它（暂时没有电脑的话，也可以前往 [Go Playground](https://go.dev/play/p/lDW9knO-mwi) 尝试）：

<details no-indent>
  <summary><b>点击展开代码</b></summary>

```go
package main

import (
    "bytes"
    "fmt"
    "html/template"
    "log"
)

func main() {
    // 由于这里我没法创建文件
    // 所以我们使用 `template.New()` 函数创建 `template.Template` 结构体
    // 再调用 `Parse()` 方法直接将模板写进代码中解析
    tmpl, err := template.New("").Parse(`{{ define "base" }}大家好啊，我是 {{ . }}，今天来点大家想看的东西啊{{ end }}`)
    if err != nil {
        log.Println(err)
    }

    var buf bytes.Buffer // 创建一个 buffer 作为执行模板的缓冲

    // 调用 ExecuteTemplate() 方法时
    // 第一个参数中传入 buf 的内存地址
    // 第二个参数传入 "base" 字符串即模板定义时的名称
    // 第三个参数传入了我的名字 "Hubert"，你可以尝试修改第三个参数再运行
    err = tmpl.ExecuteTemplate(&buf, "base", "Hubert")
    if err != nil {
        log.Println(err)
    }

    fmt.Println(buf.String())
}
```
</details>

终端中的运行输出：
```bash
$ go run main.go
大家好啊，我是 Hubert，今天来点大家想看的东西啊
```

可以看到，模板中的 `我是 {{ . }}` 被替换成了 `我是 Hubert`，我们在执行模板时，只需要修改传入的参数，就可以很方便的更改文本的部分数据，配合代码逻辑，我们就可以达到更复杂的效果
