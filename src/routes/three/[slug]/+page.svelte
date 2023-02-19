<script lang="ts">
	import * as E from "fp-ts/lib/Either"

	import type { PageData } from "./$types"

	export let data: PageData
</script>

{#if E.isRight(data)}
	{@const values = data.right}
	{@const Content = values.Content}
	<h1 class="text-3xl">{values.title}</h1>
	<p class="text-zinc-400">{values.description}</p>

	<Content />
{:else}
	<div>{data.left}</div>
{/if}
