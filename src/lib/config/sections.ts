export type Section = {
    id: string
    // name: string
    description?: string
    related_tags: string[]
}
  
export const sections: Section[] = [
    {
        id: 'talk',  // same as name of the section
        description: '随便写点',
        related_tags: [ // pages with which tags are included
            '闲聊',
            '年度总结',
        ],
    },
    {
        id: 'post',
        description: '文章',
        related_tags: [
            'Urara',
            '拓展',
            'Homekit',
            'esp8266',
            '技术',
            '博客',
            'Chrome OS',
            'Linux',
            '小教程',
            'FarPush',
            '推送服务',
            'ADB',
            'Hexo',
        ]
    },
]
