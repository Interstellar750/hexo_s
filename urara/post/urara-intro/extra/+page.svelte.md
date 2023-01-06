---
title: 'Urara 拓展插件'
created: 2022-12-21
updated: 2023-01-06
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

查看官方拓展文档：[**拓展 | Urara**](https://urara-docs.netlify.app/zh-hans/advanced/extension.html)

## 文章组件

在文章里用的组件，可以像 HTML 代码一样直接插入到文章内

### YouTube 视频

此教程在官方文档里也有：[**YouTube | Urara**](https://urara-docs.netlify.app/zh-hans/advanced/extension.html#youtube)

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

此教程在官方文档里也有：[**资料卡片 | Urara**](https://urara-docs.netlify.app/zh-hans/advanced/extension.html#资料卡片)

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

此教程在官方文档里也有：[**状态提示 | Urara**](https://urara-docs.netlify.app/zh-hans/advanced/extension.html#状态提示)

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

昨天自己照着 [**YouTube 视频**](#youtube-视频) 改出来的，应该没什么 Bug 了，后面会考虑要不要加到官方文档里去

没包含在 Urara 里，要手动下载 [**spotify.svelte**](https://github.com/Interstellar750/hexo_s/raw/urara/src/lib/components/extra/spotify.svelte)，同样放到 `src/lib/components/extra/` 目录里

导入：

```ts
<script lang="ts">
  import Spotify from '$lib/components/extra/spotify.svelte'
</script>
```

使用方法：

```ts
<Spotify type="album" id="0vXB2JFdOphGK7ybYLXSRI" compact="true" />
```

**type** 是 ID 的类型，有 `artist` `album` `track` 三个选项，从 Spotify 分享链接可以看到

**compact** 是卡片布局，默认为 `false` 紧凑布局，改为 `compact"true"`

**theme** 为组件背景，默认为 `true`，若改为 `theme=""` 就会让背景变为默认的灰色

**width** 为卡片宽度，默认定义为 `100%`，不加 `%` 时就是像素宽度

**嗯，从这混乱的组件就可以看出，质量不咋样，我的想法是 `compact` 和 `theme` 能通过 `true` 和 `false` 来控制，但搞了好久不知道怎么声明布尔变量，后面再修吧...** 

## 网页拓展

此分类可以拓充博客页面

### Friends 页面

此教程在官方文档里也有：[**友链 | Urara**](https://urara-docs.netlify.app/zh-hans/advanced/extension.html#友链)

这个来说相对简单，复制几个文件再照着改就行

首先下载 [friend.svelte](https://github.com/importantimport/urara-docs/raw/master/public/extension/friend/friend.svelte) 文件，放进 `src/lib/components/extra/` 文件夹内

再下载 [+page.svelte](https://github.com/importantimport/urara-docs/raw/master/public/extension/friend/%2Bpage.svelte) 文件，放进 `src/routes/friends/` 文件夹内，`src/routes/` 里默认是没有 `friends` 文件夹的，请手动创建并将文件放入其中

对了，还需要安装 `svelte-bricks` 依赖

```bash
pnpm add -D svelte-bricks
```

添加方法就是把上面两个代码块的高亮行加进对应的位置就行，大致没有排序限制吧，添加后记得运行一下 `pnpm i` 再进行开发服务器测试

接下来是最重要的一步，在 `src/lib/config/` 文件夹中，创建一个名为 `friends.ts` 的文件，再复制以下内容粘贴保存，样式来自 [./kwaa.dev](https://kwaa.dev/about) 博客的 [GitHub 仓库](https://github.com/kwaa/blog/blob/main/src/lib/config/friends.ts) (太长了，删掉了一些)

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

也可以随时找我申请友链，在 [关于我](/about) 页面使用任意方式联系我即可

<big><b>朋友卡片的社交平台图标</b></big>

应该有些人发现在我的 [朋友页面](/friends)，点进卡片时，有些并不是博客链接，而是社交平台的链接，于是我就在朋友卡片右下角加了个社交软件的图标

嗯，这个功能是我魔改出来的，其实本来还[打算再加个社交平台的名称](https://t.me/Riocoolapk/946539)，最后只做成这个样子，没有前端知识，只会照着模板改

如果你有加这个小图标的想法，可以看看我博客仓库的 [BE5D947](https://github.com/Interstellar750/hexo_s/commit/be5d9479583c7a2bb5fd8f42a731de6078ae9805) 这个提交中对 `friend.svelte` 和 `friends.ts` 的修改，至于图标我是从 [ICONS8](https://icons8.com/) 上下载的

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

## 评论功能

### Giscus 评论系统

此教程在官方文档里也有：[**Giscus | Urara**](https://urara-docs.netlify.app/zh-hans/advanced/extension.html#giscus)

本站就在用，依赖于 GitHub 项目仓库的 Discussions 功能，注定了对于国内的网络有点难访问，有时候可能会串评论，需要手动刷新

好消息是，Urara 自带 giscus 拓展，这里我们就不需要像其他拓展一样手动去找文件了，只需要修改已有的文件既可

首先需要去 [Giscus.app](https://giscus.app/) 配置一下，跟着提示的步骤走就行

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

现在还有串评论的问题就改回来了，留着 pathname 似乎是比较好的选项，不过依然有个小问题，例如我的 [关于我](/about) 目录下还有三个文章，当 about/ 这个页面没有单独开一个讨论时，子目录里有其他页面已经开了讨论页面，那么里面的评论就会串到父文章来，不过也有解决方法，进入对应仓库的 Discussions 按照 giscus app 的格式开一个新讨论就行
