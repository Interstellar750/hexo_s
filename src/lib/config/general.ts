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
    text: '🐝 Bumblebee'
  },
  {
    name: 'emerald',
    text: '✳️ Emerald'
  },
  {
    name: 'corporate',
    text: '🏢 Corporate'
  },
  {
    name: 'valentine',
    text: '🌸 Valentine'
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
    text: '🌲 Forest'
  },
  {
    name: 'aqua',
    text: '💦 Aqua'
  },
  {
    name: 'lofi',
    text: '🎶 Lo-Fi'
  },
  {
    name: 'pastel',
    text: '🌈 七色彩虹'
  },
  {
    name: 'fantasy',
    text: '🐣 Fantasy'
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
    text: '🍂 Autumn'
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
    text: '🌃 Night'
  },
  {
    name: 'coffee',
    text: '☕ 咖啡时间'
  },
  {
    name: 'winter',
    text: '❄️ Winter'
  }
]

export const head: HeadConfig = {}

export const header: HeaderConfig = {
  nav: [
    {
      text: '关于我',
      link: '/about'
    },
    // 这里不要给目录前加 . 号，不然多次点击目录会叠起来
    {
      text: '建站历程',
      link: '/about/history'
    }
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
