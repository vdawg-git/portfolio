<script lang="ts">
	import { goto } from "$app/navigation"
	import clsx from "clsx"
	import { onMount, type SvelteComponent } from "svelte"

	import ArrowCircleRightIcon from "virtual:icons/uil/arrow-circle-right"

	type external = { Icon: typeof SvelteComponent; to: string }

	export let name: string
	export let text: string
	export let image: string
	export let externals: external[] | undefined = undefined
	export let route: string

	let wrapperElement: HTMLElement | undefined
	let hasEnteredViewport = false

	onMount(() => {
		if (!wrapperElement) {
			console.log("Card element not found on mount")
			return
		}
		const observerIn = new IntersectionObserver(
			(entries, _observer) => {
				for (const { isIntersecting } of entries) {
					if (!isIntersecting) return

					hasEnteredViewport = true
					observerIn.disconnect()
					break
				}
			},
			{ threshold: 0.35 }
		)

		observerIn.observe(wrapperElement)

		return () => observerIn.disconnect()
	})

	function goToNoScroll(url: string) {
		return () => goto(url, { noScroll: true })
	}
</script>

<div
	class=" mx-8 flex h-[30rem] items-center gap-16  max-lg:h-auto max-lg:flex-col-reverse max-lg:justify-center max-lg:text-center max-md:container lg:w-[60rem] "
	bind:this={wrapperElement}
>
	<!-- Text -->
	<div
		class={clsx(
			"text-shadow  flex h-full min-w-[25rem] flex-col justify-center transition-opacity  duration-[1100ms] max-lg:items-center",
			hasEnteredViewport
				? "translate-y-0 scale-100 opacity-100"
				: "translate-y-12 scale-95 opacity-0"
		)}
	>
		<!-- Heading -->
		<a href={route} on:click|preventDefault={goToNoScroll(route)}>
			<h3 class="text-shadow mb-4 text-6xl font-bold uppercase">
				{name}
			</h3>
		</a>

		<!-- Paragraph -->
		<p class="text-shadow mb-4 max-w-prose text-xl text-zinc-400 ">{text}</p>

		<!-- See more -->
		<a href={route} on:click|preventDefault={goToNoScroll(route)}>
			<div
				class={"mb-6 flex max-w-max items-center gap-2 text-zinc-400 transition-all hover:translate-x-1 hover:text-zinc-200"}
			>
				See more<ArrowCircleRightIcon class="h-6 w-6" />
			</div>
		</a>

		<!-- Icons -->
		{#if externals}
			<div class="flex gap-3">
				{#each externals as { Icon, to }}
					<a href={to} target="_blank" rel="noreferrer noopener">
						<Icon
							class="h-6 w-6 text-zinc-400 transition-all hover:scale-105 hover:text-white"
						/>
					</a>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Image -->
	<div
		class={clsx(
			"overflow-hidden   rounded-3xl object-contain  shadow-2xl  backdrop-blur-sm transition-all duration-[1600ms] after:absolute hover:scale-[1.05] max-lg:w-96",
			hasEnteredViewport
				? "translate-y-0 scale-100 bg-amber-900/5 opacity-100"
				: "translate-y-12 scale-95 bg-zinc-900 opacity-0  delay-[450ms]"
		)}
	>
		<a href={route} on:click|preventDefault={goToNoScroll(route)}>
			<img
				src={image}
				alt="{name} thumbnail"
				class="aspect-square h-full  max-md:h-full "
			/>
		</a>
	</div>
</div>

<style lang="postcss">
</style>
