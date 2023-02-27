import { pipe } from "fp-ts/lib/function"

// prettier-ignore
// const coolStrings = ["ﾮ","年","お","わ","を","り","ら","て","つ","Ω","ͳ","Δ","Θ","Ϋ","λ","π","Ϡ",..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]

const coolStrings = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZÖÜÄ", ..."#§$%1234567890@$§"]
const coolStringsLength = coolStrings.length

// The alphabet as an array of strings

type GlitchOptions = {
	letterRevealAmount?: number
	iterationsUntilReveal?: number
}

export function glitchTextOnHover(node: HTMLElement, options: GlitchOptions) {
	const glitchText = createGlitchTextEffect(node, options)

	node.addEventListener("mouseenter", glitchText)

	return { destroy: () => node.removeEventListener("mouseenter", glitchText) }
}

function createGlitchTextEffect(
	node: HTMLElement,
	{ letterRevealAmount = 0, iterationsUntilReveal = 0 }: GlitchOptions
) {
	// eslint-disable-next-line unicorn/prefer-dom-node-text-content
	const word = node.innerText ?? ""
	const iterationAmount = word.length + iterationsUntilReveal
	const iterationIncrease =
		letterRevealAmount || Math.floor(iterationAmount / 35) + 1

	let iterations = 0
	let interval: NodeJS.Timer

	return () => {
		if (iterations > 0) return

		interval = setInterval(() => {
			node.textContent = pipe(
				word,
				(text) => [...text],
				(letters) =>
					letters
						.map((_, index) =>
							(index + iterationsUntilReveal < iterations &&
								iterations > iterationsUntilReveal) ||
							word[index] === " "
								? word[index]
								: getRandomCollString()
						)
						.join("")
			)

			if (iterations > iterationAmount) {
				iterations = 0
				clearInterval(interval)
			} else {
				iterations += iterationIncrease
			}
		}, 80)
	}
}

function getRandomCollString(): string {
	return coolStrings[Math.floor(Math.random() * coolStringsLength)]
}
