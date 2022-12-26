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
    text: '🏢 公司'
  },
  {
    name: 'valentine',
    text: '🌸 情人节'
  },
  {
    name: 'synthwave',
    text: '🌃 合成器'
  },
  {
    name: 'retro',
    text: '🌇 复古情怀'
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
    text: '🏡 花园'
  },
  {
    name: 'forest',
    text: '🌲 夜色森林'
  },
  {
    name: 'aqua',
    text: '💦 水'
  },
  {
    name: 'lofi',
    text: '🎶 钢琴乐符'
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
    name: 'wireframe',
    text: '📱 线框'
  },
  {
    name: 'black',
    text: '🖤 纯黑'
  },
  {
    name: 'luxury',
    text: '💰 金色奢华'
  },
  {
    name: 'dracula',
    text: '🧛 德古拉'
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
    text: '🗄️ 商务'
  },
  {
    name: 'acid',
    text: '🌧️ 酸雨'
  },
  {
    name: 'lemonade',
    text: '🍋 酸涩柠檬'
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
    text: '❄️ 冬季白'
  }
]

export const head: HeadConfig = {
  custom: ({ dev, post, page }) =>
    dev
      ? []
      : [
          // IndieAuth
          '<link rel="authorization_endpoint" href="https://indieauth.com/auth">',
          '<link rel="token_endpoint" href="https://tokens.indieauth.com/token">',
        ],
  me: ['https://github.com/Interstellar750']
}

export const header: HeaderConfig = {
  nav: [
    {
      text: '关于我',
      link: '/about'
    },
    // 注意这里不要给目录前加 . 号，不然多次点击目录会叠起来
    {
      text: '站点相关',
      children: [
        {
          text: '建站历程',
		  link: '/about/history'
        },
        {
          text: '待办事项',
          link: '/about/todolist'
        }
      ]
    },
    {
      text: '闲聊',
      children: [
        {
          text: '2022 下半年的总结',
          link: '/talk/page111'
        },
        {
          text: '闲谈杂聊',
          link: '/talk/page104'
        }
      ]
    },
    {
      text: '朋友们',
      link: '/friends'
    },
	{
	  text: '📁',
	  link: 'https://t5d.trle5.xyz'
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
      text: 'Privacy',
      link: '/about/privacy'
    },
    {
      text: 'Source',
      link: 'https://github.com/interstellar750/hexo_s'
    }
  ]
}

export const date: DateConfig = {
  locales: 'zh-CN',
  options: {
    year: '2-digit',
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }
}

export const feed: FeedConfig = {}
