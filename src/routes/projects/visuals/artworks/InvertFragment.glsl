uniform float opacity;
uniform sampler2D tDiffuse;
varying vec2 vUv;

void main() {
    vec4 originalColor = texture2D(tDiffuse, vUv);

    gl_FragColor = originalColor;
    gl_FragColor.a *= opacity;
}