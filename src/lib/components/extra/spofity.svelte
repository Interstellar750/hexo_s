<script lang="ts">
  export let type = 'artist' | 'album' | 'track'
  export let id = undefined
  export let width = undefined
  export let height = undefined
  export let theme = true
  export let compact = false
  const src = `https://open.spotify.com/embed/${type}/${id}?utm_source=generator${theme ? '' : '&theme=0'}`
  width = `${width ? width : '100%'}`
  height = `${compact ? '152' : '352'}`
</script>

<div>
  <iframe
    style="border-radius:12px"
    title="Spofity music player"
    {src}
    {width}
    {height}
    frameborder="0"
    allowfullscreen=""
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy" />
</div>
