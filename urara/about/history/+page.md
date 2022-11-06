---
title: '建站历程'
created: 2022-10-22
updated: 2022-11-02
summary: '因为提前感觉到这个页面会变得很长很长，就先分离出来了'

---

#### 想了想以后这个页面似乎会长长长，就单独放个页面了 

以后也得想个办法整理一下这个页面

##### 2022/01/24 初次建立

初次建立并使用 [GitHub Pages](https://github.io/) 来作为服务器 （其实并不是第一次，前前后后试了好几次，因为碰到了好多 bug）

##### 2022/01/29 白嫖域名

在 [Freenom](https://freenom.com/) 上申请了 12 个月的免费域名 trle5.tk ，但由于不会设置 DNS 解析，依然用着 [GitHub Pages](https://github.io/) 的默认域名 

##### 2022/02/26 迁移后端

由于 x10m2 上的 [Sailfish OS](https://sailfishos.org/) 因为未知问题操作很卡，把 hexo 后端备份出来迁移到了 s10e 上，使用 [Termux](https://play.google.com/store/apps/details?id=com.termux) 来继续运维 

##### 2022/02/27 设置 DNS 解析

将域名 DNS 解析托管到 [GoDaddy](https://godaddy.com/) ，成功用上了自定义域名

##### 2022/03/08 购入新域名

在 [reg.ru](https://reg.ru/) 购买了一年的 [trle5.xyz](https://trle5.xyz/) 域名，用于存放文件，本站可能有一些图片文件会储存在里面

##### 2022/03/14 更换 DNS 解析

更换为由 [Freenom](https://freenom.com/) 提供的 DNS 解析

##### 2022/03/15 更换存文件的地方

把 blackbox 的域名从 [trle5.xyz](https://trle5.xyz/) 迁移到 [t5d.trle5.tk](https://t5d.trle5.tk/)

##### 2022/05/07 换 Chic 主题

从默认的 Landscape 主题更换为 [Siricee](https://github.com/Siricee/) 制作的 [Chic](https://github.com/Siricee/hexo-theme-Chic/) 主题

##### 2022/05/08 建立镜像站

使用 [Vercel](https://vercel.com/) 建立了博客镜像站，使用域名 [trle5.xyz](https://trle5.xyz/) ，DNS 解析由 [Cloudflare](https://cloudflare.com/) 提供

##### 2022/06/01 重新配置主题

重新配置了博客主题，因为 05/15 那天手机数据丢失让博客后端也部分丢失了 （真的丢了好多东西啊😢）

##### 2022/07/19 修正文章

重新修正了一篇文章，之前写的文章发现达不到所想的方案所以就暂搁了 ~~**懒**~~ ，由于之前的丢数据问题，Cloudflare 账号也登不上了，找回有点麻烦

##### 2022/09/11 成功找回 Cloudflare 帐号

给 Cloudflare 客服发邮件，成功拿回了账号的控制权，目前 [trle5.xyz](https://trle5.xyz/) 站点会随时更新，就是代表上面可能会有一些没写完的文章和新东西，文章写完后再推送至 [trle5.tk](https://trle5.tk/)，于 6 月 4 日在 [Porkbun](https://porkbun.com/) 白嫖的 [trle5.dev](https://trle5.dev/) 域名还没打算好用来干嘛，两个付费域名以我现在的经济能力压力有点大

##### 2022/10/23 切换到 Urara 后端

花了差不多整个下午的时间一直搞到凌晨两点多，终于把 Urara 后端配置好了，从九月月底在 [Dejavu's Blog](https://t.me/dejavuBlog/2069/) 频道看见 Urara 直到今天才完全成功切换到这个后端，配置其实不算太难，我完全没有 svelte 的基础，但看着原文件和 Urara 作者 [藍+85CD](https://kwaa.dev/) 的博客改也勉强可以了，后面估计我还得改不少东西

##### 2022/11/02 小修小补

还是没能摸透 Urara 是怎么要求文章的，好像对 # 号有要求，对文章重新调整了，测试过大概都正常了
