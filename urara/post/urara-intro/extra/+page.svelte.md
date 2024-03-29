---
title: 'Urara 拓展插件'
created: 2022-12-21
updated: 2023-02-08
tags: 
   - Urara
   - 拓展
summary: 'Urara 可用拓展插件使用教程'
---

<script>
  import Alert from '$lib/components/extra/alert.svelte'
</script>

近期加了 Giscus 后发现还有很多拓展可以加，下面也附上部分配置的教程

<Alert status="success" title="本文包含的大多数拓展已包含在官方文档内"/>

查看官方拓展文档：[**拓展 | Urara Docs**](https://urara-docs.netlify.app/zh-hans/advanced/extension.html)

## 文章组件

在文章里用的组件，可以像 HTML 代码一样直接插入到文章内

### YouTube 视频

此教程在官方文档里也有：[**YouTube | Urara Docs**](https://urara-docs.netlify.app/zh-hans/advanced/extension.html#youtube)

Urara 默认包含这个拓展，使用方法只需要在文档内导入一下就可以用了

```ts
<script>
  import YouTube from '$lib/components/extra/youtube.svelte'
  // 若有其他拓展组件就往这里加
</script>
```

使用的时候点进一个 YouTube 视频，看到地址栏有类似 `watch?v=WysuxO4yR04` 的部分时，复制其中的 `WysuxO4yR04` 视频 ID 既可

然后在文章内添加一行

```ts
<YouTube id="WysuxO4yR04" />
```

再把 `WysuxO4yR04` 替换成你想要展示的 YouTube 视频既可

### 资料卡片

此教程在官方文档里也有：[**资料卡片 | Urara Docs**](https://urara-docs.netlify.app/zh-hans/advanced/extension.html#资料卡片)

首先要去下载 [**profile.svelte**](https://github.com/importantimport/urara-docs/raw/master/public/extension/profile/profile.svelte)，下载完成之后放进 `src/lib/components/extra/` 目录里

像上面一样，使用前也得要在文档内导入

```ts
<script lang="ts">
  import Profile from '$lib/components/extra/profile.svelte'
  import YouTube from '$lib/components/extra/youtube.svelte'
  // 上面这行是模拟了你同时导入了两个组件的情况，实际使用时请删掉
</script>
```

使用方法也是同上

```ts
<Profile subname="这里是姓氏" bio={`这里是简介。<br>这是第二行简介。`}/>
// 更高级一点的？你也可以在里面手动指定全部信息：
<Profile name="姓名" avatar="/assets/maskable@512.png" subname="这里是姓氏" bio={`这里是简介。<br>这是第二行简介。`} />
```

还可以在里面放 HTML 代码，甚至也可以套组件本身：

```ts
<Profile name="姓名" avatar="/assets/maskable@512.png" subname="这里是姓氏" bio={`这里是简介。<br>这是第二行简介。`} >
  <YouTube id="WysuxO4yR04" />
  <iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/5THlVUJAn3kq087DxcWTTa?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
  <Profile name="姓名" avatar="/assets/maskable@512.png" subname="这里是姓氏" bio={`这里是简介。<br>这是第二行简介。`} />
</Profile>
```

### 状态提示

此教程在官方文档里也有：[**状态提示 | Urara Docs**](https://urara-docs.netlify.app/zh-hans/advanced/extension.html#状态提示)

就是本文章开头那个提示栏，它包含在 Urara 内可直接使用，导入：

```ts
<script>
  import Alert from '$lib/components/extra/alert.svelte'
</script>
```

使用方法：

```ts
<Alert status="warning" description="警告信息" title="警告标题"/>
```

**status** 有 `info`、`success`、`warning` 和 `error` 四个选项，可以根据需要自己选择，不填默认就是 `info` 图标，而且会没有强调色

至于为什么我的使用例不填 **description** 不会出现一行 **undefined**？因为我看好像有时候并不需要标题，就改掉了

方法是打开 `src/components/extra/alert.svelte` 文件，把第二行和第三行的 `undefined = 'undefined'` 改成 `undefined = ''`

### Spotify 音乐

此教程在官方文档里也有：[**Spotify | Urara Docs**](https://urara-docs.netlify.app/zh-hans/advanced/extension.html#spotify)

昨天自己照着 [**YouTube 视频**](#youtube-视频) 改出来的，应该没什么 Bug 了，~~后面会考虑要不要加到官方文档里去~~ 已添加

已经包含在 Urara 里了||还混了个贡献者||，要使用直接导入既可

导入：

```ts
<script lang="ts">
  import Spotify from '$lib/components/extra/spotify.svelte'
</script>
```

使用方法：

```ts
<Spotify type="album" id="0vXB2JFdOphGK7ybYLXSRI" compact={true} theme={true} width="100%" />
```

- **id** 为播放清单的 ID，在 Spotify 分享链接时可以看到

- **type** 是 ID 的类型，有 `artist` `album` `track` 三个选项，默认定义为 `"track"`

- **compact** 是卡片布局，默认定义为 `{false}` 常规布局，改为 `{true}` 为紧凑布局

- **theme** 为组件背景，默认为 `{true}`，若改为 `{false}` 就会让背景变为默认的灰色

- **width** 为卡片宽度，默认定义为 `100%`，不加 `%` 时就是像素宽度

~~嗯，从这混乱的组件就可以看出，质量不咋样，我的想法是 `compact` 和 `theme` 能通过 `true` 和 `false` 来控制，但搞了好久不知道怎么声明布尔变量，后面再修吧...~~

又麻烦大佬帮我修了，这下应该不会出现问题了

### SoundCloud 音乐

此教程在官方文档里也有：[**SoundCloud | Urara Docs**](https://urara-docs.netlify.app/zh-hans/advanced/extension.html#soundcloud)

Urara 最近新加的拓展，测试的时候去 SoundCloud 复制了一下原本的嵌入码，那是真的长，格式化代码后都要看一阵子

导入拓展：

```ts
<script lang="ts">
  import SoundCloud from '$lib/components/extra/soundcloud.svelte'
</script>
```

使用方法：

```ts
<SoundCloud type="playlist" id="1259265289" />
```

上面这个样子也是最简单的样式，下面是一些自定义项

- **type** ID 类型，默认是 `track`，若分享的是播放列表则需要修改为 `playlist`
- **visual** 默认为 `{true}`，禁用后若是单曲那么组件宽度会变矮，播放列表的话封面就会变小
- **color** 颜色，默认是 `#ff5500` (16进制值)，其实改的是播放按钮的颜色，使用时忽略 # 号
- **autoplay** 自动播放，加载组件后会自动开始播放音乐，默认为 `{false}`
- **width** 宽度，同样支持百分比和像素宽度

这个最难的在于抓取歌曲 ID，它不显示在地址栏，需要手动点击分享，再选择嵌入，复制代码后，里面会有一串数字，那就是需要的 ID 了：

```html title="SoundCloud 嵌入代码长得很，这里只截取了 iframe 的部分" {9}
<iframe 
  width="100%" 
  height="450" 
  scrolling="no" 
  frameborder="no" 
  allow="autoplay" 
  src="
    https://w.soundcloud.com/player/?url=
    https%3A//api.soundcloud.com/playlists/
    1259265289
    &color=%2322ecf1&auto_play=false&hide_related=false
    &show_comments=true&show_user=true&show_reposts=false&show_teaser=true">
</iframe>
```

获取到 ID 后替换掉上方示例里的 ID 既可，同时需要注意分享的类型，不然会指向错误的页面

### GitHub 仓库

此教程在官方文档里也有：[**GitHub 仓库 | Urara Docs**](https://urara-docs.netlify.app/zh-hans/advanced/extension.html#github-仓库)

一个用来展示 GitHub 仓库的组件，组织和个人的仓库都可以，只能展示公开仓库，没授权访问私有仓库的功能

还未包含在 Urara 里，就要麻烦手动下载组件了：[**github.svelte**](https://github.com/importantimport/urara-docs/raw/master/public/extension/github/github.svelte)，再放到 `src/lib/components/extra/` 目录里。

在使用前导入：

```ts
<script>
  import GitHub from '$lib/components/extra/github.svelte'
</script>
```

这个组件使用起来很简单，填入用户或组织名，再填写名下的仓库名就可以了：

```ts
<GitHub user="importantimport" repo="urara"/>
```

## 网页拓展

此分类可以拓充博客页面

### Friends 页面

此教程在官方文档里也有：[**友链 | Urara Docs**](https://urara-docs.netlify.app/zh-hans/advanced/extension.html#友链)

这个来说相对简单，复制几个文件再照着改就行

首先下载 [**friend.svelte**](https://github.com/importantimport/urara-docs/raw/master/public/extension/friend/friend.svelte) 文件，放进 `src/lib/components/extra/` 文件夹内

再下载 [**+page.svelte**](https://github.com/importantimport/urara-docs/raw/master/public/extension/friend/%2Bpage.svelte) 文件，放进 `src/routes/friends/` 文件夹内，`src/routes/` 里默认是没有 `friends` 文件夹的，请手动创建并将文件放入其中

对了，还需要安装 `svelte-bricks` 依赖

```bash
pnpm add -D svelte-bricks
```

添加后记得运行一下 `pnpm i` 再进行开发服务器测试

接下来是最重要的一步，在 `src/lib/config/` 文件夹中，创建一个名为 `friends.ts` 的文件，再复制以下内容粘贴保存，样式来自 [**./kwaa.dev**](https://kwaa.dev/about) 博客的 [**GitHub 仓库**](https://github.com/kwaa/blog/blob/main/src/lib/config/friends.ts) (太长了，删掉了一些)

```ts title="src/lib/config/friends.ts"
export interface FriendOld {
  // hCard+XFN
  id: string // HTML id
  rel?: string // XFN, contact / acquaintance / friend
  link?: string // URL
  html?: string // HTML
  title?: string // 标题
  descr?: string // 描述
  avatar?: string // 头像
  name?: string // backwards compatibility
}

export type Friend = {
  id: string // HTML id
  rel?: string // XHTML Friends Network
  link?: string // URL
  html?: string // Custom HTML

  title?: string // 标题
  name?: string // 人名
  avatar?: string // 头像
  descr?: string // 描述
  class?: {
    avatar?: string // 头像类名
    img?: string // 图片类名
  }
}

export const friends: Friend[] = [
  {
  id: 'kwaa',
  rel: 'friend',
  link: 'https://kwaa.dev',
  html: `<div class="card w-screen max-w-[24rem] bg-base-100 bg-gradient-to-tr from-primary to-accent text-primary-content shadow-lg transition-shadow duration-500 hover:shadow-2xl">
    <div class="absolute top-4 rotate-6 text-4xl font-bold leading-tight opacity-10">藍+85CD<br />./kwaa.dev</div>
    <div class="card-body p-4">
      <div class="flex items-center gap-4">
        <div class="avatar mb-auto w-20 shrink-0">
          <img class="rounded-xl" style="image-rendering:pixelated" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAVFBMVEUAAADW29T///+5wcc4ODjz8OZVVVX/7MkVFRXtrpqTJiVHKxPZOjr/+/QICz3/07d1TCNErbkaSXtgERn59vb//OPSzMzuuwKZne20srL0mIyWGwWygNgKAAAAAXRSTlMAQObYZgAAAOtJREFUKM9djwuSwyAMQ2vsBDBJyK/tfu5/z5W6aYZUMB7QQwZuhwIkwnq7KIgqTFQJV3/USQX+OoE0fqfLIh0kCtKC31VGEEGqBezdydixfAARnNeRKZDmClE4mFE/gAKpTjFOcgEde01fa4wrDjRAlGNf7vdF5QKEzSJUCRpftmFwrbW6vEGYXwEzHzi2BvCF1ve9/7hvDSgqBJYQeHxrA4oqAskA9ocpwUkIkrvbnppvlNnMUkn+9B4r+CdAAACVM5yJnBnA9U+8wCzncPgRynP6V+WGIQZyzMWspwzrTEASSi4F/kHCy/4DaDYJuEU/v5oAAAAASUVORK5CYII=" alt="藍#+85CD" />
        </div>
        <div class="card-title flex-1 flex-col items-end gap-0">
          <span class="p-name text-right">藍+85CD</span>
          <span class="text-right opacity-50">./kwaa.dev</span>
        </div>
      </div>
      <div class="p-note prose opacity-70">ゴミ溜めで埋もれたまま、星空を眺めてるよ</div>
    </div>
  </div>`
  },
  {
    id: 'test4',
    name: ':hatsunemiku: 藍 :hatsunemiku:',
    title: '~/kwaa.moe',
    link: 'https://kwaa.moe/@kwa',
    descr: 'ゴミ溜めで埋もれたまま、星空を眺めてるよ',
    avatar: 'https://kwaa.moe/media/975fc04911e242147be77b60b93839b6dd1a317112717562944e3c7aef1f0203.png'
 },
 {
   id: 'test5',
   name: '藍',
   title: '藍藍藍藍藍',
   link: 'https://kwaa.dev',
   descr: 'without avatar'
  }
]
```

演示图

![三个朋友卡片样式，其中有一个的背景使用了 Daisy UI 主题的第一和第三色做了一个左下角到右上角的渐变](/post/urara-intro/extra/urara-friends.webp)

可以看到，这个好友卡片有两种样式（页脚不算），看源文件也能看出来，有渐变底的那个卡片里有 HTML 格式的代码，我不会改，如果你有能力可以试着自己改， [kwaa](https://kwaa.dev/) 大佬提供了一个 [Tailwind Play](https://play.tailwindcss.com/0AHHfFWTgL) 用于参考与修改

**这里我们主要讲默认样式如何修改**

依然是放一个卡片样式模板用于修改，这里是我的个人卡片 😝

```ts {4}
export const friends: Friend[] = [
  {
    id: 'trle5', // HTML ID，不会显示在卡片上
    rel: 'friend', // 联系人类型，可选 contact / acquaintance / friend，目前不太清楚有什么用
    title: 'Hubert\u0027s Blog', // 标题，显示在昵称下方
    name: 'Hubert Chen', // 昵称
    link: 'https://trle5.xyz/', // 点击卡片后访问的页面
    descr: '你好呀 👋', // 头像下方的网站描述
    avatar: 'https://trle5.xyz/assets/avatar/70455873_p3.webp' // 头像，也可调用其他网页的图片
  }
]
```

高亮行使用了 Unicode 码，请将 `Hubert's Blog` 中的 `'`手动替换为 `\u0027` 

效果图

![我自己的朋友卡片，描述是 你好呀👋](/post/urara-intro/extra/urara-friends-me.webp)

也可以随时找我申请友链，在 [**关于我**](/about) 页面使用任意方式联系我即可

<big><b>朋友卡片的社交平台图标</b></big>

应该有些人发现在我的 [**朋友页面**](/friends)，点进卡片时，有些并不是博客链接，而是社交平台的链接，于是我就在朋友卡片右下角加了个社交软件的图标

嗯，这个功能是我魔改出来的，其实本来还[**打算再加个社交平台的名称**](https://t.me/Riocoolapk/946539)，最后只做成这个样子，没有前端知识，只会照着模板改

如果你有加这个小图标的想法，可以看看我博客仓库的 [**BE5D947**](https://github.com/Interstellar750/hexo_s/commit/be5d9479583c7a2bb5fd8f42a731de6078ae9805) 这个提交中对 `friend.svelte` 和 `friends.ts` 的修改，至于图标我是从 [**ICONS8**](https://icons8.com/) 上下载的

上面这个图标在近期可能会改一下，看看能不能换个其他方便一点的办法

这个图标与朋友描述占同一行，它们可以同时存在，也可以单独出现一个，社交平台图标路径的使用方法类似头像，贴上图标路径加上就行

```ts title="src/lib/config/friends.ts" {8}
export const friends: Friend[] = [
  {
    id: 'HTML ID',
    rel: 'firend',
    title: '标题',
    name: '昵称',
    link: '链接',
    descr: '描述',
    social: '<社交平台图标路径>',
    avatar: '<头像路径>'
  }
]
```

### 项目展示

此教程在官方文档里也有：[**项目展示 | Urara Docs**](https://urara-docs.netlify.app/zh-hans/advanced/extension.html#项目展示)

由 [**SevcheCC**](https://github.com/Sevichecc) 制作，可以去看看 [**为博客写一个Project showcase 页面**](https://seviche.cc/2022-05-26-write-a-page-template/) 和 [**Projects | Seviche.cc**](https://seviche.cc/projects/)

配置过程与友链页面差不多，也是要下两个文件和自己配置一个

首先下载 [**projects.svelte**](https://github.com/importantimport/urara-docs/raw/master/public/extension/project/projects.svelte) 文件，放进 `src/lib/components/extra/` 文件夹内

再下载 [**+page.svelte**](https://github.com/importantimport/urara-docs/raw/master/public/extension/project/%2Bpage.svelte) 文件，放进 `src/routes/friends/` 文件夹内，`src/routes/` 里默认是没有 `projects` 文件夹的，请手动创建并将文件放入其中

再到 `src/lib/config/` 目录新建一个 `projects.ts` 文件，复制以下内容粘贴到文件内：

```ts
export type Project = {
  id: string
  name: string
  tags?: string[]
  feature?: string
  description?: string
  img: string
  link?: string
}

export const projects: Project[] = [
  {
    id: 'urara', // HTML ID
    name: 'Urara', // 项目名
    tags: ['Svelte', 'TypeScript'], // 标签
    description: // 描述
      "🌸 Sweet, Powerful, IndieWeb-Compatible SvelteKit Blog Starter. [δ](Delta)",
    feature: 'Svelte', // 特点
    img: 'https://github.com/importantimport/urara/raw/main/urara/hello-world/urara.webp', // 项目图片
    link: 'https://github.com/importantimport/urara' // 链接
  }
]
```

![一个与页脚等宽的项目卡片，左侧是展示图片，右侧是介绍信息](/post/urara-intro/extra/urara-projects.webp)

目前这个拓展不能不放图片，图片框架有最小限制，图片尺寸不够的话会顶部居中对齐，图片过高则会往下纵向拓展，宽度固定

## 评论功能

### Webmention

此教程在官方文档里也有：[**Webmention | Urara Docs**](https://urara-docs.netlify.app/zh-hans/advanced/extension.html#webmention)

一种让一个网页可以与另一个网页进行交互的协议？其实原理我也不太懂，也可以跟 Mastodon 这种 Fediverse(联邦宇宙) 平台进行互动，但本站目前并没有这个功能...

还有一个发送 Webmention 链接的功能，我不太会用，就没什么说明。同时还支持基于 [**commentpara.de**](https://commentpara.de/) 的匿名评论功能，但似乎与目前的 Urara 依赖有兼容性问题，我降了 sveltekit 与 vite 版本后才能正常工作

这个组件默认包含在 Urara 里，所以就只用改配置，首先看 `src/lib/config/general.ts` 文件，大概在百来行的位置：

```ts title="src/lib/config/general.ts" {9}
export const head: HeadConfig = {
  custom: ({ dev, post, page }) =>
    dev
      ? []
      : [
          // IndieAuth
          '<link rel="authorization_endpoint" href="https://indieauth.com/auth">',
          '<link rel="token_endpoint" href="https://tokens.indieauth.com/token">',
        ],
  me: ['https://github.com/<用户名>']
}
```

要改的也就是高亮行，把 `<用户名>` 改成你的 GitHub 用户名，再到 GitHub 的个人页面里修改个人信息，在 **Website** 框内填入你的网站域名，后面就可以使用 [**IndieAuth**](https://indieauth.com/) 登录了

接下来是添加 Webmention 评论组件，编辑 `src/lib/config/post.ts` 文件：

```ts title="src/lib/config/post.ts"
import type { PostConfig } from '$lib/types/post'

export const post: PostConfig = {
  comment: {
    use: ['Webmention', '其他评论系统'],
    style: 'boxed', // 评论系统栏样式: none / bordered / lifted / boxed
    webmention: {
      username: '[在此输入域名]',
      sortBy: 'created', // 排序方式: created / updated
      sortDir: 'down', // 排序顺序: up / down
      form: true, // 启用评论: true / false
      commentParade: true // 启用匿名评论: true / false
    }
  }
}
```

填写域名和调整设置后对博客进行部署就可以去测试了，匿名评论不可用那就用 [**Webmention Rocks!**](https://webmention.rocks/) 来进行测试吧，要看评论的话要登录 [**Webmention.io**](https://webmention.io/)，这就是为什么前面要设置 **IndieAuth** 的原因

**Webmention.io** 的 **Settings** 页面提供了评论订阅链接，它类似下面这样：

```text
https://webmention.io/api/mentions.atom?token=0123456789ABCDEF_ghIJK
```

其中的 `0123456789ABCDEF_ghIJK` 是 API Key，用处就是查看所有 Webmention，保密与否看你自己，上面的链接可以使用 RSS 阅读器来订阅

还可以设定屏蔽来自某个域名的 Webmention 或删除评论

### Giscus

此教程在官方文档里也有：[**Giscus | Urara Docs**](https://urara-docs.netlify.app/zh-hans/advanced/extension.html#giscus)

本站就在用，依赖于 GitHub 项目仓库的 Discussions 功能，注定了对于国内的网络有点难访问，有时候可能会串评论，需要手动刷新

好消息是，Urara 自带 Giscus 拓展，这里我们就不需要像其他拓展一样手动去找文件了，只需要修改已有的文件既可

首先需要去 [**Giscus.app**](https://giscus.app/) 配置一下，跟着提示的步骤走就行

至于 **页面 ↔️ discussion 映射关系** 这个怎么选都行，它目前并没有被分离出来，需要修改的话我后面会说

配置完成后，大概会给你一个类似下面的代码块，我们只需要其中的一些数据

```html {1,2,3,4,7,9,10,11,12}
<script src="https://giscus.app/client.js"
        data-repo="interstellar750/hexo_s"
        data-repo-id="R_kgDOHTJG_w"
        data-category="General"
        data-category-id="DIC_kwDOHTJG_84CS2Mz"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="preferred_color_scheme"
        data-lang="zh-CN"
        data-loading="lazy"
        crossorigin="anonymous"
        async>
</script>
```

接下来的就是对应的上面选项的样式，根据是否相同，填入 `src/lib/config/post.ts` 文件既可

测试前请注意把仓库和分类的 ID 改掉，不然你的评论会发到我这里来 😱

```ts title="src/lib/config/post.ts"
import type { PostConfig } from '$lib/types/post'

export const post: PostConfig = {
	comment: {
    	use: ['Giscus'],
    	giscus: {
      		repo: 'interstellar750/hexo_s',
      		repoID: 'R_kgDOHTJG_w',
      		category: 'General',
      		categoryID: 'DIC_kwDOHTJG_84CS2Mz',
      		reactionsEnabled: true,
      		lang: 'zh-CN',
      		inputPosition: 'top',
      		theme: 'preferred_color_scheme'
    	}
	}
}
```

关于 `data-loading="lazy"` 这个选项嘛，它其实已经默认启用了，如果您想要修改的话，可以查看 `src/lib/types/post.ts` 文件，将其的值修改为 `eager` 或直接删除它来禁用懒加载（不过我没试过有没有效果 😝）

```ts title="src/lib/types/post.ts" {4}
⬆57
  /** choose the language giscus will be displayed in. */
  lang?: string
  /** loading of the comments will be deferred until the user scrolls near the comments container. */
  loading?: 'lazy'
}

export type UtterancesConfig = {
⬇65
```

如果您需要修改 **页面 ↔️ discussion 映射关系** 的话，您需要修改 `src/lib/components/comments/giscus.svelte` ~~文件里的内容，可能以后也会移至 `post.ts` 里吧~~ 大概不会了

```ts title="src/lib/components/comments/giscus.svelte" {9}
⬆6
  onMount(() => {
    const giscus = document.createElement('script')
    Object.entries({
      src: config.src ?? 'https://giscus.app/client.js',
      'data-repo': config.repo,
      'data-repo-id': config.repoID,
      'data-category': config.category ?? '',
      'data-category-id': config.categoryID,
      'data-mapping': 'pathname',
      'data-reactions-enabled': config.reactionsEnabled === false ? '0' : '1',
      'data-input-position': config.inputPosition ?? 'bottom',
⬇18
```

根据前面说到的有时候会串评论的问题，~~我这里就把 `data-mapping` 改成了 `og:title`，其实有没有效果我自己都有点不清楚~~

现在还有串评论的问题就改回来了，留着 pathname 似乎是比较好的选项，不过依然有个小问题，例如我的 [**关于我**](/about) 目录下还有三个文章，当 about/ 这个页面没有单独开一个讨论时，子目录里有其他页面已经开了讨论页面，那么里面的评论就会串到父文章来，不过也有解决方法，进入对应仓库的 Discussions 按照 giscus app 的格式开一个新讨论就行

### Utterances

此教程在官方文档里也有：[**Utterances | Urara Docs**](https://urara-docs.netlify.app/zh-hans/advanced/extension.html#utterances)

同样是基于 GitHub 服务的评论系统，但 Utterances 用的是 Issues 功能，如果有 Issues 功能需求的就不要用了，也可以把评论仓库换到其他仓库，本质上更推荐用 Giscus

首先是访问 [**utteranc.es**](https://utteranc.es/) 进行配置，跟着说明走就行，只是没有多语言，后面就会得到一个 HTML 格式的代码：

```html
<script src="https://utteranc.es/client.js"
      repo="[在此输入仓库]"
      issue-term="pathname"
      theme="preferred-color-scheme"
      crossorigin="anonymous"
      async>
</script>
```

再接着编辑 `src/lib/config/post.ts` 文件，加入 Utterances 评论系统：

```ts title="src/lib/config/post.ts"
import type { PostConfig } from '$lib/types/post'

export const post: PostConfig = {
  comment: {
    use: ['Utterances', '其他评论系统'],
    style: 'boxed', // 评论系统栏样式: none / bordered / lifted / boxed
    utterances: {
      repo: '[在此输入仓库]',
      lable: '', // 标签
      theme: 'preferred-color-scheme', // 主题
    }
  }
}
```

之后部署博客，在网页上登录 GitHub 并授权，试一下能否正常工作，不要忘记在设定的评论仓库安装 [**utterances app**](https://github.com/apps/utterances)

## 界面组件

目前就功能按钮这一类

### 功能按钮

此教程在官方文档里也有：[**功能按钮 | Urara Docs**](https://urara-docs.netlify.app/zh-hans/advanced/extension.html#功能按钮)

配置起来很简单，只需要放文件就行，组件放在 [**importantimport/urara-docs**](https://github.com/importantimport/urara-docs/tree/master/public/extension/actions)，下载想要添加的组件

然后到 `src/lib/components/` 目录里新建一个名为 `actions` 的文件夹，再把下载好的按钮组件丢进去就行

重启开发服务器或构建后，点进一篇文章就可以看到左侧的按钮了。使用手机或窗口宽度不足的话，按钮就会隐藏起来
