<script lang="ts">
  import clsx from "clsx"

  export let label: string

  export let href: string | undefined = undefined
  export let classes = ""
  export let isBig = false

  const elementType = href ? "a" : "button"
</script>

<svelte:element
  this={elementType}
  on:click
  on:keydown
  {href}
  rel={href && "noreferrer noopener"}
  target={href && "_blank"}
  class={clsx(
    "_custom relative block  max-w-max rounded-md  border border-zinc-400/50 shadow-md after:absolute after:inset-0 after:-z-10  after:rounded-md after:bg-zinc-900/5 after:backdrop-blur-sm hover:bg-zinc-100/20",
    isBig ? "px-8 py-4 text-base" : "px-6 py-3 text-sm",
    classes
  )}>{label}</svelte:element
>

<style lang="postcss">
  ._custom {
    transform: scale(1);

    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;

    &:hover {
      transform: scale(1.1);
    }
  }
</style>
