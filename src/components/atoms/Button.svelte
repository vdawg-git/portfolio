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
  class="relative rounded-md border border-zinc-400/50 px-6 py-3 text-sm shadow-md  transition-colors after:absolute after:inset-0 after:-z-10 after:bg-zinc-100/5 after:backdrop-blur-sm hover:bg-zinc-100/20"
  >{label}</svelte:element
>
