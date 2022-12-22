---
title: 'Urara 拓展插件'
created: 2022-12-21
updated: 2022-12-21
tags: 
   - Urara
   - 拓展
summary: 'Urara 可用拓展插件使用教程'
---

## 网页拓展

近期加了 Giscus 后发现还有很多拓展可以加，下面也附上部分配置的教程

### Friends 页面

这个来说相对简单，复制几个文件再照着改就行

首先下载 [friend.svelte](https://raw.githubusercontent.com/kwaa/blog/main/src/lib/components/extra/friend.svelte) 文件，放进 `src/lib/components/extra/` 文件夹内

再下载 [+page.svelte](https://raw.githubusercontent.com/kwaa/blog/main/src/routes/friends/%2Bpage.svelte) 文件，放进 `src/routes/friends/` 文件夹内，`src/routes/` 里默认是没有 `friends` 文件夹的，请手动创建并将文件放入其中

对了，还需要在 `pnpm-lock.yaml` 与 `package.json` 文件里添加 `svelte-bricks` 依赖

```yaml title="pnpm-lock.yaml" {2}
specifiers:
  svelte: 3.51.0
  svelte-bricks: ^0.1.7
  svelte-check: ^2.9.2
```

```json title="package.json" {3}
{
  "devDependencies": {
    "svelte": "3.51.0",
    "svelte-bricks": "^0.1.7",
    "svelte-check": "^2.9.2",
  }
}
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

## 评论功能

### Giscus 评论系统

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
        data-mapping="og:title"
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

如果您需要修改 **页面 ↔️ discussion 映射关系** 的话，您需要修改 `src/lib/components/comments/giscus.svelte` 文件里的内容，可能以后也会移至 `post.ts` 里吧

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
      'data-mapping': 'og:title',
      'data-reactions-enabled': config.reactionsEnabled === false ? '0' : '1',
      'data-input-position': config.inputPosition ?? 'bottom',
⬇18
```

根据前面说到的有时候会串评论的问题，我这里就把 `data-mapping` 改成了 `og:title`，其实有没有效果我自己都有点不清楚

