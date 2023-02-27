/**
 * Returns true if the first argument is greater than the second, otherwise false.
 * */
export function greaterThan(a: number): (b: number) => boolean {
	return (b) => a < b
}
