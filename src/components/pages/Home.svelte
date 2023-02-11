<script lang="ts">
  import Button from "../atoms/Button.svelte"
  import Card from "../molecules/Card.svelte"

  import GithubIcon from "virtual:icons/uil/github"
  import GlobeIcon from "virtual:icons/uil/globe"
  import ArrowCircleDownIcon from "virtual:icons/uil/arrow-circle-down"
</script>

<!-- Hero -->
<div
  class="flex min-h-[min(calc(100vh-82px),1100px)] flex-col pt-20 text-center"
>
  <div class="mb-6 flex grow flex-col items-center justify-center">
    <h2 class="text-shadow  uppercase text-zinc-400">
      Designer and Front-End Developer
    </h2>
    <h1 class="text-shadow mb-6 mt-6 text-8xl font-bold ">Hi, im Christofer</h1>
    <div
      class="text-shadow flex flex-col gap-1 text-xl font-bold text-zinc-400 "
    >
      <p class="text-shadow">I like to code, design and shoot pictures.</p>
      <p class="text-shadow">MacGruber is the best film.</p>
    </div>
  </div>

  <Button
    label="Press to say hi"
    href="mailto:imchris@tuta.io"
    isBig
    classes="mx-auto"
    on:click={() => console.log("Hii")}
  />

  <div class="mt-14 flex flex-col items-center gap-2 pb-12 text-zinc-400">
    <div class="">Projects</div>
    <ArrowCircleDownIcon class="h-8 w-8" />
  </div>
</div>

<!-- Cards -->
<div class="flex flex-col items-center justify-center gap-36" id="projects">
  <Card
    name="Sing"
    text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo impedit reprehenderit corrupti eum voluptas quidem corporis voluptate tenetur dolorem. 
Suscipit voluptatum deleniti labore nulla rerum aspernatur adipisci."
    image="/placeholder.jpg"
    route="sing"
    externals={[
      { Icon: GithubIcon, to: "https://github.com/Visual-Dawg/sing/" },
    ]}
  />
  <Card
    name="Numerology Toolbox"
    text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo impedit reprehenderit corrupti eum voluptas quidem corporis voluptate tenetur dolorem. 
Suscipit voluptatum deleniti labore nulla rerum aspernatur adipisci."
    image="/placeholder.jpg"
    route="numerology"
    externals={[
      { Icon: GlobeIcon, to: "https://numerology-toolbelt.surge.sh/" },
      {
        Icon: GithubIcon,
        to: "https://github.com/Visual-Dawg/numerology_tools",
      },
    ]}
  />
</div>

<style lang="postcss">
</style>
