<script lang="ts">
	import { onMount } from "svelte"
	import * as THREE from "three"
	import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
	import { glitchTextOnHover } from "$lib/helper/animation"

	import anime, { type AnimeInstance } from "animejs"
	import { cancelAnimeAnimations } from "$lib/helper/Helper"

	export let width = 800
	export let pixelRatio: number

	let canvas: HTMLElement
	let textElement: HTMLElement
	const scene = new THREE.Scene()

	// Cube
	const mesh = new THREE.Mesh(
		new THREE.BoxGeometry(1, 1, 1),
		new THREE.MeshBasicMaterial({ color: "red" })
	)
	mesh.rotateX(45)
	mesh.rotateZ(45)
	mesh.rotateY(135)

	scene.add(mesh)

	// Camera
	const camera = new THREE.PerspectiveCamera(
		150,
		width / ((width / 16) * 9),
		0.01
	)
	camera.position.z = 0.9
	scene.add(camera)

	let renderer: THREE.WebGLRenderer

	let animeInstances: AnimeInstance[]

	onMount(() => {
		// Controls
		const controls = new OrbitControls(camera, canvas)
		controls.enableZoom = false
		controls.enablePan = false
		controls.rotateSpeed = 2.4
		controls.enableDamping = true
		controls.dampingFactor = 0.01

		// Renderer
		renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
		renderer.setPixelRatio(Math.min(pixelRatio, 2))
		renderer.setClearColor("black", 0)
		renderer.setSize(width * 1.2, ((width * 1.2) / 16) * 9)
		renderer.render(scene, camera)

		tick()

		animeInstances = animate()

		return () => {
			cancelAnimeAnimations(animeInstances)
		}

		function tick() {
			window.requestAnimationFrame(closure)

			function closure() {
				controls.update()
				renderer.render(scene, camera)

				window.requestAnimationFrame(closure)
			}
		}
	})

	$: {
		renderer?.setSize(width * 1.2, ((width * 1.2) / 16) * 9)
	}

	function animate() {
		const positionInstance = anime({
			target: [mesh.position],
			y: 1.8,
			easing: "easeInOutSine",
			duration: 3000,
			direction: "alternate",
			loop: true
		})
		const rotationInstance = anime({
			targets: [mesh.rotation],
			y: 1,
			x: 2,
			z: 3,
			easing: "easeInOutSine",
			duration: 5000,
			direction: "alternate",
			loop: true
		})

		const scaleInstance = anime({
			easing: "easeInOutSine",
			targets: [mesh.scale],
			x: 0.9,
			y: 0.9,
			z: 0.9,
			duration: 8000,
			loop: true,
			direction: "alternate"
		})

		return [positionInstance, rotationInstance, scaleInstance]
	}
</script>

<div
	class="relative flex flex-col items-center justify-center rounded-3xl  shadow-2xl  bg-[#000]"
	style="max-width: {width}px; max-height: {(width / 16) * 9}px;"
>
	<div
		use:glitchTextOnHover={{ iterationsUntilReveal: 30 }}
		bind:this={textElement}
		class="text-fx absolute text-transparent p-5 block left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono uppercase font-bold tracking-tighter text-justify selection:bg-red-500 z-40  
		text-base  md:text-3xl sm:text-xs lg:text-[2.5rem] xl:text-[3rem] select-none pointer-events-none leading-none"
	>
		MacGruber: Piper, there's a big difference between winging it and seeing
		what happens. Now let's see what happens.
	</div>

	<div
		class="z-20"
		on:mouseenter={() => textElement.dispatchEvent(new Event("mouseenter"))}
	>
		<canvas
			bind:this={canvas}
			width={width * 1.2}
			height={((width * 1.2) / 16) * 9}
		/>
	</div>
</div>

<style lang="postcss">
	.text-fx {
		-webkit-text-stroke: rgb(186, 0, 0) 1px;
		text-shadow: 4px 4px red;
		color: transparent;
	}
</style>
