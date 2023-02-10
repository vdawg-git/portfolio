import type { BackgroundCodeArgument } from "#types/Types"

const worker = new Worker(new URL("BackgroundCodeWorker", import.meta.url), {
  type: "module",
})

worker.addEventListener("message", update)

export function initialzeCodeBackground() {
  const observer = new MutationObserver(sendHTMLtoWorker)

  observer.observe(getAppNode(), {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
  })

  sendHTMLtoWorker()
}

function sendHTMLtoWorker() {
  const message: BackgroundCodeArgument = {
    source: getAppHTML(),
    lineLenght: 160,
  }

  worker.postMessage(message)
}

function update({ data }: MessageEvent<string>) {
  getCodeBlock().innerHTML = data
}

function getCodeBlock() {
  return document.querySelector("#bg_code")
}

function getAppNode() {
  return document.querySelector("#app")
}

function getAppHTML() {
  return getAppNode().innerHTML
}
