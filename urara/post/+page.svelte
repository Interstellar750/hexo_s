<script lang="ts">
    import { sections as allSections } from '$lib/config/sections'
    import Head from '$lib/components/head.svelte'
    import SectionComponent from '$lib/components/extra/sections.svelte'
  
    let items: { id: string }[] = [
        ...(allSections.filter(x => x.id.includes('post')) as { id: string }[])
    ]
</script>

<Head />

{#each items as item}
    <SectionComponent {item} />
{/each}