import type { ThemeConfig, HeadConfig, HeaderConfig, FooterConfig, DateConfig, FeedConfig } from '$lib/types/general'

export const theme: ThemeConfig = [
  {
    name: 'light',
    text: '🌕 亮色模式'
  },
  {
    name: 'dark',
    text: '🌑 深色模式'
  },
  {
    name: 'cupcake',
    text: '🧁 纸杯蛋糕'
  },
  {
    name: 'bumblebee',
    text: '🐝 小 bee 蜂'
  },
  {
    name: 'emerald',
    text: '✳️ 绿色清新'
  },
  {
    name: 'corporate',
    text: '🏢 Corporate'
  },
  {
    name: 'valentine',
    text: '🌸 情人节'
  },
  {
    name: 'synthwave',
    text: '🌃 Synthwave'
  },
  {
    name: 'retro',
    text: '🌇 Retro'
  },
  {
    name: 'cyberpunk',
    text: '🌐 赛博朋克'
  },
  {
    name: 'halloween',
    text: '🎃 万圣节'
  },
  {
    name: 'garden',
    text: '🏡 Garden'
  },
  {
    name: 'forest',
    text: '🌲 森林'
  },
  {
    name: 'aqua',
    text: '💦 水'
  },
  {
    name: 'lofi',
    text: '🎶 乐符'
  },
  {
    name: 'pastel',
    text: '🌈 七色彩虹'
  },
  {
    name: 'fantasy',
    text: '🐣 新生幻想'
  },
  {
    name: 'wirefream',
    text: '📱 Wireframe'
  },
  {
    name: 'black',
    text: '🖤 Black'
  },
  {
    name: 'luxury',
    text: '💰 Luxury'
  },
  {
    name: 'dracula',
    text: '🧛 Dracula'
  },
  {
    name: 'cmyk',
    text: '🖨️ CMYK 配色'
  },
  {
    name: 'autumn',
    text: '🍂 秋天'
  },
  {
    name: 'business',
    text: '🗄️ Business'
  },
  {
    name: 'acid',
    text: '🌧️ Acid'
  },
  {
    name: 'lemonade',
    text: '🍋 Lemonade'
  },
  {
    name: 'night',
    text: '🌃 夜光蓝'
  },
  {
    name: 'coffee',
    text: '☕ 咖啡时间'
  },
  {
    name: 'winter',
    text: '❄️ 冬季'
  }
]

export const head: HeadConfig = {}

export const header: HeaderConfig = {
  nav: [
  ]
}

export const footer: FooterConfig = {
  nav: [
    {
      text: 'RSS 订阅',
      link: '/atom.xml'
    },
    {
      text: 'Sitemap',
      link: '/sitemap.xml'
    }
  ]
}

export const date: DateConfig = {
  locales: 'zh-CN',
  options: {
    year: '2-digit',
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }
}

export const feed: FeedConfig = {}
