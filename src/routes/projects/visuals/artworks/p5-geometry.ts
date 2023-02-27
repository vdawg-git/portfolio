import type p5 from "p5"

type Ball = {
	blue: number
	green: number
	red: number
	dirX: number
	dirY: number
	lineW: number
	weight: number
	lv: number | undefined
	size: number
	x: number
	y: number
	seed: number
}

export function createSketch(artworkWidth: number): (p: p5) => unknown {
	const startTime = Date.now()

	return (p) => {
		// Declare variables for the balls
		const AMOUNT = 10
		const LEVELS = 3
		const center = [0, 0]
		const ballList: Ball[] = []

		p.setup = () => {
			p.createCanvas(artworkWidth, artworkWidth)
			p.angleMode(p.DEGREES)
			centerCanvas()

			// Create the balls with random speed (X and Y):
			for (let iteration = 0; iteration <= AMOUNT; iteration += 1) {
				for (let level = 1; level <= LEVELS; level += 1) {
					const rotation = (360 / AMOUNT) * iteration
					const x = p.width / 2 + (p.sin(rotation) * p.width) / 2 / level
					const y = p.height / 2 + (p.cos(rotation) * p.height) / 2 / level

					ballList.push(createBall(x, y, level))
				}
			}

			// Add balls to the corners
			for (const extraBall of [
				[0, 0],
				[0, p.width],
				[p.height, 0],
				[p.width, p.height]
			]) {
				ballList.push(createBall(extraBall[0], extraBall[1], undefined))
			}
		}

		p.draw = () => {
			const elapsedTime = startTime - Date.now()

			p.background(30)

			p.noStroke()

			for (const ball of ballList) {
				processBall(ball, elapsedTime)
				drawLines(ball)
			}
			drawBG()
		}

		function centerCanvas() {
			center[0] = p.width / 2
			center[1] = p.height / 2
		}

		function processBall(ball: Ball, elapsedTime: number) {
			// Process a ball movement

			if (ball.lv !== undefined) {
				const angle =
					p.pow(ball.lv, 1.2) * (p.PI / 180) * (ball.lv % 2 === 0 ? 1 : -1)
				ball.x =
					p.cos(angle) * (ball.x - center[0]) -
					p.sin(angle) * (ball.y - center[1]) +
					center[0]
				ball.y =
					p.sin(angle) * (ball.x - center[0]) +
					p.cos(angle) * (ball.y - center[1]) +
					center[1]

				ball.blue = ball.blue + p.sin((ball.seed + elapsedTime) * 0.05) * 1.5
			}

			p.push()

			p.fill(ball.red, ball.green, ball.blue, 170 / (ball.lv || 1))
			p.strokeWeight(ball.weight)
			p.stroke(ball.red, ball.green, ball.blue)
			p.circle(ball.x, ball.y, ball.size)

			p.pop()
		}

		function createBall(x: number, y: number, lv: number | undefined): Ball {
			const MAX_SIZE = 50
			const MIN_SIZE = 20

			const size = lv ? p.random(MIN_SIZE, MAX_SIZE) / lv : 1

			const lineW = p.map(lv || 1, 1, LEVELS, 3, 0.5)

			return {
				x,
				y,
				dirX: 1,
				dirY: 1,
				size,
				red: p.random(20),
				green: lv
					? p.random(240 / (lv * 0.8), 255 - lv * 5)
					: p.random(230, 255),
				blue: lv ? p.random(255) : p.random(255),
				weight: p.random(1, 2),
				lv,
				lineW,
				seed: Math.random() * 10_000
			}
		}

		function drawLines(baseBall: Ball) {
			for (const ball of ballList) {
				const lineDistributionNorm = p.pow(
					Math.max(
						p.map(
							p.dist(baseBall.x, baseBall.y, ball.x, ball.y),
							0,
							p.width * 0.8,
							1,
							0
						),
						0
					),
					2
				)

				const transparency = lineDistributionNorm * 255

				p.push()
				p.stroke(baseBall.red, baseBall.green, baseBall.blue, transparency)
				p.strokeWeight(baseBall.lineW)
				p.line(baseBall.x, baseBall.y, ball.x, ball.y)
				p.pop()
			}
		}

		function drawBG() {
			const levels = 5

			for (let index = 1; index <= levels; index += 1) {
				p.push()
				p.fill(10, 255, 255, 20)
				p.strokeWeight(0)
				p.ellipse(center[0], center[1], p.width / index)
				p.pop()
			}
		}
	}
}
