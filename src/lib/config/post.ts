import type { PostConfig } from '$lib/types/post'

export const post: PostConfig = {
	comment: {
    	use: ['Giscus'],
    	giscus: {
      		repo: 'interstellar750/hexo_s',
      		repoID: 'R_kgDOHTJG_w',
      		category: 'General',
      		categoryID: 'DIC_kwDOHTJG_84CS2Mz',
      		reactionsEnabled: true,
      		lang: 'zh-CN',
      		inputPosition: 'top',
      		theme: 'preferred_color_scheme'
    	}
	}
}