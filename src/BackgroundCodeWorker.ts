import jsBeautify from "js-beautify"
import highlighter from "highlight.js/lib/core"
import htmlHighlightLanguage from "highlight.js/lib/languages/xml"
import { pipe } from "fp-ts/function"
import { diffLines } from "diff"
import * as S from "fp-ts/string"

import type { BackgroundCodeArgument } from "#types/Types"

const colors = { green: "rgba(70,149,74,0.25)", red: "rgba(229,83,75,0.25)" }
const longStringsRegex = /(?<==")([^"]{90,})(?=")/gm

const beautifyHTML = jsBeautify.html

highlighter.registerLanguage("html", htmlHighlightLanguage)

let lastResult: string
let diffEndTimeout: NodeJS.Timeout

onmessage = (event: MessageEvent<BackgroundCodeArgument>) => {
  clearTimeout(diffEndTimeout)

  const result = pipe(
    event.data.source,

    // Trim long strings like class names
    S.replace(longStringsRegex, "◦◦◦"),

    formatHTML,

    highlightHTML
  )

  const diffed = lastResult
    ? diffLines(lastResult, result)
        .map((part) => {
          const color = part.added
            ? colors.green
            : part.removed
            ? colors.red
            : undefined

          return color
            ? `<span style="background-color: ${color};">${part.value}</span>`
            : part.value
        })
        .join("")
    : undefined

  // Prevent the string from being truthy with one space
  lastResult = result.trim() ? result : undefined

  diffed ? postDiffAndResult(diffed, result) : postMessage(result)
}

function postDiffAndResult(diffed: string, result: string) {
  postMessage(diffed)
  diffEndTimeout = setTimeout(() => postMessage(result), 850)
}

function highlightHTML(html: string): string {
  return highlighter.highlight(html, { language: "html" }).value
}

function formatHTML(html: string) {
  return beautifyHTML(html, {
    wrap_line_length: 70,
    wrap_attributes: "auto",
    end_with_newline: true,
  })
}
