export interface FriendOld {
  // hCard+XFN
  id: string // HTML id
  rel?: string // XFN, contact / acquaintance / friend
  link?: string // URL
  html?: string // HTML
  title?: string // 标题
  descr?: string // 描述
  social?: string // 社交软件图标
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
  socia?: string // 社交软件图标
  class?: {
    avatar?: string // 头像类名
    img?: string // 图片类名
  }
}

export const friends: Friend[] = [
  {
    id: 'katari',
    rel: 'friend',
    title: "",
    name: 'Katari',
    link: 'https://katari_v.t.me',
    descr: '',
    social: '/assets/logo/telegram.svg',
    avatar: '/assets/friends_avatar/katari.webp'
  },
  {
    id: 'linger',
    rel: 'acquaintance',
    title: '蒙娜荔坤',
    name: '摆烂',
    link: 'https://linger040831.github.io/',
    descr: '就感觉到快，有催人跑的意思',
    avatar: 'https://avatars.githubusercontent.com/u/84896599'
  },
  /*  {
      id: 'qazoop',
      rel: 'acquaintance',
      title: '标题',
      name: 'qazoop',
      link: '',
      descr: '描述',
      avatar: ''
    }, */
  {
    id: 'hannari',
    rel: 'acquaintance',
    title: '',
    name: 'HANNARI',
    link: 'https://github.com/Twinkle-qwq',
    descr: '江江，我是有栖！',
    social: '/assets/logo/github.svg',
    avatar: 'https://avatars.githubusercontent.com/u/53106606'
  },
  {
    id: 'kotaruboku',
    rel: 'friend',
    title: '安の故乡',
    name: 'Kotaruboku',
    link: 'https://vistre.cn/',
    descr: 'A student',
    avatar: 'https://vistre.cn/usr/themes/handsome/assets/img/avatar.png'
  },
  {
    id: 'aeciane',
    rel: 'acquaintance',
    title: '',
    name: '12d',
    link: 'https://t.me/diversesystem',
    descr: '您在看胡伯特的网页',
    social: '/assets/logo/telegram.svg',
    avatar: '/assets/friends_avatar/aeciane.webp'
  },
  {
    id: 'iiii90909',
    rel: 'friend',
    title: '',
    name: 'iiii90909',
    link: 'https://t.me/pass25',
    descr: '',
    social: '/assets/logo/telegram.svg',
    avatar: '/assets/friends_avatar/iiii90909.webp'
  },
  {
    id: 'nekopara6',
    rel: 'acquaintance',
    title: '0606',
    name: '那里有5块钱',
    link: 'https://t.me/wdnmd23333',
    descr: '想和你晚上一起看星星捏',
    social: '/assets/logo/telegram.svg',
    avatar: 'https://avatars.githubusercontent.com/u/120037547'
  },
  /*  {
      id: '',
      rel: 'friend',
      title: '',
      name: '',
      link: '',
      descr: '',
      avatar: ''
    } */
]