---
author: Hubert Chen
title: 为 Chrome OS 设置代理
date: '2024-08-06'
summary: 想要在 Chrome OS 上简单方便的代理设备的流量，那就只能在 Android 环境下安装软件，再由系统设定好的本机通道自动在 Chrome、Android 与 Linux 虚拟机之间共享，好处自然是方便且稳定，代价嘛...
category: post
tags:
  - Chrome OS
---

> **⚠ 文章未完成**
>
> Chrome OS 因为安全原因逐步隔离了用户空间和 crosh 终端
>
> 这导致了原本固定映射至用户下载文件夹的 `/home/chronos/Downloads` 目录已经消失了
>
> 于是现在找不到一个稳定的目录可以直接将 sing-box 的二进制文件转移到 crosh 中的 `/usr/local/bin/` 目录中（可能有，但我心灰意冷懒得找了）
>
> 而如果在 crosh 中直接使用 curl 从 GitHub 上下载文件，大概率会因为 DNS 污染等原因下载失败，没有一个好用的办法...

想要在 Chrome OS 上简单方便的代理设备的流量，那就只能在 Android 环境下安装软件，再由系统设定好的本机通道自动在 Chrome、Android 与 Linux 虚拟机之间共享，好处自然是方便且稳定，代价嘛...

<details>
  <summary><code>点击来帮助 Chrome OS 夺回属于它的内存</code></summary>

在某一天调式程序时，我发现请求的 API 似乎迟迟没有响应，想着是不是节点出问题了？当我尝试打开 Android 上的代理软件时，我意识到并不是网络问题，而是这个 Android 虚拟机，在只跑了一个代理软件的情况下，卡死了...

保存代码进度再重启设备后，Android 虚拟机正常了，继续写代码调程序，但那天晚上我意识到，我似乎启用这个 Android 虚拟机，为的只是跑一个代理软件？于是在第二天我备份好 Android 虚拟机中的必要数据后就把它删掉了。然后我在诊断程序里看到设备的空闲内存从日常的 2GB 变为了... 12GB

剩下的就不多说了，现在 Chrome OS 夺回了属于它的内存，只需要解决网络代理问题就可以了

> 如果你的网络情况还不能在脱离了 Android 环境中的代理软件下访问网络，那请先不要着急删掉它

</details>

删掉了 Android 容器后，就得考虑选择替代的代理方式了，目前大概有四类设置代理的方式，在下方表格中按配置难易度从低到高排序，还有能代理到的范围和优缺点

| 代理类型 | Chrome | <abbr title="Linux 虚拟机">crostini</abbr> | <abbr title="Chrome OS Shell">crosh</abbr> | 优点 | 缺点 |
| :--- | :---: | :---: | :---: | :--- | :--- |
| Wi-Fi 代理 | ✅ | ❌ | ❌ | 简单方便，可连本机或其他设备 | 代理范围过小，Linux 虚拟机吃不上，每个 Wi-Fi 都需要单独配置 |
| WireGuard | ✅ | ✅ | ✅ | 代理范围广，有系统 UI 控件可快捷切换 | 需要进入 crosh 添加配置，协议因素有速度劣势 |
| Tun | ✅ | ✅ | ✅ | 代理范围广 | 需要在 crosh 中配置代理软件，可能还会有些奇怪问题 |
| TProxy | ✅ | ❌ | ✅ | 暂时想不到 | 代理范围一般，Linux 虚拟机会直接没网（不只是没代理） |

### 非侵入式（不修改 Chrome OS）

我们有两种不需要安装任何软件就能添加代理的方式，它们就是 Chrome OS 自带的 WireGuard 和比较差劲的 Wi-Fi 代理

#### 1. WireGuard

通过 WireGuard 设置代理可以覆盖到浏览器、Linux 虚拟机和 crosh，还有系统 UI 控件，方便又好用。

但是系统自带的图形化 WireGuard 配置添加工具有 bug，必须要在 crosh 中通过命令来添加配置，~~这代表你必须要清除所有数据，开启开发者模式后才能添加 WireGuard 配置~~ 似乎并不需要，请手动试试能不能通过下方的快捷键打开 crosh，如果可以的话就不需要

**此教程来自 [ChromeOS Flex: Can’t save Wireguard config (FIX) – Tech Blog](https://web.archive.org/web/20221003175242/https://tech.davidfield.co.uk/2022/07/20/chromeos-flex-cant-save-wireguard-config-fix/) (Web Archive link)**

> 由于 Cloudflare 的 Warp 现在被 ban 的厉害，比较推荐自建服务端

首先确保你已经为你的 Chrome OS 设备启用了开发者模式，之后按 <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>T</kbd> 来打开 crosh，再**逐行运行以下命令**，注意根据你的 WireGuard 配置替换掉对应的内容：

```bash
wireguard new <名称>
wireguard set <名称> local-ip 10.8.0.9
wireguard set <名称> private-key # 运行这行命令后粘贴密钥，回车保存
wireguard set <名称> peer <公钥> preshared-key # 同上，但如果没有预共享密钥则不用运行此行
wireguard set <名称> peer <公钥> allowed-ips 0.0.0.0/0
wireguard set <名称> peer <公钥> endpoint <端点 IP:端口>
wireguard set <名称> peer <公钥> persistent-keepalive 0
wireguard show # 查看添加完成的配置
```

添加完配置后，你应该会得到类似以下的输出：

```bash
name: wireguard-profile
  local ip: 10.8.0.9
  public key: iJbPYu1dCc1VVU7o6OS5uWhnni9iXCi1nuGkwdsIPn0=
  private key: (hidden)
  name servers: 8.8.8.8, 8.8.4.4

  peer: QiTfo+u2brfoTh5BHQKbU/Rt/OJ7MAQMO0+pMEYNxRg=
    preshared key: (hidden or not set)
    endpoint: 127.1:5300
    allowed ips: 0.0.0.0/0
    persistent keepalive: 0
```

其中的 public key、peer 以及 endpoint 可能会与上方显示的不同，因为这几个参数取决于你的 WireGuard 配置，然后你就可以到设置的网络板块里启用刚刚添加的配置，试试能不能正常代理流量了

#### 2. Wi-Fi 代理

Wi-Fi 代理更适合只用浏览器上网的用户，因为代理不到 Linux 虚拟机，可以应急用用，长期使用还是推荐选择其他方式

Wi-Fi 代理配置方法不算难，只需要在设置中依次点击 **网络** > **Wi-Fi**，找到目前已连接的 Wi-Fi 名称并点击它就可以查看网络详情信息，再点击最下方的 `代理` 选项，把连接选项改为 `手动配置代理`，就可以配置 Wi-Fi 代理了

接下来就是填入 `HTTP/S` 或 `SOCKS` 代理主机的 IP 以及端口了，如果你的代理软件支持在一个端口上使用多个协议，还可以把 `对所有协议使用同一代理` 打开，那样只需要填一个主机的 IP 和端口就足够了，至于下面的 `不要对以下主机和域使用代理设置` 直接留空，如果你知道这方面的知识，就看你想怎么来了，填完信息记得点击保存

只要你填入的 IP 和端口正确，且对应的设备上运行着负责代理流量的服务，那么这个时候 Wi-Fi 代理就已经生效了，去测试一下吧

### 侵入式（在 Chrome OS 中安装代理软件）

如果要像 Linux 发行版那样在 Chrome OS 里安装代理软件，那么首先你得给你的 Chrome OS 设备启用开发者模式

**注意不是修改 `设置` > `关于系统` > `版本` 里的开发者版本**

具体怎么启用开发者模式我这里就不写了，只讲启用开发者模式后如何将代理软件安装到 Chrome OS 中

如果你选择安装侵入式的代理软件，你就可以选择多种方式来将 Chrome OS 连接到代理，这里首要推荐的是支持 Tun 模式的 sing-box

#### sing-box

折腾了许久，在 Chrome OS 中似乎只有 sing-box 能使用 Tun 模式来代理设备的全部流量，根本原因大概有两个：

1. 似乎 Chrome OS 的系统网络栈不支持执行 L3 到 L4 转换，只有在 sing-box 入站(inbounds) 配置中将 Tun 的 `stack` 参数手动设定为 `gVisor` 才可以正常转发流量
2. 同时需要将 sing-box 路由(route) 配置中的 `default_interface` 参数设定为 `wlan0`，这个值对应的是给机器提供网络的网卡设备，我的 Pixelbook Go 没有网线接口，我也没有能插网线的拓展坞，没法测试连接网线后是否需要修改。有能力的话请自己到 crosh 里运行 `ifconfig` 命令判断是否要修改

下方是一份针对 Chrome OS 的 sing-box 配置，配置好了 Tun TProxy 和 HTTP 代理入站，[Yacd](https://github.com/MetaCubeX/Yacd-meta) Web UI 控制台，DNS 和去广告规则集，使用时请手动替换掉出站(outbounds) 中的示例节点:

<details no-indent>
  <summary><code>点击查看配置</code></summary>

```json
{
  "log": { "level": "info", "timestamp": false },
  "experimental": {
    "clash_api": { "default_mode": "rule", "external_controller": "127.0.0.1:9090",
      "external_ui": "ui", "secret": "", "external_ui_download_detour": "",
      "external_ui_download_url": "https://github.com/MetaCubeX/Yacd-meta/archive/gh-pages.zip"
  },
  "cache_file": { "enabled": true, "store_fakeip": false } },
  "dns": {
    "servers": [
      { "tag": "proxyDns", "detour": "proxy", "address": "https://1.1.1.1/dns-query" },
      { "tag": "localDns", "detour": "direct", "address": "tls://120.53.53.53" },
      { "tag": "block", "address": "rcode://success" }
    ],
    "rules": [
      { "rule_set": "geosite-category-ads-all", "server": "block" },
      { "outbound": "any", "server": "localDns", "disable_cache": true },
      { "clash_mode": "direct", "server": "localDns" },
      { "clash_mode": "global", "server": "proxyDns" }
    ],
    "strategy": "prefer_ipv4"
  },
  "inbounds": [
    { "type": "tun", "stack": "gvisor",
      "auto_route": true, "strict_route": true,
      "domain_strategy": "prefer_ipv4", "mtu": 9000,
      "inet4_address": "172.114.0.1/30", "inet6_address": "2001::1/64",
      "sniff": true, "sniff_override_destination": true,
      "inet4_route_exclude_address": [ "0.0.0.0/8", "10.0.0.0/8", "127.0.0.0/8", "169.254.0.0/16", "172.16.0.0/12", "192.168.0.0/16", "224.0.0.0/4", "240.0.0.0/4" ]
    },
    { "type": "tproxy", "tag": "TPROXY-IN", "listen": "0.0.0.0", "listen_port": 7895, "sniff": true, "sniff_override_destination": true },
    { "type": "mixed", "listen": "127.0.0.1", "listen_port": 2080, "sniff": true, "users": [] }
  ],
  "outbounds": [
    { "tag":"proxy", "type":"selector", "outbounds":[ "auto", "direct", "outbound_hy2" ] },
    { "tag":"auto", "type":"urltest", "url": "http://www.gstatic.com/generate_204", "interval": "10m", "tolerance": 50, "outbounds":[ "outbound_hy2" ] },
    {
      "type": "hysteria2", "tag": "outbound_hy2",
      "server": "114.51.4.191", "server_port": 9810,
      "password": "example_password",
      "tls": { "enabled": true, "server_name": "exmaple.com", "insecure": true }
    },
    { "type": "direct", "tag": "direct" },
    { "type": "dns", "tag": "dns-out" },
    { "type": "block", "tag": "block" }
  ],
  "route": {
    "default_interface": "wlan0",
    "final": "proxy",
    "rules": [
      { "protocol": "dns", "outbound": "dns-out" },
      { "rule_set": "geosite-category-ads-all", "outbound": "block" },
      { "clash_mode": "direct", "outbound": "direct" },
      { "clash_mode": "global", "outbound": "proxy" },
      { "domain": [ "clash.razord.top", "yacd.metacubex.one", "yacd.haishan.me", "d.metacubex.one" ], "outbound": "direct" }
    ],
    "rule_set": [
      { "tag": "geosite-category-ads-all", "type": "remote", "format": "binary", "download_detour": "direct",
        "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/sing/geo/geosite/category-ads-all.srs"
      }
    ]
  }
}
```

</details>

配置文件有了，你可以决定是否要继续操作，接下来的步骤如果操作不当可能会炸掉你的系统

首先判断一下你的 Chrome OS 设备的架构，按 <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>T</kbd> 打开 crosh，使用 `uname -m` 命令来查看硬件架构：

```bash
crosh> uname -m
x86_64
```

由于我的 Pixelbook Go 使用的是英特尔(Intel) 的处理器，所以这里显示的是 `x86_64`，如果是 AMD(超威半导体) 的处理器，那应该也是 `x86_64`，也有可能是 `amd64`

如果你的 Chromebook 使用了高通(Qualcomm) 或者联发科(MediaTek) 的处理器，那可能会显示 `arm64` 或者 `aarch64`

接着前往 [SagerNet/sing-box](https://github.com/SagerNet/sing-box/releases/latest) 的最新发布页面，根据你的设备架构来拿到最新的 sing-box 的下载链接

> 如果设备架构是 `x86_64` 或 `amd64`，那就选 `sing-box-<版本号>-linux-amd64.tar.gz`
>
> 如果设备架构是 `aarch64` 或 `arm64`，那就选 `sing-box-<版本号>-linux-arm64.tar.gz`

建议打开网站后按 <kbd>Ctrl</kbd> + <kbd>F</kbd> 进行搜索，先搜 `linux-`，然后根据你的设备架构接着输入 `amd64` 或 `arm64`，最后唯一高亮的那个就是你需要的，右键那一行字，再点击`复制链接地址`

**注意是点击 `复制链接地址`，不是 `复制`**，否则你复制到的链接地址是错误的

接下来按下按 <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>T</kbd> 打开 crosh，逐行输入以下命令并回车，将其作为一个命令脚本保存到文件中

```bash
shell
cd /tmp
# 这篇文章完成时，最新的版本是 1.11.7
echo 'curl "https://github.com/SagerNet/sing-box/releases/download/v1.11.7/sing-box-1.11.7-linux-amd64.tar.gz" > sing-box.tar.gz' > download_sing-box.sh
sh download_sing-box.sh && tar xzf sing-box.tar.gz &&
```
