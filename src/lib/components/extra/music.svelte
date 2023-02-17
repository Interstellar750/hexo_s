<script lang="ts">
  export let cover: string
  export let title: string
  export let link: string
</script>

<div class="card bg-base-100 !bg-base-200 my-4">
  <div class="p-7">
    <div class="flex">
      <div class="card-title flex-initial pr-4">
        <img class="w-24 h-auto mt-auto ml-auto mb-auto rounded-box" alt="album_cover" src={cover}/>
      </div>
      <span class="mb-auto !text-4xl font-medium">
        <style scoped>
          span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        </style>
        <a rel="noopener noreferrer external" target="_blank" class="ml-4 no-underline font-semibold" href={link}>
          {title}
        </a>
        <audio controls>
          <source src={link}>
        </audio>
      </span>
    </div>
  </div>
</div>
