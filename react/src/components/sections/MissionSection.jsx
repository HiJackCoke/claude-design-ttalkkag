import { useRef, useCallback, useEffect, useState } from 'react'
import useMissionReveal from '../../hooks/useMissionReveal'

export default function MissionSection() {
  const p1Ref = useRef(null)
  const p2Ref = useRef(null)
  const p1WordEls = useRef([])
  const p2WordEls = useRef([])
  const [isReady, setIsReady] = useState(false)

  const parseWords = (text) => {
    const parts = text.split(' ')
    return parts.map((w) => {
      if (w.startsWith('|') && w.endsWith('|')) {
        return { text: w.slice(1, -1), accent: true }
      }
      return { text: w, accent: false }
    })
  }

  const p1Words = parseWords('We\'re building a space where |curiosity| |meets| |clarity| — where readers find depth, writers find reach, and every newsletter becomes a conversation worth having.')
  const p2Words = parseWords('A transmission where content, community, and insight travel together — with less noise, less drift, and more meaning for everyone still listening.')

  useEffect(() => {
    // Ensure refs are populated before starting the hook
    const timer = setTimeout(() => setIsReady(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useMissionReveal(isReady ? [
    { el: p1Ref.current, wordEls: p1WordEls.current },
    { el: p2Ref.current, wordEls: p2WordEls.current },
  ] : [])

  return (
    <section className="mission-section snap" id="mission">
      <div className="container">
        <div className="mission-schematic fade-up reveal-draw">
          <svg viewBox="0 0 600 600" width="100%" height="100%">
            <defs>
              <radialGradient id="core2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(330, 85%, 58%)" stopOpacity="0.5"/>
                <stop offset="50%" stopColor="hsl(340, 70%, 35%)" stopOpacity="0.12"/>
                <stop offset="100%" stopColor="black" stopOpacity="0"/>
              </radialGradient>
            </defs>

            <circle className="schematic-stroke-thin spin-slow" cx="300" cy="300" r="270" strokeDasharray="2 6"/>
            <circle className="schematic-stroke-thin" cx="300" cy="300" r="220" strokeDasharray="4 8"/>
            <circle className="schematic-stroke-thin spin-medium" cx="300" cy="300" r="170" strokeDasharray="1 3"/>

            <g className="spin-slow" style={{transformOrigin: '300px 300px'}}>
              <circle cx="570" cy="300" r="5" className="schematic-stroke" fill="hsl(var(--card))"/>
            </g>
            <g className="spin-medium" style={{transformOrigin: '300px 300px'}}>
              <circle cx="470" cy="300" r="3" className="schematic-accent-fill"/>
            </g>

            <circle cx="300" cy="300" r="180" fill="url(#core2)"/>
            <circle className="schematic-stroke" cx="300" cy="300" r="90" fill="hsl(var(--background))"/>
            <circle className="schematic-stroke-thin" cx="300" cy="300" r="70"/>
            <circle className="schematic-stroke-thin" cx="300" cy="300" r="50"/>

            <g stroke="hsl(var(--foreground) / 0.5)" strokeWidth="0.75">
              <line x1="210" y1="300" x2="390" y2="300"/>
              <line x1="300" y1="210" x2="300" y2="390"/>
              <line x1="240" y1="240" x2="360" y2="360"/>
              <line x1="240" y1="360" x2="360" y2="240"/>
            </g>
            <circle cx="300" cy="300" r="6" className="schematic-accent-fill pulse-fade"/>

            <g className="schematic-stroke-thin">
              <line x1="300" y1="30" x2="300" y2="42"/>
              <line x1="300" y1="558" x2="300" y2="570"/>
              <line x1="30" y1="300" x2="42" y2="300"/>
              <line x1="558" y1="300" x2="570" y2="300"/>
            </g>
            <text x="300" y="22" textAnchor="middle" className="schematic-label">N</text>
            <text x="300" y="586" textAnchor="middle" className="schematic-label">S</text>
            <text x="20" y="304" textAnchor="end" className="schematic-label">W</text>
            <text x="580" y="304" className="schematic-label">E</text>

            <text x="300" y="408" textAnchor="middle" className="schematic-label schematic-label-fg">FIG. ii — CURIOSITY, CORE ASSEMBLY</text>
          </svg>
        </div>

        <div className="mission-copy">
          <p className="mission-para" ref={p1Ref}>
            {p1Words.map((w, i) => (
              <span key={i}>
                <span
                  className={`mission-word ${w.accent ? 'accent' : ''}`}
                  ref={(el) => { if (el) p1WordEls.current[i] = el }}
                >
                  {w.text}
                </span>
                {i < p1Words.length - 1 && ' '}
              </span>
            ))}
          </p>
          <p className="mission-para small" ref={p2Ref}>
            {p2Words.map((w, i) => (
              <span key={i}>
                <span
                  className={`mission-word ${w.accent ? 'accent' : ''}`}
                  ref={(el) => { if (el) p2WordEls.current[i] = el }}
                >
                  {w.text}
                </span>
                {i < p2Words.length - 1 && ' '}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}
