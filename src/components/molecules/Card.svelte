<script lang="ts">
  import type { SvelteComponent } from "svelte"
  import { Link } from "svelte-navigator"

  type external = { Icon: typeof SvelteComponent; to: string }

  export let name: string
  export let text: string
  export let image: string
  export let externals: external[] | undefined = undefined
  export let route: string
</script>

<div
  class="flex h-[30rem] w-[60rem] items-center gap-16 max-md:container  max-md:h-auto max-md:flex-col-reverse"
>
  <!-- Text -->
  <div class="text-shadow  flex h-full shrink grow flex-col justify-center ">
    <!-- Heading -->
    <Link to={route}>
      <h3
        class="text-shadow mb-4 text-6xl uppercase transition-colors  hover:text-zinc-400"
      >
        {name}
      </h3>
    </Link>

    <!-- Paragraph -->
    <p class="text-shadow mb-6 max-w-prose text-zinc-400 ">{text}</p>

    <!-- Icons -->
    {#if externals}
      <div class="flex gap-3">
        {#each externals as { Icon, to }}
          <a href={to} target="_blank" rel="noreferrer noopener">
            <Icon class="h-6 w-6 text-zinc-400 hover:text-zinc-500" />
          </a>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Image -->
  <div class="shrink-0 grow-0">
    <Link to={route}>
      <img
        src={image}
        alt="{name} thumbnail"
        class="aspect-square h-[30rem] rounded-3xl shadow-2xl max-md:h-[20rem]"
      />
    </Link>
  </div>
</div>
