import highlighter from "highlight.js/lib/core"
import htmlHighlightLanguage from "highlight.js/lib/languages/xml"
import { pipe } from "fp-ts/function"
import { diffLines, type Change } from "diff"
import * as S from "fp-ts/string"
import prettier from "prettier"
import parserHTML from "prettier/parser-html"

import type { BackgroundCodeArgument } from "$lib/types/Types"

const colors = {
	green: "rgb(0, 255, 200, 0.25)",
	red: "rgba(229,83,75,0.25)"
}
const longStringsRegex = /(?<==")([^"]{20,})(?=")/gm
const noContentTagsRegex = /(<(\w*)[^>]*)><\/\2>/gm

highlighter.registerLanguage("html", htmlHighlightLanguage)

let lastResult: string | undefined
let sendDiffTimeout: NodeJS.Timeout

onmessage = (event: MessageEvent<BackgroundCodeArgument>) => {
	clearTimeout(sendDiffTimeout)

	const result = pipe(
		event.data.source,
		S.replace(longStringsRegex, "◦◦◦"),
		S.replace(noContentTagsRegex, "$1/>"), // <div></div> => <div/>
		formatHTML,
		highlightHTML
	)

	const diffed = lastResult
		? diffLines(lastResult, result).map(diffPartToHTML).join("")
		: undefined

	sendDiffTimeout = setTimeout(() => {
		// Prevent the string from being truthy with only one space
		lastResult = result.trim() ? result : undefined

		diffed ? postDiffAndResult(diffed, result) : postMessage(result)
	}, 50)
}

function postDiffAndResult(diffed: string, result: string) {
	postMessage(diffed)
	sendDiffTimeout = setTimeout(() => postMessage(result), 850)
}

function highlightHTML(html: string): string {
	return highlighter.highlight(html, { language: "html" }).value
}

function formatHTML(html: string) {
	return prettier.format(html, {
		parser: "html",
		plugins: [parserHTML],
		printWidth: 120
	})
}

function diffPartToHTML(part: Change) {
	const color = part.added
		? colors.green
		: part.removed
		? colors.red
		: undefined

	return color
		? `<span style="background-color: ${color};">${part.value}</span>`
		: part.value
}
