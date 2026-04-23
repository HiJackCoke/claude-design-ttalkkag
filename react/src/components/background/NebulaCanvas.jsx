import { useEffect, useRef } from 'react'

export default function NebulaCanvas() {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let W = 0, H = 0
    const DPR = Math.min(window.devicePixelRatio || 1, 1.5)
    const t0 = performance.now()

    // Each cloud has fully independent, randomized parameters so motion is
    // never periodic or symmetric
    const clouds = Array.from({ length: 10 }, (_, i) => ({
      // starting normalised position (0–1)
      nx: Math.random(),
      ny: Math.random(),
      // independent drift speeds (very slow, different per axis/cloud)
      vx: (Math.random() - 0.5) * 0.000018,
      vy: (Math.random() - 0.5) * 0.000012,
      // independent wander frequencies
      wx1: 0.00007 + Math.random() * 0.00009,
      wy1: 0.00005 + Math.random() * 0.00008,
      wx2: 0.00012 + Math.random() * 0.00015,
      wy2: 0.00009 + Math.random() * 0.00013,
      // wander amplitudes (fraction of screen)
      ax: 0.05 + Math.random() * 0.12,
      ay: 0.04 + Math.random() * 0.10,
      // phase offsets so all 10 clouds are out of sync
      px: Math.random() * Math.PI * 2,
      py: Math.random() * Math.PI * 2,
      // radius as fraction of the smaller dimension
      r: 0.22 + Math.random() * 0.32,
      // colour
      hue: 310 + Math.random() * 40,
      hueSpeed: (Math.random() - 0.5) * 0.00006,
      // opacity / brightness
      alpha: 0.35 + Math.random() * 0.35,
      alphaSpeed: (Math.random() - 0.5) * 0.00008,
    }))

    const resize = () => {
      W = canvas.width  = window.innerWidth  * DPR
      H = canvas.height = window.innerHeight * DPR
      canvas.style.width  = window.innerWidth  + 'px'
      canvas.style.height = window.innerHeight + 'px'
    }

    const tick = (now) => {
      const t = now - t0

      // Soft fade so old frames blur out gradually — this produces the
      // smeared "aurora trail" without leaving ghost lines
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = 'rgba(0,0,0,0.04)'
      ctx.fillRect(0, 0, W, H)

      ctx.globalCompositeOperation = 'screen'
      const minDim = Math.min(W, H)

      for (const c of clouds) {
        // Drift (slow linear movement that wraps)
        const baseX = ((c.nx + c.vx * t) % 1 + 1) % 1
        const baseY = ((c.ny + c.vy * t) % 1 + 1) % 1

        // Two independent wanders layered — prevents any periodic look
        const cx = (baseX + Math.sin(t * c.wx1 + c.px) * c.ax
                           + Math.cos(t * c.wx2 + c.px * 1.7) * c.ax * 0.4) * W
        const cy = (baseY + Math.sin(t * c.wy1 + c.py) * c.ay
                           + Math.cos(t * c.wy2 + c.py * 2.1) * c.ay * 0.4) * H

        // Slowly drifting hue & alpha (clamped to stay vivid)
        const hue   = c.hue  + Math.sin(t * c.hueSpeed)   * 18
        const alpha = Math.max(0.15, Math.min(0.85,
          c.alpha + Math.sin(t * c.alphaSpeed) * 0.18))

        // Pulsing radius
        const r = c.r * minDim * (0.88 + 0.12 * Math.sin(t * 0.00011 + c.px))

        // Radial gradient — bright core, soft edge
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        g.addColorStop(0.00, `hsla(${hue},      90%, 72%, ${alpha})`)
        g.addColorStop(0.25, `hsla(${hue + 12}, 85%, 55%, ${alpha * 0.65})`)
        g.addColorStop(0.60, `hsla(${hue - 8},  80%, 38%, ${alpha * 0.28})`)
        g.addColorStop(1.00, `hsla(${hue},      75%, 20%, 0)`)

        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalCompositeOperation = 'source-over'
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('resize', resize)
    resize()
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="nebula" />
}
