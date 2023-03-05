uniform float u_time;
uniform vec4 u_resolution;
varying vec2 v_Uv;
varying vec3 v_Position;

float PI = 3.14159265359;

// Noise
float mod289(float x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 perm(vec4 x) {
    return mod289(((x * 34.0) + 1.0) * x);
}

float makeNoise(vec3 p) {
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}

float makeLinesY(vec2 uv, float offset) {
    return smoothstep(0.0, 1., abs(0.5 * sin(uv.x * 10.0) + offset));
    // return abs(cos(uv.y * 4.695 + offset)) + abs(sin(uv.y * 3.79697 + offset));
    // return abs(sin(uv.x * 15.0));
}
float makeLinesX(vec2 uv, float offset) {
    // return smoothstep(0.0,,);
    return abs(cos(uv.x * 5.695 + offset)) - abs(sin(uv.x * 1.79697 + offset));
    // return abs(sin(uv.x * 15.0));
}

void main() {
    float noise = makeNoise(v_Position + u_time);

    vec2 baseUV = v_Position.xy;

    float linesX = makeLinesX(baseUV, 0.0);
    float linesY = makeLinesY(baseUV, 0.01);

    float linesBase = linesY;
    // float basePattern = makeLines(baseUV);

    gl_FragColor = vec4(linesY, 0.0, 0.0, 1);
}
