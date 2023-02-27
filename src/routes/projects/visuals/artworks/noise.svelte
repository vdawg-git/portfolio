<script lang="ts">
	import { onMount } from "svelte"
	import * as THREE from "three"
	import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
	import fragmentShader from "./noiseFragment.glsl?raw"
	import vertexShader from "./noiseVertex.glsl?raw"

	import { cancelAnimeAnimations } from "$lib/helper/Helper"

	export let width = 800
	export let pixelRatio: number

	let canvas: HTMLElement
	const scene = new THREE.Scene()

	const material = new THREE.ShaderMaterial({
		vertexShader,
		fragmentShader,
		extensions: { derivatives: true },
		uniforms: {
			time: { value: 0 },
			resolution: { value: new THREE.Vector4() }
		},
		side: THREE.DoubleSide
		// wireframe: true
	})

	// Cube
	const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), material)

	mesh.rotateX(45)
	mesh.rotateZ(-45)
	mesh.rotateY(45)

	scene.add(mesh)

	// Camera
	const camera = new THREE.PerspectiveCamera(
		50,
		width / ((width / 16) * 9),
		0.01
	)
	camera.position.z = 0.9
	scene.add(camera)

	let renderer: THREE.WebGLRenderer

	onMount(() => {
		// Controls
		const controls = new OrbitControls(camera, canvas)
		// controls.enableZoom = false
		// controls.enablePan = false
		// controls.rotateSpeed = 2.4
		// controls.enableDamping = true
		// controls.dampingFactor = 0.01

		// Renderer
		renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
		renderer.setPixelRatio(Math.min(pixelRatio, 2))
		renderer.setClearColor("black", 0)
		renderer.setSize(width * 1.2, ((width * 1.2) / 16) * 9)
		renderer.render(scene, camera)

		tick()

		// animeInstances = animate()

		return () => {
			// cancelAnimeAnimations(animeInstances)
		}

		function tick() {
			const clock = new THREE.Clock()

			window.requestAnimationFrame(closure)

			function closure() {
				controls.update()

				material.uniforms.time.value = clock.getElapsedTime() * 0.3

				renderer.render(scene, camera)

				window.requestAnimationFrame(closure)
			}
		}
	})

	$: {
		renderer?.setSize(width, (width / 16) * 9)
	}
</script>

<div
	class="relative flex flex-col items-center justify-center rounded-3xl  shadow-2xl  bg-[#000] overflow-hidden"
	style="max-width: {width}px; max-height: {(width / 16) * 9}px;"
>
	<!-- <div
		use:glitchTextOnHover={{ iterationsUntilReveal: 30 }}
		bind:this={textElement}
		class="text-fx absolute text-transparent p-5 block left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono uppercase font-bold tracking-tighter text-justify selection:bg-red-500 z-40  
		text-base  md:text-3xl sm:text-xs lg:text-[2.5rem] xl:text-[3rem] select-none pointer-events-none leading-none"
	>
		MacGruber: Piper, there's a big difference between winging it and seeing
		what happens. Now let's see what happens.
	</div> -->

	<div class="z-20">
		<canvas bind:this={canvas} {width} height={(width / 16) * 9} />
	</div>
</div>

<style lang="postcss">
	/* .text-fx {
		-webkit-text-stroke: rgb(186, 0, 0) 1px;
		text-shadow: 4px 4px red;
		color: transparent;
	} */
</style>
