<script lang="ts">
  import { Router, Route } from "svelte-navigator"
  import { initialzeCodeBackground } from "./BackgroundCode"
  import Footer from "./components/organisms/footer.svelte"
  import Home from "./components/pages/Home.svelte"
  import ridgebackASCI from "./lib/RidgebackASCI.txt?raw"
  // import { ROUTES } from "./lib/Routes"
  import Navbar from "./organisms/Navbar.svelte"

  initialzeCodeBackground()
</script>

{#if window.innerWidth > 1100}
  {@html `<!--${ridgebackASCI}-->`}
{/if}

<main class="w-full bg-transparent">
  <Router>
    <Navbar />
    <div class="mx-auto mt-6 flex flex-col items-center bg-transparent">
      <Route path="/">
        <Home />
      </Route>
      <Route>
        <!-- Default path if not found -->
        <Home />
      </Route>
    </div>

    <Footer />
  </Router>
</main>

<style lang="postcss">
</style>
