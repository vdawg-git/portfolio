import { defineConfig } from "vitest/config"
import { sveltekit } from "@sveltejs/kit/vite"
import Icons from "unplugin-icons/vite"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [sveltekit(), Icons({ compiler: "svelte" })],

	// Vitest
	test: { includeSource: ["./src/**/*.ts"] },
	define: {
		"import.meta.vitest": "undefined"
	}
})
