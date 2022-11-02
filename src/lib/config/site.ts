import type { SiteConfig } from '$lib/types/site'

export const site: SiteConfig = {
  protocol: 'https://',
  domain: import.meta.env.URARA_SITE_DOMAIN ?? 'trle5.xyz',
  title: 'Hubert\u0027s\u0020Blog',
  subtitle: '',
  lang: 'zh-CN',
  description: 'Powered by SvelteKit/Urara',
  author: {
    name: 'Hubert\u0020Chen',
    avatar: '/assets/images/avatar/70455873_p3_master1200.jpg',
    status: '😉',
    bio: '你好呀👋'
  },
  themeColor: '#E0DE94'
}
