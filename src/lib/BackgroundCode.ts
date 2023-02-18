import type { BackgroundCodeArgument } from "$lib/types/Types"

let codeWorker: Worker

export function initialzeCodeBackground() {
	codeWorker = new Worker(new URL("BackgroundCodeWorker", import.meta.url), {
		type: "module"
	})

	codeWorker.addEventListener("message", update)

	const observer = new MutationObserver(() => sendHTMLtoWorker(codeWorker))

	const element = getAppNode()
	if (!element) {
		console.error("Main element for live-code not found")
		return
	}

	observer.observe(element, {
		childList: true,
		subtree: true,
		characterData: true,
		attributes: true
	})

	sendHTMLtoWorker(codeWorker)
}

function sendHTMLtoWorker(worker: Worker) {
	const message: BackgroundCodeArgument = {
		source: getAppHTML() ?? "",
		lineLenght: 160
	}

	worker.postMessage(message)
}

function update({ data }: MessageEvent<string>) {
	const element = getCodeBlock()
	if (!element) {
		console.error("Background code element not found")
		return
	}

	element.innerHTML = data
}

function getCodeBlock() {
	return document.querySelector("#bg-code")
}

function getAppNode() {
	return document.querySelector("#app")
}

function getAppHTML() {
	return getAppNode()?.innerHTML
}
