---
title: 隐藏站点的源服务器 IP
author: Hubert Chen
date: '2024-04-01'
updated: '2024-04-05'
image: https://cf-assets.www.cloudflare.com/slt3lc6tev37/6wvLylL1UDvEfh7N5WBd32/44ff9093b6aa1feb33d12d020ce756df/Generic_Orange_Background.jpeg
category: post
flags:
  - hide_image_at_post_list
  - hide_image_at_post_top
---

从不开 CDN，域名 DNS 直接解析到 IP，再到服务器被打到空路由后的总结

### 为什么要隐藏源服务器 IP

首先我们要看看浏览器访问一个站点时，这个请求会如何到达源服务器：

1. 浏览器获得用户输入的域名，首先向 DNS 服务器发送查询请求
2. DNS 服务器收到了请求，解析到了域名对应的 IP，返回给浏览器
3. 浏览器得知了源服务器的 IP 地址，接着继续向源服务器发送请求

<b><abbr title="Domain Name System"><a href="https://zh.wikipedia.org/zh-cn/域名系统" target="_blank" >DNS</a></abbr></b> 的作用就不多说了，简单来看就是放域名进去，就可以吐出域名对应的 IP

这个过程中，浏览器就已经知道源服务器的 IP 了，怎么知道的呢？当然是 DNS 告诉它的

但 DNS 是怎么知道源服务器的 IP 呢？不是什么魔法，是站点主人自己告诉 DNS 的，不然没了 DNS，想访问站点只能记一串 IP，很不方便

#### 现在我看某个人不爽，想把他的网站做掉

`当然我不提倡任何网络攻击，这里只是做一个例子`

上面我们知道了请求是如何到达源站的，最简单的方法，就是一秒给他发几千个请求甚至更多，就能起效果。于是立刻手搓了一段代码，一秒发五千个请求，这个叫分布式拒绝服务（<b><abbr title="Distributed Denial-Of-Service">DDoS</abbr></b>）攻击

由于服务器的配置并不是很高，处理不来我们发送的这么多请求，一段时候后，服务器的主人发现了不对劲，赶紧把 DNS 解析删除了，打算等我们不打他之后再重新添加 DNS 解析，让网站恢复访问

此时，虽然 DNS 解析被删除了，但服主在被打之前在 DNS 里设置的 IP 已经被我们请求过了，我们早已知道了源站 IP。于是我们乘胜追击，把发送请求的域名换成 IP，接着打：

```text
在我们的不懈努力下，服务器的占用爆满，服主只能关机跑路
就算服主重新开机，迎接他的依然是 100% 占用，跑不掉
```

到这里我们已经知道 DNS 与 IP 公开绑定的后果了，就算站点不能通过域名访问了，只要服务器不关机，那还是能通过 IP 访问的，不做些什么，站点就只能停了

所以，我们要在确保通过域名可以正常访问的情况下，保证源服务器的 IP 不被泄露

### 有哪些办法可以隐藏源服务器 IP？

我们先代入到前面的攻击事件中服主的视角，看看有什么方法可恢复站点访问，还能让他打不到我们

#### 换 IP

一台机器想要作为站点的服务器，大部分情况下都需要被分配一个可被外部访问的 IP 地址，但它是可以更换的，可能会需要一些成本

更换了 IP 后，我们可以的服务器就可以开机了，因为攻击者并不知道我们服务器新的 IP 是多少，在不设定 DNS 解析的情况下，服务器是暂时安全了。但如果再次把域名解析到新的 IP，那他还是跟前面一样，只需要访问一次就能知道我们的新 IP，服务器就会继续挨打

我们也可以更换 IP 的同时更换一个域名，不过这样可能会损失之前积累的用户。如果你将更换域名的消息告诉了之前的用户，而攻击者潜伏在用户之中，那么你的服务器可能会再次遭殃

若网站之前有被搜索引擎收录，更换后的新域名再次被收录，那攻击者可以通过搜索引擎得知更换后的域名，DNS 再返回对应的 IP，那服务器同样会遭殃

#### 上高防 / 升级服务器

只要你的配置够高，他就没法把你的服务器干掉线，只是看你的钱包能不能受得住。DDoS 的攻击和防御成本并不是一个量级的，一般的小站点可没有这个资金去买高防，升级服务器的性价比也很低，这是一个很糟糕的解决办法

#### 使用 CDN

本文章的主角，能让 DNS 解析不会给出你的源站 IP，同时还能保证域名可以正常访问，它是怎么运作的呢？

<b><abbr title="Content Delivery Network">CDN</abbr></b> 翻译过来就是内容分发网络，在 DNS 层面，它可以将 DNS 解析出来的 IP 从你的源站 IP 换为来自 CDN 的 IP，避免 DNS 直接暴露源站 IP

**DNS 解析出来不是源站 IP，那怎么获取我的站点内容呢？**

按照流程，在 [前面](#为什么要隐藏源服务器-ip) 所说的 DNS 解析出 IP 进行返回的过程中，使用 CDN 后，解析出来的 IP 是来自 CDN 的。接下来的请求部分，用户会从向源站 IP 发送请求变为向 CDN 的 IP 发送请求，这里 CDN 需要负责接受请求，然后再向源服务器发送请求，过程如下：

```text
# 没有使用 CDN 的请求
用户发送请求     >   源服务器收到请求
源服务器发送响应  >      用户收到响应

# 使用了 CDN 的请求
用户发送请求    >        CDN 收到请求
CDN 转发请求    >    源服务器收到请求
源服务器发送响应  >      CDN 收到响应
CDN 转发响应    >      用户收到响应
```

可以看到，开启 CDN 比不开启 CDN，用户每个请求都会先到达 CDN，再由 CDN 转发到源服务器，源服务器处理完得到响应之后，再发送给 CDN，CDN 再将回应发送给用户

看上去多了两个步骤，麻烦了不少，但我们需要的隐藏源站 IP 功能不是实现了？

不过要注意，CDN 很多时候只能转发 HTTP/S 请求，例如你本来用你的域名直接解析到 IP，使用 git 克隆仓库时可以使用域名替换服务器 IP，但开启 CDN 后，就不能这样了，你可能需要找一些其他方法

#### 还没完

我们选择了最实用的 CDN 方法来隐藏了源站 IP，但还有一些需要注意的事情

1. 如果你在没开 CDN 之前就被打了，只开 CDN 是不行的，你还需要同步更换 IP。CDN 只是阻断了通过 DNS 获取源站 IP 的方法，但你的 IP 早就在开 CDN 前泄露了，此时攻击者不会和你走流程，直接对着 IP 继续打，服务器还是得遭殃
2. 我没有开过 CDN，但我也并没有被打过，看了文章我现在感觉有必要开一个 CDN，还来得及吗？<br>
  没问题，但有隐患。网上有很多专门扫域名扫 IP 的，可能已经记录了你的 IP，但情况并不坏，只要没人刻意去查，是找不到的，就算找到了，你简单换一下 IP，那些记录也就失效了

### 避免源服务器暴露站点特征

截止到这里，防止 DNS 泄露源站 IP 的方法其实已经解决了，不过为了安全，我们还是要配置一下源服务器上的反向代理，避免网上那些扫 IP 的服务暴露了我们在 CDN 后的源服务器 IP

#### 排查暴露的端口

首先，我们要检查一下直接访问服务器 IP 能获得什么，请按照下面的列表排查一下自己服务器：

- 在浏览器中通过 `IP:80` 或 `IP:443` 能否直接访问到你的 HTTP/S 服务
- 如果你有其他非标准端口的服务，使用 `IP:端口` 是否能直接访问
- 如果你有部署 docker 或其他容器类服务，请检查容器的端口映射是否暴露在了公网
- （可选）去 [Censys](https://search.censys.io/) 搜搜你的 IP 中有哪些被记录的端口和服务

##### 暴露的 80/443 标准端口

如果你的 HTTP/S 服务能够通过 80/443 端口访问，那说明你的服务就直接暴露出来了，就算攻击者因为 CDN 中继保护还不知道你的 IP，但 80/443 是标准的 HTTP/S 端口，最简单的 IP 扫描也不会放过这两个端口，只要被扫到，基本就会暴露对应的数据

你可能会好奇，不是开了 CDN 吗？但 CDN 也是通过 80/443 端口才能转发服务器与客户端之间的请求，CDN 能访问到的数据，通过 IP 访问也可以，而直接通过 IP 访问则会绕过 CDN。如果一个 IP 访问后显示的网页数据和某个域名一样，那不用猜，这个 IP 就是域名后面对应的源服务器 IP，这时你的源服务器 IP 也就暴露了

还有上面说到的 [Censys](https://search.censys.io/)，有些人可能觉得我去上面搜自己的 IP 不就是主动暴露自己吗，确实有这个风险，但你可以去搜一下你的域名，有时候你的 DNS 解析或是服务器设置的证书中的域名也可能会在上面暴露 IP 与域名的关系

##### 暴露的非标准端口

第二则是非标准端口的服务，其实也像上面一样，没什么安全性。大一点的扫描类服务为了数据库够大、相比同行更有竞争性，基本都会把每个 IP 能扫的端口都扫一遍，设定非标准端口并没有太大作用

##### 暴露的容器端口

最后是容器中的端口映射，一般容器与主机的端口映射是可以修改的，很多容器自部署服务为了避免端口冲突，并不会将服务端口设为 80/443，而是 3000、5000 这种四位数的端口。为了让 IP 或域名可以不加端口直接访问，需要在服务器上设定反向代理，在收到请求时，根据传入的域名，决定转发请求到哪个容器中处理

设置得当时，通过域名访问站点，不管源服务器上有多少个容器，反向代理都可以帮你正确的转发请求到对应的容器，而用户与 CDN 发送的请求始终都是通过标准的 80/443 HTTP/S 端口，这可以让我们无需为每个相同的 HTTP/S 服务单独设置一个端口，避免了暴露多个端口的问题

**不过，你有按照我说的步骤去排查 docker 容器端口映射了吗？如果发现你的 docker 容器也可以使用 `IP:端口` 直接访问，那你就要注意一下 docker 的端口映射方式了**

docker 中容器的端口映射有两种方式：暴露至公网与仅在本机暴露，下面假设容器内的端口为 2340，映射到主机的端口为 1230：

```bash
// 暴露至公网
// docker run 启动
docker run -p 1230:2340 <容器镜像>
// docker compose 配置
ports:
  - 1230:2340

// 仅在本机暴露
// docker run 启动
docker run -p 127.0.0.1:1230:2340 <容器镜像>
// docker compose 配置
ports:
  - 127.0.0.1:1230:2340
```

相比之下就是在 `1230:2340` 前多加了一段 `127.0.0.1:`，可能有点难看懂，这时它实际也是分为两段，`127.0.0.1:1230` 为主机的部分，`2340` 依然为容器端口，这里我们主要是限定了这个端口只允许在 `127.0.0.1` 访问，而 `127.0.0.1` 同时也对应了 `localhost`，就仅为本机使用

修改容器配置后，重启一下容器，再运行 `docker ps` 看看 PORTS 是不是由 `0.0.0.0:1230->2340/tcp` 变成了 `127.0.0.1:1230->2340/tcp`。这个时候，就无法通过 `IP:1230` 的方式访问到 docker 中的容器了

**还有什么要注意的吗？当然，现在通过 IP 的 80/443 端口依然可以访问到服务器上的服务，跟 [前面](#暴露的-80443-标准端口) 说的一样，只要通过 IP 访问依然能得到与通过域名访问一样的数据，那还是能猜到这两者的关联，所以我们要完全切断 IP 与域名的联系，不留任何可以被关联的数据**

~~当然肯定不是让你直接关机跑路~~

#### 禁止直接通过 IP 访问

看上去很玄乎？虽然前面也提到了 CDN 能访问到的数据，通过 IP 访问也可以，但也有方法，让 CDN 可以正常转发，而直接访问 IP 不返回任何数据

此段部分内容来自 [NGINX 配置避免 IP 访问时证书暴露域名 - ZingLix Blog](https://zinglix.xyz/2021/10/04/nginx-ssl-reject-handshake/) 文章，在此感谢 [ZingLix](https://zinglix.xyz/)

假设我们使用的反向代理软件为 [Nginx](https://www.nginx.com/)，我们原本的配置如下，其中假设自己的域名为 `example.com`：

```conf
# 此段作用为转发 HTTP 请求至 HTTPS
server {
  listen 80 default_server;
  return 301 https://$host$request_uri;
}

server {
  listen 443 http2 ssl;
  server_name example.com;
  ssl_certificate <SSL 证书公钥文件>;
  ssl_certificate_key <SSL 证书私钥文件>;
  # 忽略了一些配置

  location / {
    proxy_pass http://localhost:3000;
    # 忽略了一些配置
  }
}
```

一份很普通的 nginx 配置，除了转发 HTTP 请求到 HTTPS 外，还有一段配置，作用是收到包含 `example.com` 域名的请求时，将请求转发到本地的 `3000` 端口进行处理。解析好 DNS 或同时加上 CDN，你都可以通过 `example.com` 域名来访问到服务器上的 `3000` 端口对应的服务

不过，如果你通过浏览器直接访问 IP，不管使用 `http://` 还是 `https://` 前缀，最后都是访问到了 443 端口，因为第一端的转发请求起了作用。而下一步就是请求 443 端口了，第二段配置的 `listen 443` 意思就是监听 443 端口，那么这个请求自然就传到第二段配置设定的 `3000` 端口对应的服务里去了，这就造成了使用 IP 能直接访问到服务器上的服务，我们可不希望这样

##### 添加配置拒绝直接通过 IP 访问时的请求

那怎么办？我们可以在第一段后面添加一段监听 `443` 端口的配置，返回 403 或者 404？你可以现在试一下：

```conf
# 此处作用为转发 HTTP 请求至 HTTPS
server {
  listen 80 default_server;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl default_server;
  return 403;
}

# 忽略了第三段配置
```

然后你会不出所料的得到类似 `no "ssl_certificate" is defined for the "listen ... ssl"` 的错误，简单来说就是，想要监听 443 端口，你必须要设定一个 SSL 证书，当然这个证书是否有效并不重要，只要是个证书就可以

但在添加证书前，我们先看看证书里有哪些内容（来自 [什么是 SSL 证书？ | Cloudflare](https://www.cloudflare.com/zh-cn/learning/ssl/what-is-an-ssl-certificate/)）：

```text
针对其颁发证书的域名
证书颁发给哪一个人、组织或设备
证书由哪一证书颁发机构颁发
证书颁发机构的数字签名
关联的子域
证书的颁发日期
证书的到期日期
公钥（私钥为保密状态）
```

看到了吗，第一行中就有关于域名的信息，这可不行，在这个配置里加 SSL 证书也会泄露我们的域名，怎么办呢？

也有办法，只要我们给一个不包含我们域名信息的 SSL 证书就可以了，毕竟 nginx 并不会检验证书的有效性，于是我们使用 openssl 生成一个私钥和证书：

```bash
# 请在 Linux 下运行，生成后的证书将生成在运行代码时的目录
# 在运行第二行时，会询问你证书的信息，可以随便填写也可以直接全部回车
openssl genpkey -algorithm RSA -out private.key
openssl req -new -key private.key -out cert.csr
openssl x509 -req -in cert.csr -signkey private.key -out certificate.crt
```

运行以上命令后，目录下会多出来三个文件，分别是 `private.key`、`cert.csr` 和 `certificate.crt`，将其添加到前面的配置里：

```conf
# 忽略了第一段配置

server {
  listen 443 ssl default_server;
  ssl_certificate <文件目录>/certificate.crt;
  ssl_certificate_key <文件目录>/private.key;
  return 403;
}

# 忽略了第三段配置
```

此时再去直接访问 IP，你就会得到证书无效的错误，当然你也可以在页面上找一找，一般会有高级选项允许继续访问，就会得到 403 或 404 的错误，看你是如何设置的

不过我们是为了防止证书暴露信息，所以这是无法访问也是在我们的预期中的。点击浏览器地址栏旁边的信息按钮，这个按钮一般会显示成一个小锁或是类似设置的图标，就能看到证书无效的提示，点击查看详细信息就在弹出的窗口里可以看到里面的证书信息，这些信息就是你在前面生成证书时填写的信息

到这里，已经很难将你的源站与域名联系起来了，只要你使用 openssl 生成的证书中没有明晃晃写上你的域名，那想通过特征找到源站对应的域名，就等于大海捞针了

**如果你的 Nginx 版本高于 1.19.4，你还可以使用新功能：拒绝握手**

##### 设定直接通过 IP 访问时拒绝握手

**注意：这个功能和上一个方法作用类似，你只需要选择其中的一个来设置。相对而言，拒绝握手能提供更少的信息，效果更佳**

这个功能需要 Nginx 版本高于 1.19.4，你可以在终端运行一下 `nginx -v` 检查一下是否可以使用该新功能。当然你也可以去升级 Nginx，如果无法升级或其他原因不想升级，上面的方法也足够安全了

拒绝握手的方法配置起来很简单，与上面的方法类似，只需在正常配置前添加一个监听 443 端口的服务即可，可以不指定 SSL 证书：

```conf
# 此处作用为转发 HTTP 请求至 HTTPS
server {
  listen 80 default_server;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl default_server;
  # 当配置中开启拒绝握手时，不需要添加 SSL 证书与私钥
  ssl_reject_handshake on;
}

# 忽略了第三段配置
```

保存配置并重启 nginx 服务后，再去浏览器里访问 IP，就可以看到已经无法通过 IP 访问到站点了，而且页面信息里也没有证书信息，可谓非常的干净

第二段配置中的 `ssl_reject_handshake on` 就是关键所在，只要一段配置中启用了这个功能，那么走这个通道的请求都会被拒绝握手，不会提供任何信息，所以注意不要往正常的服务配置里启用这个功能

#### 我们安全了？暂时的

直到这里，我们开启了 CDN、关闭了暴露的端口、禁止 IP 访问以及配置了证书避免泄露我们的域名，不过还有一个方式能访问到服务，那就是我们的域名

为什么配置了怎么多，IP 都不能访问到网站了，而通过域名还可以？下面有两行命令，你可以试一试：

```bash
curl -v -k https://<你的源站 IP>
curl -v -k https://<你的源站所绑定的域名>
```

第一行是直接通过 IP 请求内容，第二行相同，但走的是域名来请求内容，可能还会经过 CDN。看着我们是配置成功了，IP 会无法访问，域名访问一切正常，不过，如果你试试下面这行命令呢？

```bash
curl -v -k https://<你的源站所绑定的域名> --resolve <你的源站所绑定的域名>:443:<你的源站 IP>
```

看似能正常从域名获取网页内容？没错，不过我可要告诉你，这里请求的其实是 IP，而不是你的域名，是不会经过 CDN 的。但我们配置了禁止 IP 访问，为什么还是能获取到站点内容呢？

##### 依然有办法可以通过 IP 访问

先看看这行命令有哪些参数，下面的域名将被替换为 example.com，IP 被替换为 333.333.333.333，CDN 的 IP 被替换为 444.444.444.444：

```bash
curl \
  -v \ # 输出请求时的整个过程
  -k \ # 请求时跳过 SSL 检测（不会因为证书原因导致请求失败）
  https://example.com \ # 要请求的域名
  --resolve \ # 将某个域名强制解析到某个 IP（替代 DNS 的作用）
    example.com:443:333.333.333.333 # 要强制指定的数据
```

这么看，这行命令的作用就是：在请求时输出全部日志并跳过 SSL 检测，跳过正常的 DNS 环节，直接将域名解析到指定的 IP 地址，再向强制解析后的域名发送请求，运行后的输出类似这样：

```bash
$ curl -v -k https://example.com --resolve example.com:443:333.333.333.333
* Added example.com:443:333.333.333.333 to DNS cache
* Hostname example.com was found in DNS cache
*   Trying 333.333.333.333:443...
* Connected to example.com (333.333.333.333) port 443 (#0)
# 忽略后续信息
```

而正常通过域名访问的输出呢？

```bash
$ curl -v -k https://example.com
*   Trying 444.444.444.444:443...
* Connected to example.com (444.444.444.444) port 443 (#0)
# 忽略后续信息
```

可以看到，如果指定了 `--resolve example.com:443:333.333.333.333` 参数，在请求时会将 `example.com` 直接解析到 `333.333.333.333`，之后请求会直接冲着源服务器去，服务器再返回站点数据，我们的服务器可能就会再次沦陷了

怎么办呢？说实话，如果攻击者到了这种拿着域名一个个试试 IP 能不能通过请求的时候，我们就只能限制哪些 IP 可以直接访问服务器了

##### 限制哪些 IP 可以直接访问源服务器

想要限制哪些 IP 可以访问我们的源服务器，我们总不能手动将用户的 IP 地址添加到防火墙白名单，家庭宽带很多时候并不会有固定 IP，每次用户 IP 变动时，你都需要实时将用户的 IP 添加到防火墙白名单，这相当的麻烦，而且你总不能在用户的设备上安装软件实时检测 IP 变化，这个解决方法很不现实

但如果我们使用的是 CDN，那解决方法就很方便了，由于 CDN 会负责转发用户的请求，使用 CDN 后用户与源服务器的请求始终是由 CDN 负责的，服务器日志中只会有来自 CDN IP 的请求，我们只需要使用防火墙拒绝其他 IP 的连接请求，仅允许来自 CDN IP 的请求即可

不过，你需要提前查询一下你使用的 CDN 供应商是否能提供 CDN 全部 IP 的列表，不然下方的两个方法都不适用你的情况

下面部分内容来自 [屏蔽 Censys 扫描器, 及设置仅允许 Cloudflare 回源 - Zikin 的独立博客](https://zikin.org/block-censys-scanner/#header-id-4) 文章，同样在此感谢 [Zikin](https://zikin.org/)

我们有两种方式可以对设置仅允许哪些 IP 与源服务器建立连接：

**方法 1: 使用 Nginx 的 `allow` / `deny` 字段 （不推荐）**

> 由于这是一个不被推荐的方法，我并不会写出具体的操作流程，如果你还是想看看如何配置，你可以去 [屏蔽 Censys 扫描器, 及设置仅允许 Cloudflare 回源 - Zikin 的独立博客](https://zikin.org/block-censys-scanner/#header-id-4) 文章查看操作步骤

这个方法是可以不向被限制的 IP 发送原本的网页数据，但在搭配了上面添加的 nginx 拒绝握手特性时，会出现一个自欺欺骗人的情况。我们先保留之前的拒绝握手设置，再往普通配置里添加 `deny` 字段拒绝所有 IP 的连接请求：

```conf
# 此处作用为转发 HTTP 请求至 HTTPS
server {
  listen 80 default_server;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl default_server;
  ssl_reject_handshake on;
}

server {
  listen 443 http2 ssl;
  server_name example.com;
  ssl_certificate <SSL 证书公钥文件>;
  ssl_certificate_key <SSL 证书私钥文件>;
  # 忽略了一些配置

  # 方便测试，这里我们将拒绝来自所有 IP 的连接请求，使用时，你需要改为仅允许来自你 CDN 供应商的 IP
  deny all;

  location / {
    proxy_pass http://localhost:3000;
    # 忽略了一些配置
  }
}
```

我们再使用 curl 发送请求，域名被替换为 example.com，源站 IP 依然为 333.333.333.333：

我们先试试直接请求 IP

```bash
$ curl -v -k https://333.333.333.333
*   Trying 333.333.333.333:443...
* Connected to 333.333.333.333 (333.333.333.333) port 443 (#0)
* ALPN: offers h2,http/1.1
* TLSv1.3 (OUT), TLS handshake, Client hello (1):
* TLSv1.3 (IN), TLS alert, unrecognized name (624):
* OpenSSL: error:0A000458:SSL routines::tlsv1 unrecognized name
* Closing connection 0
curl: (35) OpenSSL: error:0A000458:SSL routines::tlsv1 unrecognized name
```

与预期相同，服务器拒绝了我们发送的握手请求，也没有提供证书，接下来我们试试强制将域名解析到源站的 IP 地址：

```bash
$ curl -v -k https://example.com --resolve example.com:443:333.333.333.333
* Added example.com:443:333.333.333.333 to DNS cache
* Hostname example.com was found in DNS cache
*   Trying 333.333.333.333:443...
* Connected to example.com (333.333.333.333) port 443 (#0)
* ALPN: offers h2,http/1.1
# 忽略了部分 TLS 握手内容
* ALPN: server accepted h2
* Server certificate:
# 忽略了服务器证书内容
# 忽略了请求信息
> GET / HTTP/2
> Host: example.com
> user-agent: curl
> accept: */*
>
* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):
* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):
* old SSL session ID is stale, removing
< HTTP/2 403
< server: nginx
< content-type: text/html
< content-length: 153
<
<html>
<head><title>403 Forbidden</title></head>
<body>
<center><h1>403 Forbidden</h1></center>
<hr><center>nginx</center>
</body>
</html>
* Connection #0 to host example.com left intact
```

可以看到，curl 成功与源服务器握手，并输出了来自 nginx 的回应，虽然最后输出的是 403 Forbidden(无权访问) 的回应，也没有输出原本的网页信息。看上去 IP 白名单起效果了，但它并没有达到我们想要的效果，此时我们再试试将一个不存在的域名解析到源站的 IP 地址：

```bash
$ curl -v -k https://noexistdomian --resolve noexistdomian:443:333.333.333.333
* Added noexistdomian:443:333.333.333.333 to DNS cache
* Hostname noexistdomian was found in DNS cache
*   Trying 333.333.333.333:443...
* Connected to noexistdomian (333.333.333.333) port 443 (#0)
* ALPN: offers h2,http/1.1
* TLSv1.3 (OUT), TLS handshake, Client hello (1):
* TLSv1.3 (IN), TLS alert, unrecognized name (624):
* OpenSSL: error:0A000458:SSL routines::tlsv1 unrecognized name
* Closing connection 0
curl: (35) OpenSSL: error:0A000458:SSL routines::tlsv1 unrecognized name
```

从最后的输出可以看出，这个不存在的域名，触发了我们的拒绝握手配置

**如果向源服务器发送请求时传递的域名正确，则可成功握手，否则将返回拒绝握手的 `tlsv1 unrecognized name` 错误**

这代表当攻击者使用域名对我们的服务器进行扫描时，直接请求 IP 或附加的是错误的域名，那么你的服务器会正常的拒绝握手。但如果请求的是正确的域名，服务器接收了请求、完成了握手，然后返回了 403 Forbidden(无权访问)

有什么问题呢？将视角换为攻击者就好理解了：我直接请求 IP 你拒绝我的握手，用其他域名请求你也拒绝握手，但我用 `example.com` 你通过了握手再给我返回 403？那这个 IP 绝对跟 `example.com` 这个域名有关系

后面的就不用我说了吧，可以等着换下一个 IP 了

**方法 2: 使用系统防火墙**

在这里，我们使用基于 `iptables` 易用接口的 `ufw` 设定防火墙规则，此处部分内容同样来自 [屏蔽 Censys 扫描器, 及设置仅允许 Cloudflare 回源 - Zikin 的独立博客](https://zikin.org/block-censys-scanner/#header-id-4) 文章

我们照样先试试被防火墙封禁后，直接请求 IP 与携带域名请求会怎么样，先设置防火墙：

```bash
sudo ufw allow OpenSSH # 设定防火墙允许 ssh，否则可能就连不上服务器了
sudo ufw default deny # 将默认入站连接设定为拒绝
```

**注意！如果你需要通过 ssh 才能连接到服务器，请务必按照上面的方法允许 ssh 请求，否则你可能会再也无法连接到你的服务器**

此时，我们已经设定好了防火墙配置，允许 ssh 连接，并拒绝所有入站请求，接下来我们就可以通过 ufw 开启防火墙了：

```bash
sudo ufw enable # 启用防火墙
sudo ufw status verbose # 查看防火墙状态以及规则

# 此时的输出应如下所示
Status: active
Logging: on (low)
Default: deny (incoming), allow (outgoing), deny (routed)
New profiles: skip

To                         Action      From
--                         ------      ----
22/tcp (OpenSSH)           ALLOW IN    Anywhere
22/tcp (OpenSSH (v6))      ALLOW IN    Anywhere (v6)
```

这时候再去试试请求服务器，你会发现不管是单独请求 IP 还是携带域名请求都无法获取到内容了，可能会提示无法连接或者迟迟没有完成请求，因为这个时候请求到达防火墙的时候直接被拒绝了，没有返回任何信息

不过这个时候再去浏览器访问域名，你会发现域名也进不去了，因为上面的规则阻止了所有 IP 的入站请求，CDN 的 IP 也同样被阻止了，所以我们还需要设定规则允许来自 CDN IP 的连接

与用户多变的 IP 不同，CDN 的 IP 一般是固定的，我们只需要将 CDN 供应商提供的 CDN IP 列表添加到防火墙白名单即可

我使用的 CDN 来自 Cloudflare，如果你使用的是其他 CDN 提供商，请手动查找对应的 IP 范围列表，按照 [前面](#限制哪些-ip-可以直接访问源服务器) 的需求，Cloudflare 是提供全部 IP 的列表的，可见 [IP 范围 | Cloudflare](https://www.cloudflare.com/ips/)，我们只需要将列出的 IP 范围添加到防火墙白名单，通过域名访问的请求即可恢复正常：

```bash
sudo ufw allow from 173.245.48.0/20
sudo ufw allow from 103.21.244.0/22
# 省略后面一条条加的过程
```

测试的时候我觉得很麻烦，于是我写了一个 shell 脚本，发布在 [GitHub Gists](https://gist.github.com/Interstellar750/1803cdefcaa91940e87a3d27fe78f17b) 上，可以一键获取 Cloudflare CDN 的所有 IP 范围列表并添加到防火墙白名单，你可以使用它来一键添加：

```bash
curl -L https://gist.githubusercontent.com/Interstellar750/1803cdefcaa91940e87a3d27fe78f17b/raw/add_cf_ips.sh | sudo bash

# 如果你想从防火墙白名单中移除 Cloudflare 的 IP，执行下面这行
# 运行后会在运行时的目录留下来一个 add_cf_ips.sh 文件，你可能需要手动删除它
curl -L https://gist.githubusercontent.com/Interstellar750/1803cdefcaa91940e87a3d27fe78f17b/raw/add_cf_ips.sh > add_cf_ips.sh && sudo bash add_cf_ips.sh --remove
```

对了，在添加完防火墙规则后，你可能需要运行一下 `sudo ufw reload` 加载修改后的规则以生效，之后再去浏览器使用域名访问，就可以正常访问了。使用 curl 请求 IP 或携带域名请求 IP，都不会返回站点信息，我们就完成了对源服务器的保护

### 最后的一些琐事

如果设定了防火墙白名单，那么上面 nginx 的拒绝握手配置其实也可有可无了，非 CDN 的 IP 根本无法触发到这个拒绝握手的规则，最坏的情况只能是攻击者用 CDN 的 IP 去扫服务器请求，如果真有这种情况，可以考虑换一个 CDN 提供商了

在想到防火墙添加 Cloudflare CDN 的 IP 白名单时，我还在考虑如果攻击者连上 warp 之后扫服务器怎么办，我就去查了查 warp 的 IP 段，跟 CDN 并不在一个段。这下除非去机房一台机一台机的拔网线，不然基本就不可能找得到我 IP 了

文章末尾感谢：

**[Cloudflare](https://www.cloudflare.com/)** <br>
DNS / CDN / PaaS 提供商，提供了很多好用的服务，帮我缓解了很多通过 CDN 的攻击，让我的网站不至于关站跑路

**[Vercel](https://vercel.com/)** <br>
PaaS 提供商，服务真的非常好用，尽管我的流量被攻击刷到远超 100GB 的 1.2TB 后，没有向我发送账单也没有封禁我的账号

**本文提到文章的两位作者** <br>
再次感谢您的教程，让我可以学习到需要的网络安全知识

**某个服务器提供商** <br>
由于安全原因我这里不能说是哪个服务器提供商，但还是在此感谢一下，不然我就没地方放自部署服务了

**不知名的攻击者** <br>
从 23 年 7 月开始将我服务器打到空路由，在我建立防护后顶着 Cloudflare 一直给我刷了估计有 30m 请求。同时给我 Vercel 的免费 100 GB 套餐超额刷至 1.2TB，让我被迫学习网络安全知识
