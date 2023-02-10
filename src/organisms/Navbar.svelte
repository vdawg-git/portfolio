<script lang="ts">
  import { ROUTES } from "#/lib/Routes"
  import { Link } from "svelte-navigator"
  import { slide } from "svelte/transition"

  import BarsIcon from "virtual:icons/uil/bars"

  let isDropDownActive = false

  function toggleDropDown() {
    isDropDownActive = !isDropDownActive
  }
</script>

<nav
  class="sticky top-8 z-40 flex w-screen items-center justify-center py-2 px-6 lg:inset-0 lg:h-[128px]"
>
  <div
    class="relative z-40 flex w-[748px] items-center justify-between rounded-full border border-zinc-400/30 bg-zinc-800/5 px-6 py-2 shadow-md after:absolute after:inset-0 after:-z-10 after:rounded-full after:backdrop-blur-md"
  >
    <div class="text-sm md:text-lg">
      <Link to="/"
        ><div class="flex items-center gap-3">
          <img src="Logo.svg" class="h-8 w-8" alt="Christofer Koeth Logo" /> Christofer
        </div></Link
      >
    </div>

    <!-- Desktop & Tablet-->
    <ul class="hidden gap-4 text-sm sm:visible sm:flex">
      <li class="hover:text-zinc-300">
        <Link to="/#projects">Projects</Link>
      </li>
      <li class="hover:text-zinc-300">Contact</li>
    </ul>

    <!-- Mobile-->
    <div class="relative z-10 sm:hidden">
      <button class="h-8 w-8 p-1" on:click={toggleDropDown}><BarsIcon /></button
      >

      {#if isDropDownActive}
        <ul
          class="absolute right-0 z-10 flex min-w-max flex-col gap-4 rounded-xl border border-zinc-400/30 bg-zinc-100/5 p-3 text-sm shadow-lg shadow-amber-900/10 backdrop-blur-lg"
          transition:slide={{ duration: 120 }}
        >
          <li class="hover:text-zinc-400">
            <Link to="/">Home</Link>
          </li>
          <li class="hover:text-zinc-400">
            <Link to={ROUTES.sing}>Sing</Link>
          </li>
        </ul>
      {/if}
    </div>
  </div>
</nav>
