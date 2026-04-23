import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vert = /* glsl */`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

const frag = /* glsl */`
precision highp float;
uniform float uTime;
uniform vec2  uResolution;
varying vec2 vUv;

// ── Hash / noise ──────────────────────────────────────
vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)),
           dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}
float hash1(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

// Quintic-interpolated gradient noise
float gnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f*f*f*(f*(f*6.0-15.0)+10.0);
  float a = dot(hash2(i+vec2(0,0)), f-vec2(0,0));
  float b = dot(hash2(i+vec2(1,0)), f-vec2(1,0));
  float c = dot(hash2(i+vec2(0,1)), f-vec2(0,1));
  float d = dot(hash2(i+vec2(1,1)), f-vec2(1,1));
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}

// 6-octave fBm with rotation (no axis artefacts)
const mat2 ROT = mat2(0.8, 0.6, -0.6, 0.8);
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 6; i++) {
    v += a * gnoise(p);
    p  = ROT * p * 2.07;
    a *= 0.48;
  }
  return v;
}

// Two-level domain warp — the source of organic structure
float warpedFbm(vec2 p, float t) {
  vec2 q = vec2(
    fbm(p                       + t * 0.07),
    fbm(p + vec2(5.2, 1.3)      + t * 0.05)
  );
  vec2 r = vec2(
    fbm(p + 4.0*q + vec2(1.7,9.2) + t * 0.04),
    fbm(p + 4.0*q + vec2(8.3,2.8) + t * 0.03)
  );
  return fbm(p + 3.5*r + t * 0.015);
}

// Procedural stars
float starLayer(vec2 uv, float scale, float threshold) {
  vec2 cell  = floor(uv * scale);
  vec2 local = fract(uv * scale) - 0.5;
  float h    = hash1(cell);
  if (h < threshold) return 0.0;
  vec2  jit  = hash2(cell) * 0.38;
  float d    = length(local - jit);
  float core = smoothstep(0.055, 0.0, d);
  float glow = exp(-d * 14.0) * 0.35;
  float twk  = 0.72 + 0.28 * sin(uTime * (2.0 + h * 5.0) + h * 6.28);
  return (core + glow) * twk * (0.45 + h * 0.9);
}

void main() {
  vec2 uv = vUv;
  float t  = uTime;

  // Slow cinematic drift — no scroll, purely time-based
  vec2 drift = vec2(
    sin(t * 0.028) * 0.05 + t * 0.004,
    cos(t * 0.021) * 0.04 + t * 0.0025
  );

  // ── 1.4 (was 2.2) → patterns fill more of the screen ──
  vec2 p = (uv - 0.5) * 1.4 + drift;

  float f  = warpedFbm(p, t);
  // Slower second layer for large-scale structure variation
  float f2 = warpedFbm(p * 0.5 + vec2(3.1, 7.4), t * 0.4);

  // ── Colour palette: black → deep red-magenta → hot pink → white ──
  vec3 col = vec3(0.0);

  // Layer 0 – very faint crimson base so black areas aren't empty
  col = mix(col,
    vec3(0.12, 0.01, 0.06),
    smoothstep(-0.15, 0.35, f));

  // Layer 1 – deep red-magenta body (more red than before)
  col = mix(col,
    vec3(0.70, 0.04, 0.18),
    smoothstep(0.15, 0.62, f));

  // Layer 2 – vivid hot pink
  col = mix(col,
    vec3(1.00, 0.22, 0.45),
    smoothstep(0.42, 0.78, f));

  // Layer 3 – bright pinkish-white luminous core
  col = mix(col,
    vec3(1.00, 0.80, 0.88),
    smoothstep(0.65, 0.93, f));

  // Large-scale structure overlay (adds volume / depth)
  col += vec3(0.28, 0.02, 0.10) * smoothstep(0.25, 0.80, f2) * 0.65;

  // ── Stars ─────────────────────────────────────────────
  float stars = 0.0;
  stars += starLayer(uv,  80.0, 0.940) * 1.30;
  stars += starLayer(uv, 190.0, 0.885) * 0.95;
  stars += starLayer(uv, 400.0, 0.820) * 0.60;

  // Stars slightly tinted pink against the nebula
  vec3 starCol = mix(vec3(1.0, 0.82, 0.90), vec3(1.0, 0.96, 0.98),
                     clamp(stars, 0.0, 1.0));
  col += starCol * stars;

  // Push the whole image warmer / more red
  col.r *= 1.12;
  col.g *= 0.88;
  col.b *= 0.90;

  // Filmic tonemapping — brighter overall (2.2 vs old 1.6)
  col = 1.0 - exp(-col * 2.2);

  // Gentle gamma lift
  col = pow(col, vec3(1.0 / 1.15));

  gl_FragColor = vec4(col, 1.0);
}
`

export default function GalaxyBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // powerPreference: 'high-performance' keeps the GPU clocked up so
    // it doesn't throttle during scroll-heavy moments.
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: 'high-performance',
    })
    // Cap at 1× DPR when the screen is >1080 p to keep shader cost low.
    const dpr = Math.min(window.devicePixelRatio, window.innerWidth > 1440 ? 1.0 : 1.5)
    renderer.setPixelRatio(dpr)
    renderer.setSize(window.innerWidth, window.innerHeight)

    const canvas = renderer.domElement
    // Force the WebGL canvas onto its own GPU compositing layer so the
    // browser can scroll/composite other layers without touching it.
    canvas.style.position = 'absolute'
    canvas.style.inset     = '0'
    canvas.style.willChange = 'transform'

    mount.appendChild(canvas)

    const scene    = new THREE.Scene()
    const camera   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const material = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        uTime:       { value: 0.0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
    })
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material))

    const t0 = performance.now()

    // setAnimationLoop is Three.js's built-in RAF wrapper;
    // it runs at display refresh rate and is immune to tab-hidden pausing.
    renderer.setAnimationLoop(() => {
      material.uniforms.uTime.value = (performance.now() - t0) * 0.001
      renderer.render(scene, camera)
    })

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      renderer.setAnimationLoop(null)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      mount.removeChild(canvas)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        // Promote to its own GPU layer — browser won't repaint this
        // during scroll, it only composites the pre-rendered texture.
        transform: 'translateZ(0)',
        willChange: 'transform',
        contain: 'strict',
      }}
    />
  )
}
