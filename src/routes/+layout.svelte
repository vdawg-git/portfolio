<script lang="ts">
	import { initialzeCodeBackground } from "$lib/BackgroundCode"
	import Footer from "$lib/components/organisms/footer.svelte"
	import Navbar from "$lib/components/organisms/Navbar.svelte"
	import { onMount } from "svelte"
	import "../global.css"

	onMount(initialzeCodeBackground)
</script>

<div class="sticky inset-x-0 top-0 -z-10 max-h-0">
	<!-- background Gradient Top -->
	<div
		class="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-zinc-900 to-transparent [contain:strict] "
	/>
</div>

<main class="w-full bg-transparent">
	<Navbar />
	<div class="mx-auto mt-6 flex flex-col items-center bg-transparent">
		<slot>Nothing here</slot>
	</div>

	<Footer />

	<!-- background Gradient Bottom -->
	<div class="sticky inset-x-0 bottom-0 -z-40 max-h-0">
		<div
			class="absolute inset-x-0 bottom-0 -z-40 h-96 bg-gradient-to-b from-transparent to-zinc-900 [contain:strict]"
		/>
	</div>
</main>

<style lang="postcss">
</style>
