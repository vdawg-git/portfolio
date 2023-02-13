<script lang="ts">
  import GithubIcon from "virtual:icons/uil/github"
</script>

<div
  class="mt-32 flex h-full w-full items-center justify-center gap-6 p-4 text-zinc-400"
>
  <a
    href="https://github.com/Visual-Dawg"
    class=" group   "
    target="_blank"
    rel="noopener noreferrer"
    ><div
      class="flex items-center gap-3 rounded-2xl px-4 py-2 transition-all duration-200 group-hover:-translate-y-1 group-hover:bg-white group-hover:text-black"
    >
      <GithubIcon /> Github
    </div>
  </a>
  <button class="group" on:click={() => document.body.scrollTo(0, 0)}
    ><div
      class="flex items-center gap-3 rounded-2xl px-4 py-2 transition-all duration-200 group-hover:-translate-y-1 group-hover:bg-white group-hover:text-black"
    >
      Back to top
    </div>
  </button>

  <div class="">
    <div class="flex">
      Made with&nbsp;<span class="text-red-500 ">&lt;3</span>&nbsp;and Svelte
    </div>
  </div>
</div>
