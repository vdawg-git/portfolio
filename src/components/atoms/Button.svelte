<script lang="ts">
  export let label: string

  export let href: string | undefined = undefined

  const elementType = href ? "a" : "button"
</script>

<svelte:element
  this={elementType}
  on:click
  on:keydown
  {href}
  class="rounded-md border border-zinc-400/50 bg-zinc-100/5 px-6 py-3 text-sm shadow-md backdrop-blur-md transition-colors hover:bg-zinc-100/20"
  >{label}</svelte:element
>
