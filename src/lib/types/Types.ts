export type BackgroundCodeArgument = {
	source: string
	lineLenght: number
}

export type ProjectMetaData = Readonly<{
	title: string
	image: string
	description: string
	/**
	 * 0 is at the top.
	 */
	sort: number
	github?: string
	website?: string
}>

export type FetchedProject = Readonly<{
	metadata: ProjectMetaData
	path: string
}>
