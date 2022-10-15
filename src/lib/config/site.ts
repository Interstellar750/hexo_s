import type { SiteConfig } from '$lib/types/site'

export const site: SiteConfig = {
  protocol: 'https://',
  domain: import.meta.env.URARA_SITE_DOMAIN ?? 'trle5.xyz',
  title: 'Hubert\u0027s Blog',
  subtitle: '',
  lang: 'zh-CN',
  description: 'Powered by SvelteKit/Urara',
  author: {
    name: 'Hubert Chen',
    avatar: '/assets/IMG_20220506_162446_384.jpg',
    status: '😉',
    bio: '你好呀👋'
  },
  themeColor: '#E0DE94'
}
