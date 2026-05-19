---
title: golang template 库使用教程
date: 2025-10-28
updated: 2026-05-19
category: post
tags:
  - go
  - tmpl
  - 教程
---

> 这个文章目前是用来查看各种关键字和函数如何使用的，需要的话可以看看 [golang template 库入门教程](/post/go-template-intro/) 文章
>
> 文章里的描述可能与实际有出入，请参考官方文档 [text/template - Go Packages](https://pkg.go.dev/text/template#section-documentation)

在我写 [tplate](https://gitea.trle5.xyz/trle5/tplate) 时，我发现网上能找到的 golang template 教程都很分散，不是很方便，于是打算写一篇文章留给自己用

## 运算符

### 逻辑运算符

| 关键字 | 使用方法 | 等价 go 语句 |
| :-----: | ----------- | ------------ |
| **and** | `and C1 C2` | `C1 && C2`   |
| **or**  | `or C1 C2`  | `C1 \|\| C2` |
| **not** | `not C1`    | `!C1`        |

### 比较运算符

| 关键字 | 使用方法 | 等价 go 语句 | 备注 |
| :---: | ----- | ----- | ----- |
| **eq** | `eq C1 C2` | `C1 == C2` | <b><ins>EQ</ins></b>ual |
| **ne** | `ne C1 C2` | `C1 != C2` | <b><ins>N</ins></b>ot <b><ins>E</ins></b>qual |
| **lt** | `lt C1 C2` | `C1 <  C2` | <b><ins>L</ins></b>ess <b><ins>T</ins></b>han |
| **le** | `le C1 C2` | `C1 <= C2` | <b><ins>L</ins></b>ess than or <b><ins>E</ins></b>qual |
| **gt** | `gt C1 C2` | `C1 >  C2` | <b><ins>G</ins></b>reater <b><ins>T</ins></b>han |
| **ge** | `ge C1 C2` | `C1 >= C2` | <b><ins>G</ins></b>reater than or <b><ins>E</ins></b>qual |

**`eq` 关键字可以接受多个参数，例如 `eq C1 C2 C3`，但等价的 go 语句其实是 `C1 == C2 || C1 == C3`**

### 复杂条件式

如果要创建复杂的条件式，有时需要使用括号 `()` 将子条件包裹起来

| 条件式 | 等价 go 语句 |
| ----- | ----- |
| `and C1 (not C2)` | `C1 && !C2` |
| `and (and (gt C1 1) (gt C2 1)) (ne C1 C2)` | `(C1 > 1 && C2 > 1) && C1 != C2` |
| `eq C1 C2 C3 C4` | `C1 == C2 \|\| C1 == C3 \|\| C1 == C4` |


## 关键字

### `if else` 条件判断
可以在模板中判断一些条件，来控制要执行的数据

```js
{{ if .A }}
  {{/* 符合 .A 条件时的内容 */}}
{{ else if .B }}
  {{/* 不符合 .A 但符合 .B 条件时的内容 */}}
{{ else }}
  {{/* 不符合以上全部条件时的内容 */}}
{{ end }}
```

### `range` 遍历
使用 `range` 方法即可遍历数组、切片或 map 键值对，也可以在要遍历的对象为空时进行其他操作

```js
{{ range .Slice }}
  {{/* 此时 . 会指向循环中的数据 */}}
  当前遍历的值: {{ . }}
{{ else }}
  这个切片是空的
{{ end }}
```

#### 在遍历中使用外部值
在 `range` 方法的作用域中，`.` 符号会指向当前遍历的数据，若要在循环中使用外部的值，需要添加 `$` 前缀

```js
{{/* 假设传入的数据中有 Slice 和 Value 这两个变量 */}}
这是 Value 的值: {{ .Value }}
{{ range .Slice }}
  当前遍历的值: {{ . }}
  循环外部的值: {{ $.Value }}
{{ end }}
```

#### 获取索引或键名
在使用 `range` 方法时可以通过创建变量来获取数组、切片或 map 键值对的索引或键

```js
{{ range $index, $data := .Slice }}
  index 变量:  {{ $index }}
  data 变量:   {{ $data }}
  当前遍历的值: {{ . }}
{{ end }}
```

创建了变量后依然可以通过 `.` 来直接调用当前遍历的数据

### `index` 获取单个元素
可以使用 `index` 方法来获取数组、切片或 map 键值对中的单个元素

```js
{{ $item_0_in_slice := index .Slice 0 }}
切片中的第 0 个元素为 {{ $item_0_in_slice }}
{{ $item_abc_in_map := index .Map "abc" }}
map 键对值中的 abc 元素为 {{ $item_abc_in_map }}
```

### `break` `continue` 控制循环
在使用 `range` 方法遍历内容时，可以像 go 代码的 for 循环一样使用 `break` 和 `continue` 控制接下来的操作

```js
{{/* 假设 .Numbers 中的数据是 1,2,3,4,5,6,7,8,9,10 */}}
{{ range .Numbers }}
  {{ if lt . 5 }}
    数字小于 5: {{ . }}
    {{ continue }}
  {{ end }}
  {{ if gt . 2 }}
    正在退出循环
    {{ break }}
  {{ end }}
{{ end }}
现在在循环外
```

### `with` 暂时修改 `.` 指向的数据
有时候只需要使用数据中的某个字段，可以用 `with` 命令来暂时修改 `.` 指向的数据

```js
{{/* 假设传入的数据结构为 .Post.Date */}}
现在是 {{ .Post.Date.Year }} 年 {{ .Post.Date.Month }} 月 {{ .Post.Date.Day }} 日
{{ with .Post.Date }}
  {{/* 此时 . 已经指向 .Post.Date，调用 .Year 同等于 .Post.Date.Year */}}
  现在是 {{ .Year }} 年 {{ .Month }} 月 {{ .Day }} 日
{{ end }}
```

若要在 `with` 作用域中使用其他外部值，参考 [在遍历中使用外部值](#在遍历中使用外部值)

`with` 命令还可以像 `if else` 那样选择要使用的数据

```js
{{ with .Update.Date }}
  {{/* 此时 . 指向 .Update.Date */}}
  更新时间 {{ .Year }} 年 {{ .Month }} 月 {{ .Day }} 日
{{ else with .Create.Date }}
  {{/* 此时 . 指向 .Create.Date */}}
  创建时间 {{ .Year }} 年 {{ .Month }} 月 {{ .Day }} 日
{{ else }}
  {{/* 因为没有匹配上面的条件，此时 . 没有发生变化 */}}
  未知时间
{{ end }}
```

### `define` `template` 定义和调用模板
可以使用 `define` 命令来预先定义一个模板，再通过 `template` 命令来调用之前定义的模板

```js
{{ define "A" }}
  {{/* 模板 A 中的 . 为调用时传入的数据 */}}
  在模板 A 中的数据是 {{ . }}
{{ end }}

正在调用模板 A 并传入 "text"
{{ template "A" "text" }}
```

### `block` 重新定义模板并立即调用
`block` 命令其实是一个<abbr title="某种用于简化代码阅读和表达的语法结构">语法糖</abbr>，它会定义一个模板并立即调用它

```js
{{/* 首先定义一个名为 template 的模板，它会输出传入的数据 */}}
{{ define "template" }}
  传入的数据为 {{ . }}
{{ end }}

{{/* 重新定义 template 模板并传入 . 来执行，它会先输出数据再接着提示语句 */}}
{{ block "template" . }}
  {{ . }} 是传入的数据
{{ end }}
{{/* 同等于下方的代码，但需要注意：在一个模板中不允许定义另一个模板 */}}

{{ define "template" }}
  {{ . }} 是传入的数据
{{ end }}
{{/* 调用重新定义后的 template 模板并传入 . 来执行*/}}
{{ template "template" . }}
```

为了方便替换使用，go 的 `text/template` 和 `html/template` 库中的模板是允许重复定义的，实际的模板为最后被解析的那个
