<script lang="ts">
	import { onMount } from "svelte"
	import p5 from "p5"
	import * as THREE from "three"
	import { invertShader } from "./InvertShader"
	import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
	import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
	import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
	import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
	import { createSketch } from "./p5-geometry"
	import { grainShader } from "./GrainShader"

	export let baseWidth: number
	export let pixelRatio: number

	const wrapperWidth = 600

	$: width = Math.min(baseWidth, wrapperWidth)

	let canvas: HTMLElement
	const scene = new THREE.Scene()

	let renderer: THREE.WebGLRenderer
	$: {
		renderer?.setSize(width, width)
	}
	let composer: EffectComposer

	let p5Wrapper: HTMLElement
	let sketch: p5

	onMount(() => {
		// P5
		sketch = new p5(createSketch(wrapperWidth), p5Wrapper)

		// Three
		const texture = new THREE.CanvasTexture(p5Wrapper.childNodes[0])

		const material = new THREE.MeshBasicMaterial({ map: texture })

		const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, width), material)

		scene.add(mesh)

		const camera = new THREE.OrthographicCamera(
			width / -2,
			width / 2,
			width / 2,
			width / -2,
			1,
			1000
		)
		camera.position.z = 1
		scene.add(camera)

		renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
		composer = new EffectComposer(renderer)

		composer.addPass(new RenderPass(scene, camera))
		composer.addPass(
			new UnrealBloomPass(new THREE.Vector2(width, width), 2.5, 1, 0.47)
		)
		const grain = new ShaderPass(grainShader)
		// grain.uniforms.resolution.value = [width, width]
		composer.addPass(grain)

		renderer.setPixelRatio(Math.min(pixelRatio, 2))
		renderer.setClearColor("black", 0)
		renderer.setSize(width, width)
		renderer.render(scene, camera)

		let animationID: number

		tick()

		return () => {
			console.log("xDestroyx")
			cancelAnimationFrame(animationID)
			renderer.dispose()
			composer.dispose()
			sketch.remove()
			// @ts-expect-error
			sketch = undefined
		}

		function tick() {
			texture.needsUpdate = true
			grain.uniforms.time.value += 1

			composer.render()

			animationID = window.requestAnimationFrame(tick)
		}
	})
</script>

<!-- p5 wrapper -->
<div
	class="hidden"
	bind:this={p5Wrapper}
	style:transform="scale({width / wrapperWidth})"
	style:margin-bottom={(width - wrapperWidth) / 2 + "px"}
	style:margin-top={(width - wrapperWidth) / 2 + "px"}
/>

<!-- Three canvas -->
<canvas bind:this={canvas} {width} height={width} class="shadow-2xl" />
