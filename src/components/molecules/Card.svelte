<script lang="ts">
  export let name: string
  export let text: string
  export let image: string
</script>

<div
  class="flex flex-col-reverse items-center rounded-3xl  border border-zinc-400/30 bg-zinc-100/5 shadow-lg backdrop-blur-md max-md:p-7 md:h-[20rem] md:flex-row md:items-end"
>
  <div class="flex flex-col gap-3 p-4 md:p-8">
    <h3 class="text-6xl">{name}</h3>
    <p class="text-xs text-zinc-400">{text}</p>
  </div>
  <img
    src={image}
    alt="{name} thumbnail"
    class="aspect-square h-full rounded-3xl max-md:max-w-[15rem] md:rounded-none"
  />
</div>
