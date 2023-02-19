<script lang="ts">
	import { onMount } from "svelte"
	import * as THREE from "three"

	let canvas: HTMLElement
	const scene = new THREE.Scene()

	const sizes = { width: 800, height: 400 }

	// Cube
	const geometry = new THREE.BoxGeometry(1, 1, 1)
	const material = new THREE.MeshBasicMaterial({ color: "red" })
	const mesh = new THREE.Mesh(geometry, material)
	mesh.rotateX(45)
	mesh.rotateZ(45)
	mesh.rotateY(135)
	scene.add(mesh)

	// Camera
	const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
	camera.position.z += 2
	scene.add(camera)

	onMount(() => {
		// Renderer
		const renderer = new THREE.WebGLRenderer({ canvas })
		renderer.setSize(sizes.width, sizes.height)

		renderer.render(scene, camera)
	})
</script>

<canvas bind:this={canvas} />
