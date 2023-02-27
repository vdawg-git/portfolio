import fragmentShader from "./InvertFragment.glsl?raw"

const invertShader = {
	uniforms: {
		tDiffuse: { value: undefined },
		opacity: { value: 1 }
	},

	vertexShader: /* glsl */ `
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,

	fragmentShader
}

export { invertShader }
