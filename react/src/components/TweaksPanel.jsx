import { useEffect, useState, useRef } from 'react'

export default function TweaksPanel() {
  const [open, setOpen] = useState(false)
  const [density, setDensity] = useState(1)
  const [vignette, setVignette] = useState(0.75)

  useEffect(() => {
    const handleMessage = (e) => {
      const d = e.data || {}
      if (d.type === '__activate_edit_mode') setOpen(true)
      if (d.type === '__deactivate_edit_mode') setOpen(false)
    }

    window.addEventListener('message', handleMessage)
    window.parent.postMessage({ type: '__edit_mode_available' }, '*')

    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const handleDensityChange = (v) => {
    setDensity(v)
    document.documentElement.style.setProperty('--starfield-density', v)
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { starfieldDensity: v } }, '*')
  }

  const handleVignetteChange = (v) => {
    setVignette(v)
    document.documentElement.style.setProperty('--vignette-intensity', v)
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { vignetteIntensity: v } }, '*')
  }

  if (!open) return null

  return (
    <div className="tweaks open" id="tweaks">
      <h5>TWEAKS / LIVE</h5>
      <div className="tweak-row">
        <label>Starfield density <span className="tweak-val">{density.toFixed(2)}</span></label>
        <input
          type="range"
          min="0"
          max="2.5"
          step="0.05"
          value={density}
          onChange={(e) => handleDensityChange(parseFloat(e.target.value))}
        />
      </div>
      <div className="tweak-row">
        <label>Vignette intensity <span className="tweak-val">{vignette.toFixed(2)}</span></label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={vignette}
          onChange={(e) => handleVignetteChange(parseFloat(e.target.value))}
        />
      </div>
      <div className="tweak-row" style={{ marginBottom: 0, fontSize: '9px', opacity: 0.6, lineHeight: 1.4 }}>
        Adjust in-flight parameters. Values persist on save.
      </div>
    </div>
  )
}
