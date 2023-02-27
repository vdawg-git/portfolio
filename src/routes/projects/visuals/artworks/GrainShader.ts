import fragmentShader from "./Grain.glsl?raw"

const grainShader = {
	uniforms: {
		tDiffuse: { value: undefined },

		time: { value: 0 }
	},

	vertexShader: /* glsl */ `
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,

	fragmentShader
}

export { grainShader }
