import type { SiteConfig } from '$lib/types/site'

export const site: SiteConfig = {
  protocol: 'https://',
  domain: import.meta.env.URARA_SITE_DOMAIN ?? 'trle5.xyz',
  title: 'Hubert\u0027s\u0020Blog',
  subtitle: '',
  lang: 'zh-CN',
  description: '你好呀👋',
  author: {
    name: 'Hubert\u0020Chen',
    avatar: '/assets/avatar/70455873_p3.webp',
    status: '😉',
    bio: '你好呀 👋<br \>今天过还得好吗？'
  },
  themeColor: '#E0DE94'
}
