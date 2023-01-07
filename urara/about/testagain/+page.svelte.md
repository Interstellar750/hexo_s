---
title: '这是一个测试页面'
created: 2022-01-26
updated: 2023-01-07
image: /about/testagain/test.webp
tags:
  - 测试
summary: '有点纪念意义就一直放在这里好了'
---

<script lang="ts">
import Profile from '$lib/components/extra/profile.svelte'
import GitHub from '$lib/components/extra/github.svelte'
import YouTube from '$lib/components/extra/youtube.svelte'
import Spotify from '$lib/components/extra/spotify.svelte'
</script>

test

<u>测试下划线</u>

## 测试大纲

`测试等宽 abc`

[测试链接](https://github.com/)

**网易云音乐**

<iframe title="Netease Music" border="0" marginwidth="0" marginheight="0" src="//music.163.com/outchain/player?type=2&amp;id=1300697588&amp;auto=0&amp;height=66" width="330" height="86" frameborder="no"></iframe>

**个人资料**

<Profile subname="zh-Hans / en-US" bio={`你好呀 👋<br>是个普通网友<br>目前只会一点 C 语言`} >
  <div class="flex flex-col md:flex-row gap-4 mt-4"></div>
</Profile>

**GitHub 仓库**

<GitHub user="interstellar750" repo="hexo_s" />

**YouTube 视频**

<YouTube id="WysuxO4yR04" />

**Spotify 音乐**

<Spotify type="album" id="0vXB2JFdOphGK7ybYLXSRI" compact={false} theme={true} width="100%" />
