import type { Handle } from '@sveltejs/kit'
import { site } from '$lib/config/site'

export const handle: Handle = async ({ event, resolve }) =>
  await resolve(event, {
    transformPageChunk: ({ html }) => html.replace('<html lang="zh-CN">', `<html lang="${site.lang ?? 'zh-CN'}">`)
  })
