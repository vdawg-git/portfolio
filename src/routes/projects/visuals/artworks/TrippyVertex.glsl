varying vec2 v_Uv;
varying vec3 v_Position;

float PI = 3.14159265359;

void main() {
    v_Uv = uv;
    v_Position = position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}