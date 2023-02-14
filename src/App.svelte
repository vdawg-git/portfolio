<script lang="ts">
  import { Router, Route } from "svelte-navigator"
  import { initialzeCodeBackground } from "./BackgroundCode"
  import Footer from "./components/organisms/footer.svelte"
  import Home from "./components/pages/Home.svelte"
  import Numerology from "./components/pages/Numerology.svelte"
  import Sing from "./components/pages/Sing.svelte"
  import Navbar from "./organisms/Navbar.svelte"

  initialzeCodeBackground()
</script>

<div class="sticky inset-x-0 top-0 -z-10 max-h-0">
  <div
    class="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-zinc-900 to-transparent [contain:strict] "
  />
</div>

<main class="w-full bg-transparent">
  <Router>
    <Navbar />
    <div class="mx-auto mt-6 flex flex-col items-center bg-transparent">
      <Route path="/">
        <Home />
      </Route>
      <Route path="/sing">
        <Sing />
      </Route>
      <Route path="/numerology">
        <Numerology />
      </Route>
      <Route>
        <!-- Default path if not found -->
        <Home />
      </Route>
    </div>

    <Footer />
  </Router>

  <div class="sticky inset-x-0 bottom-0 -z-40 max-h-0">
    <div
      class="absolute inset-x-0 bottom-0 -z-40 h-96 bg-gradient-to-b from-transparent to-zinc-900 [contain:strict] "
    />
  </div>
</main>

<style lang="postcss">
</style>
