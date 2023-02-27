<script lang="ts">
	import { slide } from "svelte/transition"

	import BarsIcon from "virtual:icons/uil/bars"

	let isDropDownActive = false

	function toggleDropDown() {
		isDropDownActive = !isDropDownActive
	}
</script>

<nav
	class="z-40 pt-8 flex items-center justify-center text-sm font-bold tracking-wide"
>
	<div
		class="relative z-40 flex w-[748px] items-center justify-between  px-6 py-2"
	>
		<div class="">
			<a href="/"
				><div class="flex items-center gap-3">
					<img
						src="/Logo.svg"
						class="-ml-2 h-12 w-12"
						alt="Christofer Koeth Logo"
					/> Christofer
				</div></a
			>
		</div>

		<!-- Desktop & Tablet-->
		<ul class="hidden gap-4 text-sm  sm:visible sm:flex">
			<a href="mailto:imchris@tuta.io">
				<li class="hover:text-zinc-300">Contact</li>
			</a>
		</ul>

		<!-- Mobile-->
		<div class="relative z-10 sm:hidden">
			<button class="h-8 w-8 p-1" on:click={toggleDropDown}><BarsIcon /></button
			>

			{#if isDropDownActive}
				<ul
					class="absolute right-0 z-10 flex min-w-max flex-col gap-4 rounded-xl border border-zinc-400/30 bg-zinc-100/5 p-3 text-sm shadow-lg shadow-amber-900/10 backdrop-blur-lg"
					transition:slide={{ duration: 120 }}
				>
					<a href="mailto:imchris@tuta.io">
						<li class="hover:text-zinc-400">Contact</li>
					</a>
				</ul>
			{/if}
		</div>
	</div>
</nav>
