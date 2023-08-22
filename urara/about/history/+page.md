---
title: '建站历程'
created: 2022-10-22
updated: 2023-07-30
summary: '因为提前感觉到这个页面会变得很长很长，就先分离出来了'
toc: false
flags:
  - unlisted
---

**想了想以后这个页面似乎会长长长，就单独放个页面了**

以后也得想个办法整理一下这个页面

<details>
  <summary><big><b>建站初期 & hexo & chic</b></big></summary>

**2022/01/24 初次建立** <br>
初次建立并使用 [GitHub Pages](https://github.io/) 来作为服务器 （其实并不是第一次，前前后后试了好几次，因为碰到了好多 bug）

**2022/01/29 白嫖域名** <br>
在 [Freenom](https://freenom.com/) 上申请了 12 个月的免费域名 trle5.tk ，但由于不会设置 DNS 解析，依然用着 [GitHub Pages](https://github.io/) 的默认域名 

**2022/02/26 迁移后端** <br>
由于 x10m2 上的 [Sailfish OS](https://sailfishos.org/) 因为未知问题操作很卡，把 hexo 后端备份出来迁移到了 s10e 上，使用 [Termux](https://play.google.com/store/apps/details?id=com.termux) 来继续运维 

**2022/02/27 设置 DNS 解析** <br>
将域名 DNS 解析托管到 [GoDaddy](https://godaddy.com/) ，成功用上了自定义域名

**2022/03/08 购入新域名** <br>
在 [reg.ru](https://reg.ru/) 购买了一年的 [trle5.xyz](https://trle5.xyz/) 域名，用于存放文件，本站可能有一些图片文件会储存在里面

**2022/03/14 更换 DNS 解析** <br>
更换为由 [Freenom](https://freenom.com/) 提供的 DNS 解析

**2022/03/15 更换存文件的地方** <br>
把 blackbox 的域名从 [trle5.xyz](https://trle5.xyz/) 迁移到 [t5d.trle5.tk](https://t5d.trle5.tk/)

**2022/05/07 换 Chic 主题** <br>
从默认的 Landscape 主题更换为 [Siricee](https://github.com/Siricee/) 制作的 [Chic](https://github.com/Siricee/hexo-theme-Chic/) 主题

**2022/05/08 建立镜像站** <br>
使用 [Vercel](https://vercel.com/) 建立了博客镜像站，使用域名 [trle5.xyz](https://trle5.xyz/) ，DNS 解析由 [Cloudflare](https://cloudflare.com/) 提供

**2022/06/01 重新配置主题** <br>
重新配置了博客主题，因为 05/15 那天手机数据丢失让博客后端也部分丢失了 （真的丢了好多东西啊😢）

**2022/07/19 修正文章** <br>
重新修正了一篇文章，之前写的文章发现达不到所想的方案所以就暂搁了 ~~**懒**~~ ，由于之前的丢数据问题，Cloudflare 账号也登不上了，找回有点麻烦

**2022/09/11 成功找回 Cloudflare 帐号** <br>
给 Cloudflare 客服发邮件，成功拿回了账号的控制权，目前 [trle5.xyz](https://trle5.xyz/) 站点会随时更新，就是代表上面可能会有一些没写完的文章和新东西，文章写完后再推送至 [trle5.tk](https://trle5.tk/)，于 6 月 4 日在 [Porkbun](https://porkbun.com/) 白嫖的 [trle5.dev](https://trle5.dev/) 域名还没打算好用来干嘛，两个付费域名以我现在的经济能力压力有点大

</details>

<details>
  <summary><big><b>切换至 Urara</b></big></summary>

**2022/10/23 切换到 Urara 后端** <br>
花了差不多整个下午的时间一直搞到凌晨两点多，终于把 Urara 后端配置好了，从九月月底在 [Dejavu's Blog](https://t.me/dejavuBlog/2069/) 频道看见 Urara 直到今天才完全成功切换到这个后端，配置其实不算太难，我完全没有 svelte 的基础，但看着原文件和 Urara 作者 [藍+85CD](https://kwaa.dev/) 的博客改也勉强可以了，后面估计我还得改不少东西

**2022/11/02 小修小补** <br>
还是没能摸透 Urara 是怎么要求文章的，好像对 # 号有要求，对文章重新调整了，测试过大概都正常了

**2022/11/13 移除了加都没加的东西** <br>
~~从 8 号开始搞到现在，搞好了一个朋友页面，但很奇怪在本地运行一切正常，部署到 Vercel 上就无法运行，用之前的部署方式会出现 404 问题，于是现在只能删掉了 😭~~

修好咯，不过目前有个鼠标放到文章日期上时修改时间会与创建时间叠在一起，看看 [kwaa](https://github.com/kwaa) 大佬什么时候修

顺便说一句，[trle5.dev](https://trle5.dev/) 域名借给朋友拿去搭博客了

**2022/11/19 同步与开源** <br>
昨天晚上给 Urara 的 [这个](https://github.com/importantimport/urara/issues/44/) 议题发了一个 comment，今天中午问题就修复了，要在这里说一句非常感谢大佬们，自己没学过前端也就只能提个议题或报告一下问题了，修复问题这种问题很可惜帮不上忙 😥

推完这次更新后我的整个博客的源码就开源啦，至于之前为什么不放出来，第一个原因是可以用之前的 [blog](https://github.com/Interstellar750/blog) 项目直接部署，但换到 Urara 后端之后这样就不行了，除非点击任意链接后网页链接都会自动加上 `.html` 后缀，不然就会出错，没那个技术力的我就只能弃用之前的方法了，第二个就是当时有巨多问题，自己修也不知道怎么修

**2022/12/01 开通 Giscus** <br>
成功开通了 Giscus 讨论功能，比想象中的要简单好多，不过看 [#47](https://github.com/importantimport/urara/issues/47/) 这个议题好像说会有 bug 导致登不上 Giscus，但我自己试了试没问题，有点奇怪

修了，但似乎只修了 Giscus 的登录问题，sitemap 还是没法使用

</details>

## 一周年

**2023/01/24 续费域名** <br>
博客也一周年了，先要续费的是在 [**freenom**](https://freenom.com/) 上注册的免费域名 [**trle5.tk**](https://trle5.tk/)，不出意料的免费续费了一年，虽然目前已经闲置很久了

博客目前主要用的 [**trle5.xyz**](https://trle5.xyz) 打算在今天转移到 [**Blacknight**](https://www.blacknight.com/)，本来是打算转到 [**Cloudflare**](https://www.cloudflare.com/)，但架不住 [5 欧元一年](https://zh-hans.tld-list.com/顶级域名/xyz) 的续费/转移价格，便宜

但是被限制付款了，发个工单问问客服，不行那就高价转到 Cloudflare

至于 [**trle5.dev**](https://trle5.dev/) 最便宜还是 $10 以上，但过期时间在六月，再等等吧

**2023/03/02 购入服务器** <br>
从 [RackNerd](https://racknerd.com/) 买了个服务器，折腾两天后搭好了一个能用的 [memos](https://github.com/usememos/memos)，分配的二级域名为 [memos.trle5.xyz](https://memos.trle5.xyz/)

还有一个 SSL 证书时不时抽风的 [Gitea](https://github.com/go-gitea/gitea) 服务则是为了操作方便把 [trle5.dev](https://trle5.dev/) 拿来用，原来朋友的博客就给他安排了个二级域名：[blog.trle5.dev](https://blog.trle5.dev)，但他好像打算把博客重构了

**2023/07 被 DDoS** <br>
被打我是莫名奇妙，服务器我只搭了些自部署的服务，搭在 Vercel 上的博客和下载站点也被 DDoS 刷掉大把流量。好在整体没什么影响和损失，只花了个换 IP 的钱，还学了不少防 IP 泄露的知识。在此感谢 Cloudflare 的防御和 CDN 🙏