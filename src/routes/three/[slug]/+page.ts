import { right, left, type Either } from "fp-ts/lib/Either"
import type { SvelteComponent } from "svelte"

import type { PageLoad } from "./$types"

type LessonComponentData = {
	Content: typeof SvelteComponent
	title: string
	image: string
	description: string
}

export const load = (async ({ params }) => {
	return import(`../${params.slug}.svelte`)
		.then((data) => {
			return right({
				Content: data.default as typeof SvelteComponent,
				title: data.title as string,
				image: data.image as string,
				description: data.description as string
			} satisfies LessonComponentData)
		})
		.catch(left) as Promise<Either<unknown, LessonComponentData>>
}) satisfies PageLoad
