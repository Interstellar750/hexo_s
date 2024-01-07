# Hubert's Blog

本博客由 [**Urara**](https://github.com/importantimport/urara/) 驱动

评论功能由 [**Giscus**](https://github.com/giscus/giscus) 与 [**Webmentions**](https://indieweb.org/Webmention) 驱动

在此感谢 [**Urara 的贡献者们**](https://github.com/importantimport/urara/graphs/contributors)，以及 [**Giscus 的贡献者们**](https://github.com/giscus/giscus/graphs/contributors)，还有本项目 [**众多依赖项**](https://github.com/Interstellar750/hexo_s/network/dependencies) 的贡献者们

### 为什么项目名是 `hexo_s`？

1. 因为博客最早是使用 [**Hexo**](https://github.com/hexojs) 搭建的

2. 中途手机炸了一次，补救后备份到 GitHub 上，不假思索的取的项目名

### 在本地查看网页

切换到工作目录并运行 `pnpm i && pnpm dev` 或 `pnpm i && pnpm build && pnpm preview`

### 有什么不一样？

这个博客基于 [**Urara**](https://github.com/importantimport/urara/)，但包含了很多自定义的部分，它们有些来自 [**官方插件库**](https://urara-docs.netlify.app/advanced/extension.html)，有些则来自社区成员们

若您觉得本博客使用到了您自制的插件有不妥之处，请联系我来移除它，请原谅我使用时没有经过您的允许

#### 以下是经过修改的官方插件

来自 [**importantimport/urara**](https://github.com/importantimport/urara/):

- [**Alert**](https://urara-docs.netlify.app/advanced/extension.html#alert) | 可不填写部分内容
- [**Webmention**](https://urara-docs.netlify.app/advanced/extension.html#webmention) | 自定义界面风格

#### 以下是来自社区成员们的插件

来自 [**kwaa/blog**](https://github.com/kwaa/blog):

- [**Actions**](https://urara-docs.netlify.app/advanced/extension.html#action-buttons) | 未修改
- [**Profile Card**](https://urara-docs.netlify.app/advanced/extension.html#profile-card) | 未修改
- [**GitHub Card**](https://github.com/kwaa/blog/blob/main/src/lib/components/extra/github.svelte) | 未修改
- [**Friends**](https://urara-docs.netlify.app/advanced/extension.html#friends) | 添加了社交平台或自定义图标

来自 [**jiwaszki/jiwaszki.github.io**](https://github.com/jiwaszki/jiwaszki.github.io)

- [**Sections**](https://github.com/jiwaszki/jiwaszki.github.io/blob/main/src/lib/components/extra/sections.svelte) | 修改了交互文本并启用了个人卡片

来自 [**Sevichecc/Urara-Blog**](https://github.com/Sevichecc/Urara-Blog)

- [**copyCode**](https://github.com/Sevichecc/Urara-Blog/blob/main/src/lib/utils/copyCode.ts) | 修改了交互文本和按钮样式

此页面可能会有遗漏，若上方没有包含您的插件，我表示非常抱歉
