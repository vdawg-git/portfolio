import jsBeautify from "js-beautify"
import highlighter from "highlight.js/lib/core"
import html from "highlight.js/lib/languages/xml"

import type { BackgroundCodeArgument } from "#types/Types"

const beautifyHTML = jsBeautify.html

highlighter.registerLanguage("html", html)

onmessage = (event: MessageEvent<BackgroundCodeArgument>) => {
  console.log(event.data.source)

  const cleaned = event.data.source.replace(
    /(?<=class=")([^"]{50,})(?=")/gm,
    "◦◦◦"
  )

  const formatted = beautifyHTML(cleaned, {
    wrap_line_length: 70,
    wrap_attributes: "auto",
    end_with_newline: true,
  })

  postMessage(highlighter.highlight(formatted, { language: "html" }).value)
}
