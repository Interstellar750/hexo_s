<script lang="ts">
  import { site } from '$lib/config/site'
  import { footer as footerConfig } from '$lib/config/general'
  let className: string | undefined = undefined
  export { className as class }
  export let sticky: boolean = false
  export let rounded: boolean = false
</script>

<footer
  id="footer"
  class="footer footer-center bg-base-300 text-base-content shadow-inner p-8 {rounded
    ? 'rounded-box'
    : 'md:rounded-box'} {sticky ? 'sticky bottom-0 z-0 md:static' : ''} {className ?? ''}">
  <div class="prose">
    <p>
      {#if footerConfig.nav}
        {#each footerConfig.nav as { text, link }, i}
          <a href={link} rel="noopener external" target="_blank">{text}</a>
          {#if i + 1 < footerConfig.nav.length}
            <span class="mr-1">·</span>
          {/if}
        {/each}
        <br />
      {/if}
      <a
        rel="noopener external"
        target="_blank"
        class="tooltip hover:text-secondary"
        data-tip="来 GitHub 上看看我？"
        href="https://github.com/interstellar750/">
        <b>{site.author.name}</b>
      </a>
      <a
      rel="noopener external"
        target="_blank"
        class="tooltip hover:text-secondary"
        data-tip="CC BY 4.0"
        href="https://creativecommons.org/licenses/by/4.0/">
      &copy;
      </a>
      <a
      rel="noopener external"
        target="_blank"
        class="tooltip hover:text-secondary"
        data-tip="今年是何年"
        href="https://time.is/">
        <b>{footerConfig.since && footerConfig.since !== new Date().toJSON().substring(0, 4)
          ? `${footerConfig.since} - ${new Date().toJSON().substring(0, 4)}`
          : new Date().toJSON().substring(0, 4)} </b>
      </a>
      | 由
      <a
        rel="noopener external"
        target="_blank"
        class="tooltip tooltip-secondary hover:text-secondary"
        data-tip="🌸 [δ] - Based on MDsveX & SvelteKit 🌸"
        href="https://github.com/importantimport/urara">
        Urara
      </a>
      驱动
      {#if footerConfig.html}
        <br />
        {@html footerConfig.html}
      {/if}
    </p>
  </div>
</footer>
