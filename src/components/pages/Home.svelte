<script lang="ts">
  import Button from "../atoms/Button.svelte"
  import Card from "../molecules/Card.svelte"
</script>

<div class="mb-28 text-center ">
  <h2 class="shadow-zinc-900 text-shadow-cover ">
    Designer and Front-End Developer
  </h2>
  <h1 class="texts mb-6 mt-2 text-8xl shadow-zinc-900 text-shadow-cover">
    Hi, im Christofer
  </h1>
  <div
    class="mb-10 flex flex-col gap-1 text-sm font-bold text-zinc-300 shadow-zinc-900 text-shadow-cover"
  >
    <p class="shadow-zinc-900 text-shadow-cover ">
      I like to code, design and shoot pictures.
    </p>
    <p
      class="shadow-zinc-900 text-shadow-cover
    "
    >
      MacGruber is also the best film.
    </p>
  </div>

  <Button
    label="Press this button to contact me"
    href="mailto:imchris@tuta.io"
  />
</div>

<div class="flex flex-col gap-12" id="projects">
  <Card
    name="Sing"
    text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo impedit reprehenderit corrupti eum voluptas quidem corporis voluptate tenetur dolorem. 
Suscipit voluptatum deleniti labore nulla rerum aspernatur adipisci."
    image="/placeholder.jpg"
  />
  <Card
    name="Numerology Toolbox"
    text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo impedit reprehenderit corrupti eum voluptas quidem corporis voluptate tenetur dolorem. 
Suscipit voluptatum deleniti labore nulla rerum aspernatur adipisci."
    image="/placeholder.jpg"
  />
  <Card
    name="This website"
    text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo impedit reprehenderit corrupti eum voluptas quidem corporis voluptate tenetur dolorem. 
Suscipit voluptatum deleniti labore nulla rerum aspernatur adipisci."
    image="/placeholder.jpg"
  />
</div>

<style></style>
