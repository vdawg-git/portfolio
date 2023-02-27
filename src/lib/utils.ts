import type { FetchedProject, ProjectMetaData } from "$lib/types/Types"

export async function fetchProjects(): Promise<readonly FetchedProject[]> {
	const allProjectFiles = import.meta.glob("/src/routes/projects/*/*.svelte")

	console.log({ allProjectFiles })

	return Promise.all(
		Object.entries(allProjectFiles).map(async ([path, resolver]) => {
			const { metadata } = (await resolver()) as {
				metadata: ProjectMetaData
			}

			const projectPath = path.slice(11, -13)

			return {
				metadata,
				path: projectPath
			}
		})
	)
}
