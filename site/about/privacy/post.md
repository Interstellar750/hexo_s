---
title: 隐私声明
date: 2022-12-27
updated: 2025-10-24
image: /about/privacy/visibility_off.webp
category: about
flags:
  - hide_post
  - show_in_category_and_tag
  - show_in_rss_and_sitemap
---

本站源代码存放在 [GitHub](https://github.com/interstellar750/hexo_s/) 仓库，博客托管在 [Cloudflare Pages](https://pages.cloudflare.com/) 平台，域名 DNS 解析由 [Cloudflare](https://www.cloudflare.com/) 提供，我可得知的数据如下：

## GitHub 仓库

- stars / watching / fork 的用户列表

- Discussions 的讨论内容（包括 Giscus）

- Pull Request 请求信息

## Cloudflare / Cloudflare Pages 平台

[流量分析](https://developers.cloudflare.com/analytics/account-and-zone-analytics/zone-analytics/#http-traffic)

Cloudflare 为域名托管者提供了免费的流量分析，最长可以记录 30 天的数据，借此，我可以得知的数据如下：

> 此功能为使用 Cloudflare 域名托管服务时默认开启的功能，您可能无法通过任何方式绕过这部分的数据收集

<details no-indent>
  <summary><b>Web 流量</b></summary>

- 请求（最长 30 天，最短 24 小时，精确到请求数）
  - 请求总数
  - 已缓存的请求
  - 未缓存的请求
- 带宽（最长 30 天，最短 24 小时，精确到 KB）
  - 总带宽
  - 已缓存的带宽
  - 未缓存的带宽
- 唯一访问者（精确到人数）
  - 总计（最长 30 天，最短 24 小时）
  - 上限（最长 1 天，最短 1 小时）
  - 下限（最长 1 天，最短 1 小时）
</details>

<details no-indent>
  <summary><b>Web 流量请求</b></summary>

- 访客流量靠前的国家或地区（精确到流量数，最长 30 天，最短 24 小时）
- 统计信息（上个月）
  - 已节省的字节数（精确到 KB）
  - 已提供的 SSL 请求数（精确到次数）
  - 已阻止的攻击数（精确到次数）
</details>

[Web Analytics](https://developers.cloudflare.com/web-analytics/)

Cloudflare Web Analytics 是一个基于 JavaScript 代码的分析工具，最长可以记录 180 天的数据

> 您可以尝试使用一些工具来屏蔽 `https://static.cloudflareinsights.com/beacon.min.js` JavaScript 代码来绕过此部分的数据收集。您也可以选择对于本站点（trle5.xyz）屏蔽 JavaScript 代码，但这可能会导致一些功能将无法使用

在控制台中，可以按最长 30 天，最短 1 分钟的时间间隔来查看数据，同时还可以使用 `国家/地区` `主机` `路径` `引用方` `设备类型` `浏览器` `操作系统` `站点` `排除自动程序` 来作为筛选条件，借此，我可以得知的数据如下：

<details no-indent>
  <summary><b>高级指标</b></summary>

- 页面加载时间（精确到毫秒）
- 访问量（精确到次数）
- 页面浏览量（精确到次数）
- 核心网络指标（Core Web Vitals）见下方
</details>

<details>
  <summary><b>核心网络指标（Core Web Vitals）</b></summary>

- 最大内容绘制（LCP）（精确到次数）
- 与下一个画图交互（INP）（精确到次数）
- 累计布局偏移（CLS）（精确到次数）

以上三个指标数据，均可按照 `URL` `浏览器` `操作系统` `国家/地区` `元素` 类别来排序

在控制台中还提供了调式视图，在调式视图中可以查看被记为 **差** 和 **需要改进** 元素的详情信息，其中也可查看到一些数据：

<details no-indent>
  <summary><b>最大内容绘制（LCP）</b></summary>

- Object 和 页面
  - 主机
  - 路径
- 指标延迟
  - LCP - P50
  - LCP - P75
  - LCP - P90
  - LCP - P99
- DOM
  - 元素
</details>
<details no-indent>
  <summary><b>与下一个画图交互（INP）</b></summary>

- 页面
  - 主机
  - 路径
- 指标
  - INP - P50
  - INP - P75
  - INP - P90
  - INP - P99
- DOM
  - 元素
</details>
<details no-indent>
  <summary><b>累计布局偏移（CLS）</b></summary>

- 页面
  - 主机
  - 路径
- 指标
  - CLS - P50
  - CLS - P75
  - CLS - P90
  - CLS - P99
- DOM
  - 元素
- 布局偏移
  - 上一个
  - 当前
</details>
</details>

## 关于统计数据

统计数据中绝大部分可展示的数据已列举于上方，但此列表可能依然会有遗漏，若有其他需要了解的数据请前往对应平台中查看相应文档

<details no-indent>
  <summary><b>您在本站的浏览统计数据可能会被公开展示，点此查看公开展示时的类似形式</b></summary>

- 与他人展示
  - 你看看我这篇文章竟然有这么多人看：(附上页面浏览数据)
- 演示流量消耗
  - 压缩了图片大小后，我博客每个月只需要不到 1GB 流量：(附上流量消耗统计)
- 浏览器类型
  - 访问我博客用的浏览器七八成都是 Chrome：(附上浏览器类型统计)
</details>
