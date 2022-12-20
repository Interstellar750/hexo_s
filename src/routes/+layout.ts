import type { LayoutLoad } from './$types'
export const prerender = true
export const trailingSlash = 'always'
export const load: LayoutLoad = async ({ url, fefetchtch }) => ({
  path: url.pathname,
  res: await fetch('/posts.json').then(res => res.json())
})
