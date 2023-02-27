import { fetchProjects } from "$lib/utils"
import { json } from "@sveltejs/kit"

export async function GET() {
	const allProjects = await fetchProjects()

	const sortedPosts = [...allProjects].sort((a, b) => {
		return a.metadata.sort - b.metadata.sort
	})

	return json(sortedPosts)
}
