<script lang="ts">
	import Button from "../lib/components/atoms/Button.svelte"
	import Card from "../lib/components/molecules/Card.svelte"

	import GithubIcon from "virtual:icons/uil/github"
	import GlobeIcon from "virtual:icons/uil/globe"
	import ArrowCircleDownIcon from "virtual:icons/uil/arrow-circle-down"

	let cardsElement: HTMLElement | undefined
</script>

<!-- Hero -->
<div class="flex min-h-[min(calc(100vh-82px),800px)] flex-col text-center">
	<div class="mb-6 flex grow flex-col items-center justify-center">
		<h2 class="text-shadow  uppercase text-zinc-400">
			Designer and Front-End Developer
		</h2>

		<h1 class=" _gradient-heading mb-6 mt-6 text-8xl  font-bold">
			Hi, im Christofer
		</h1>

		<div
			class="text-shadow mb-12 flex flex-col gap-1 text-xl font-bold text-zinc-400"
		>
			<p class="text-shadow">I like to code, design and take photographs.</p>
			<p class="text-shadow">MacGruber is the best film.</p>
		</div>

		<Button
			label="Press to say hi too"
			href="mailto:imchris@tuta.io"
			isBig
			classes="mx-auto"
			on:click={() => console.log("Hii")}
		/>
	</div>

	<div class="flex grow justify-center">
		<button
			class=" flex flex-col items-center gap-2 pb-12 text-zinc-400 transition-colors hover:text-white"
			on:click={() => cardsElement?.scrollIntoView({ behavior: "smooth" })}
		>
			<div class="">Projects</div>
			<ArrowCircleDownIcon class="h-8 w-8" />
		</button>
	</div>
</div>

<!-- Cards -->
<div
	class="flex flex-col items-center justify-center gap-36 pt-6"
	bind:this={cardsElement}
>
	<Card
		name="Sing"
		text="A modern simple music library with great design."
		image="/Logo img.png"
		route="/sing"
		externals={[
			{ Icon: GithubIcon, to: "https://github.com/Visual-Dawg/sing/" }
		]}
	/>
	<Card
		name="Numerology Toolbox"
		text="Small app to calculate numerological values."
		image="/numerology thumb.png"
		route="/numerology"
		externals={[
			{ Icon: GlobeIcon, to: "https://numerology-toolbelt.surge.sh/" },
			{
				Icon: GithubIcon,
				to: "https://github.com/Visual-Dawg/numerology_tools"
			}
		]}
	/>
</div>

<style lang="postcss">
	._gradient-heading {
		background: linear-gradient(
			to right bottom,
			theme(colors.zinc[200]) 60%,
			rgba(42, 89, 130, 0.03)
		);
		background-clip: text;
		color: transparent;

		&::selection {
			color: theme(colors.white);
		}
	}
</style>
