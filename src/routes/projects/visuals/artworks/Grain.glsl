varying vec2 vUv;
uniform float opacity;
uniform sampler2D tDiffuse;
uniform float time;

#define SPEED 0.05
// What gray level noise should tend to.
#define MEAN -0.3
// Controls the contrast/variance of noise.
#define VARIANCE 0.5
#define INTENSITY 0.6

float getRandom(vec2 p) {
    vec2 k1 = vec2(23.14069263277926, // e^pi (Gelfond's constant)
    2.665144142690225 // 2^sqrt(2) (Gelfond–Schneider constant)
    );
    return fract(cos(dot(p, k1)) * 12345.6789);
}

vec3 channel_mix(vec3 a, vec3 b, vec3 w) {
    return vec3(mix(a.r, b.r, w.r), mix(a.g, b.g, w.g), mix(a.b, b.b, w.b));
}

float gaussian(float z, float u, float o) {
    return (1.0 / (o * sqrt(2.0 * 3.1415))) * exp(-(((z - u) * (z - u)) / (2.0 * (o * o))));
}

vec3 overlay(vec3 a, vec3 b, float w) {
    return mix(a, channel_mix(2.0 * a * b, vec3(1.0) - 2.0 * (vec3(1.0) - a) * (vec3(1.0) - b), step(vec3(0.5), a)), w);
}

vec3 soft_light(vec3 a, vec3 b, float w) {
    return mix(a, pow(a, pow(vec3(2.0), 2.0 * (vec3(0.5) - b))), w);
}

void main() {
    vec4 color = texture2D(tDiffuse, vUv);

    float t = time * float(SPEED);
    float seed = dot(vUv, vec2(12.9898, 78.233));
    float noise = fract(sin(seed) * 43758.5453 + t);
    noise = gaussian(noise, float(MEAN), float(VARIANCE) * float(VARIANCE));

    vec3 grain = vec3(noise) * (1.0 - color.rgb);

    color.rgb = overlay(color.rgb, grain, INTENSITY);

    gl_FragColor = color;

}
