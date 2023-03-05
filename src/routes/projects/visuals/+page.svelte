<script lang="ts" context="module">
	export const metadata: ProjectMetaData = {
		title: "Visual experiments",
		image: "",
		description: `Generative art with Javascript.`,
		sort: 3
	}
</script>

<script lang="ts">
	import { greaterThan } from "$lib/helper/Pures"
	import type { ProjectMetaData } from "$lib/types/Types"
	import { onMount } from "svelte"
	import { match } from "ts-pattern"
	import GeometryP5 from "./artworks/p5-geometry.svelte"
	import Trippy from "./artworks/Trippy.svelte"
	import RedCube from "./artworks/red_cube.svelte"

	let artworkWidth = 800
	let pixelRatio = 1

	function getArtworkWidth() {
		return match(window.innerWidth)
			.when(greaterThan(1280), () => 1100)
			.when(greaterThan(1024), () => 900)
			.when(greaterThan(768), () => 700)
			.when(greaterThan(640), () => 600)
			.otherwise(() => 400)
	}

	onMount(() => {
		artworkWidth = getArtworkWidth()
		pixelRatio = window.devicePixelRatio
	})
</script>

<svelte:window
	on:resize={() => {
		artworkWidth = getArtworkWidth()
		pixelRatio = window.devicePixelRatio
	}}
/>

<!-- <GeometryP5 baseWidth={artworkWidth} {pixelRatio} />
# p5.js with Three.js shaders

<RedCube width={artworkWidth} {pixelRatio} />
# First expiremt with Three.js. A red cube. -->

<Trippy width={artworkWidth} {pixelRatio} />
# I started to learn shaders. They are awesome
