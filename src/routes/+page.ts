import type { FetchedProject } from "$lib/types/Types"
import type { PageLoad } from "./$types"

export const load = (async ({ fetch }) => {
	return {
		projects: (await fetch("api/projects").then((response) =>
			response.json()
		)) as readonly FetchedProject[]
	}
}) satisfies PageLoad
