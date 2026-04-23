import { useEffect, useRef } from 'react'

export default function StarfieldCanvas({ density = 1 }) {
  const canvasRef = useRef(null)
  const starsRef = useRef([])
  const clusterRef = useRef([])
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let W = 0, H = 0, DPR = Math.min(window.devicePixelRatio || 1, 1.5)

    const resize = () => {
      W = canvas.width = window.innerWidth * DPR
      H = canvas.height = window.innerHeight * DPR
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      regen()
    }

    const regen = () => {
      const baseCount = Math.floor((W * H) / (12000 * DPR))
      const count = Math.floor(baseCount * density)

      // Create stars with clustering around bright points
      starsRef.current = []
      clusterRef.current = []

      // Generate 5-7 bright star clusters
      const clusterCount = 5 + Math.floor(Math.random() * 3)
      for (let c = 0; c < clusterCount; c++) {
        clusterRef.current.push({
          x: Math.random() * W,
          y: Math.random() * H,
          intensity: 0.6 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2,
          speed: 0.0001 + Math.random() * 0.0002,
        })
      }

      // Create stars around clusters and random
      for (let i = 0; i < count; i++) {
        let x, y, type

        if (Math.random() < 0.6 && clusterRef.current.length > 0) {
          // Star in cluster
          const cluster = clusterRef.current[Math.floor(Math.random() * clusterRef.current.length)]
          const angle = Math.random() * Math.PI * 2
          const dist = Math.random() * 200 * DPR
          x = cluster.x + Math.cos(angle) * dist
          y = cluster.y + Math.sin(angle) * dist
          type = Math.random() < 0.5 ? 'bright' : Math.random() < 0.7 ? 'normal' : 'dim'
        } else {
          // Random star
          x = Math.random() * W
          y = Math.random() * H
          type = Math.random() < 0.15 ? 'bright' : Math.random() < 0.65 ? 'normal' : 'dim'
        }

        starsRef.current.push({
          x,
          y,
          z: Math.random() * 0.9 + 0.1,
          tw: Math.random() * Math.PI * 2,
          tws: 0.002 + Math.random() * 0.008,
          type,
        })
      }
    }

    const tick = () => {
      ctx.clearRect(0, 0, W, H)
      const stars = starsRef.current

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        s.tw += s.tws
        const tw = 0.5 + 0.5 * Math.sin(s.tw)
        const y = s.y
        const yy = y

        if (s.type === 'bright') {
          // Bright stars: strong pink glow
          const r = s.z * 2.5 * DPR
          ctx.fillStyle = `rgba(255, 240, 255, ${0.85 + 0.15 * tw})`
          ctx.shadowColor = 'rgba(255, 140, 200, 0.9)'
          ctx.shadowBlur = 14 * DPR
          ctx.beginPath()
          ctx.arc(s.x, yy, r, 0, Math.PI * 2)
          ctx.fill()
        } else if (s.type === 'normal') {
          // Normal stars: medium pink glow
          const r = s.z * 1.8 * DPR
          ctx.fillStyle = `rgba(255, 200, 230, ${0.7 + 0.3 * tw * s.z})`
          ctx.shadowColor = 'rgba(255, 130, 190, 0.7)'
          ctx.shadowBlur = 8 * DPR
          ctx.beginPath()
          ctx.arc(s.x, yy, r, 0, Math.PI * 2)
          ctx.fill()
        } else {
          // Dim stars: subtle points
          const r = s.z * 0.9 * DPR
          ctx.fillStyle = `rgba(255, 190, 225, ${0.4 + 0.4 * tw * s.z})`
          ctx.shadowBlur = 0
          ctx.beginPath()
          ctx.arc(s.x, yy, r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.shadowBlur = 0
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('resize', resize)
    resize()
    tick()

    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [density])

  return <canvas ref={canvasRef} className="starfield" />
}
