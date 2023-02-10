<script lang="ts">
  import { Router, Route } from "svelte-navigator"
  import { initialzeCodeBackground } from "./BackgroundCode"
  import Footer from "./components/organisms/footer.svelte"
  import Home from "./components/pages/Home.svelte"
  import { ROUTES } from "./lib/Routes"
  import Navbar from "./organisms/Navbar.svelte"

  initialzeCodeBackground()
</script>

<main class="h-full w-full bg-transparent">
  <Router>
    <Navbar />
    <div
      class="mx-auto flex h-[calc(max(calc(100vh),640px))]  max-w-[45rem] flex-col items-center bg-transparent px-6 pt-20 lg:pt-36"
    >
      <Route path="/">
        <Home />
      </Route>
      <Route path={ROUTES.sing} />
      <!-- Default path if not found -->
      <Route>
        <Home />
      </Route>
    </div>

    <Footer />
  </Router>
</main>

<style lang="postcss">
</style>
