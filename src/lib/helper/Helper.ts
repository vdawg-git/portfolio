import type { AnimeInstance } from "animejs"
import anime from "animejs"

export function cancelAnimeAnimations(animations: readonly AnimeInstance[]) {
	for (const animation of animations) {
		const indexToRemove = anime.running.indexOf(animation)

		anime.running.splice(indexToRemove, 1)
	}
}
