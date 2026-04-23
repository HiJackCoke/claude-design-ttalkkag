import { useEffect, useState } from 'react'

export default function HUD() {
  const [clock, setClock] = useState('T+00:00:00')

  useEffect(() => {
    const start = Date.now()
    const pad = (n) => String(n).padStart(2, '0')

    const tick = () => {
      const t = Math.floor((Date.now() - start) / 1000)
      const h = Math.floor(t / 3600)
      const m = Math.floor((t % 3600) / 60)
      const s = t % 60
      setClock(`T+${pad(h)}:${pad(m)}:${pad(s)}`)
      requestAnimationFrame(tick)
    }
    const raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      <div className="hud-left">MINDLOOP / TRANSMISSION 047 / EST. 2026</div>
      <div className="hud-right">
        <div>LAT 37.774° / LON -122.419°</div>
        <div>SIG <span className="blink">●</span> LIVE</div>
        <div id="hud-clock">{clock}</div>
      </div>
    </>
  )
}
