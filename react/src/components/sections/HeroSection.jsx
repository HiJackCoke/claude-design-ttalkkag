import { useRef, useState } from 'react'

export default function HeroSection() {
  const [btnState, setBtnState] = useState('idle')
  const [message, setMessage] = useState('// no handshake required — unsubscribe anytime')
  const [messageClass, setMessageClass] = useState('subscribe-msg')
  const inputRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = inputRef.current.value.trim()
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    if (!emailOk) {
      setMessageClass('subscribe-msg error')
      setMessage('// ERROR: handshake rejected — check callsign format')
      inputRef.current.focus()
      return
    }

    setBtnState('sending')
    setMessage('// opening channel…')
    setMessageClass('subscribe-msg')

    await new Promise(r => setTimeout(r, 700))
    setMessage('// encoding payload…')
    await new Promise(r => setTimeout(r, 600))
    setMessage('// awaiting ack…')
    await new Promise(r => setTimeout(r, 600))

    setBtnState('sent')
    setMessageClass('subscribe-msg success')
    setMessage(`// ack received — ${email} added to manifest #${String(Math.floor(Math.random()*9000)+1000)}`)
    inputRef.current.value = ''
    inputRef.current.disabled = true

    setTimeout(() => {
      setBtnState('idle')
      setMessage('// next transmission arrives in T-06:23:00:00')
      setMessageClass('subscribe-msg')
      inputRef.current.disabled = false
    }, 6000)
  }

  const scrollToForm = () => {
    inputRef.current?.focus()
    document.querySelector('#home').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero snap" id="home">
      <div className="hero-bg">
        <svg id="hero-ship" width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" style={{position:'absolute', inset:0, opacity:0.55}}>
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" className="schematic-grid-line"/>
            </pattern>
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(330, 85%, 58%)" stopOpacity="0.55"/>
              <stop offset="60%" stopColor="hsl(340, 70%, 32%)" stopOpacity="0.12"/>
              <stop offset="100%" stopColor="black" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <rect width="1200" height="800" fill="url(#grid)"/>

          <g className="schematic-stroke-thin">
            <path d="M40 40 L40 80 M40 40 L80 40"/>
            <path d="M1160 40 L1160 80 M1160 40 L1120 40"/>
            <path d="M40 760 L40 720 M40 760 L80 760"/>
            <path d="M1160 760 L1160 720 M1160 760 L1120 760"/>
          </g>
          <text x="48" y="58" className="schematic-label">SCHEMATIC / HM-04 / CLASSIFIED</text>
          <text x="1152" y="58" className="schematic-label" textAnchor="end">REV 2026.04</text>

          <g transform="translate(600,400)">
            <circle className="schematic-stroke-thin spin-slow" cx="0" cy="0" r="320" strokeDasharray="2 6"/>
            <circle className="schematic-stroke-thin spin-medium" cx="0" cy="0" r="240" strokeDasharray="4 4"/>
            <circle className="schematic-stroke-thin" cx="0" cy="0" r="170"/>
            <circle cx="0" cy="0" r="180" fill="url(#coreGlow)"/>

            <g>
              <rect className="schematic-fill" x="-80" y="-28" width="160" height="56" rx="6"/>
              <line className="schematic-stroke-thin" x1="-60" y1="-28" x2="-60" y2="28"/>
              <line className="schematic-stroke-thin" x1="-20" y1="-28" x2="-20" y2="28"/>
              <line className="schematic-stroke-thin" x1="20" y1="-28" x2="20" y2="28"/>
              <line className="schematic-stroke-thin" x1="60" y1="-28" x2="60" y2="28"/>
              <circle className="schematic-stroke" cx="0" cy="0" r="8"/>
              <circle cx="0" cy="0" r="3" fill="hsl(var(--accent))"/>

              <ellipse className="schematic-fill" cx="110" cy="0" rx="22" ry="32"/>
              <ellipse className="schematic-fill" cx="-110" cy="0" rx="22" ry="32"/>

              <line className="schematic-stroke" x1="80" y1="0" x2="138" y2="0"/>
              <line className="schematic-stroke" x1="-80" y1="0" x2="-138" y2="0"/>

              <g transform="translate(160,0)">
                <rect className="schematic-fill" x="0" y="-18" width="44" height="36" rx="4"/>
                <path className="schematic-accent" d="M44 -18 L70 -8 L70 8 L44 18"/>
                <circle cx="72" cy="0" r="3" className="schematic-accent-fill pulse-fade"/>
              </g>
              <g transform="translate(-160,0) scale(-1,1)">
                <rect className="schematic-fill" x="0" y="-18" width="44" height="36" rx="4"/>
                <path className="schematic-accent" d="M44 -18 L70 -8 L70 8 L44 18"/>
                <circle cx="72" cy="0" r="3" className="schematic-accent-fill pulse-fade"/>
              </g>

              <line className="schematic-stroke" x1="0" y1="-28" x2="0" y2="-80"/>
              <circle cx="0" cy="-86" r="4" className="schematic-stroke"/>
              <line className="schematic-stroke" x1="0" y1="28" x2="0" y2="70"/>
              <rect className="schematic-stroke" x="-36" y="70" width="72" height="10"/>
              <line className="schematic-stroke-thin" x1="-30" y1="70" x2="-30" y2="80"/>
              <line className="schematic-stroke-thin" x1="-18" y1="70" x2="-18" y2="80"/>
              <line className="schematic-stroke-thin" x1="-6" y1="70" x2="-6" y2="80"/>
              <line className="schematic-stroke-thin" x1="6" y1="70" x2="6" y2="80"/>
              <line className="schematic-stroke-thin" x1="18" y1="70" x2="18" y2="80"/>
              <line className="schematic-stroke-thin" x1="30" y1="70" x2="30" y2="80"/>
            </g>

            <g className="schematic-stroke-thin">
              <path d="M 232 -100 L 310 -140"/>
              <path d="M -232 100 L -310 160"/>
              <path d="M 0 -86 L 0 -180 L 60 -180"/>
            </g>
            <text x="316" y="-138" className="schematic-label schematic-label-fg">A. IR DRIVE / PORT</text>
            <text x="316" y="-126" className="schematic-label">1.2 GN · MAG CONF</text>
            <text x="-316" y="162" className="schematic-label schematic-label-fg" textAnchor="end">B. CRYO BAY 03</text>
            <text x="-316" y="174" className="schematic-label" textAnchor="end">SUBJECT: ONLINE</text>
            <text x="66" y="-178" className="schematic-label schematic-label-fg">C. PHASED ARRAY</text>
            <text x="66" y="-166" className="schematic-label">11.2 GHz ↔ DEEP FIELD</text>
          </g>

          <g transform="translate(60,120)">
            <rect className="schematic-fill" x="0" y="0" width="130" height="70" rx="3"/>
            <text x="8" y="14" className="schematic-label schematic-label-fg">LIFE SUPPORT</text>
            <line className="schematic-stroke-thin" x1="8" y1="26" x2="122" y2="26"/>
            <text x="8" y="42" className="schematic-label">O₂     102.4 KPA</text>
            <text x="8" y="54" className="schematic-label">CO₂    0.04%</text>
            <text x="8" y="66" className="schematic-label">TEMP   21.3°C</text>
          </g>

          <g transform="translate(1010,120)">
            <rect className="schematic-fill" x="0" y="0" width="130" height="70" rx="3"/>
            <text x="8" y="14" className="schematic-label schematic-label-fg">NAVIGATION</text>
            <line className="schematic-stroke-thin" x1="8" y1="26" x2="122" y2="26"/>
            <text x="8" y="42" className="schematic-label">DEST  τ CETI</text>
            <text x="8" y="54" className="schematic-label">DIST  11.91 LY</text>
            <text x="8" y="66" className="schematic-label">Δv    0.93 c</text>
          </g>

          <g transform="translate(60,620)">
            <rect className="schematic-fill" x="0" y="0" width="140" height="60" rx="3"/>
            <text x="8" y="14" className="schematic-label schematic-label-fg">PAYLOAD</text>
            <line className="schematic-stroke-thin" x1="8" y1="26" x2="132" y2="26"/>
            <text x="8" y="42" className="schematic-label">01 / HUMAN · AWAKE</text>
            <text x="8" y="54" className="schematic-label">02 / UNKNOWN · FRIEND</text>
          </g>

          <g transform="translate(1000,620)">
            <rect className="schematic-fill" x="0" y="0" width="140" height="60" rx="3"/>
            <text x="8" y="14" className="schematic-label schematic-label-fg">TRANSMISSION</text>
            <line className="schematic-stroke-thin" x1="8" y1="26" x2="132" y2="26"/>
            <text x="8" y="42" className="schematic-label">STATUS: ENCODING</text>
            <text x="8" y="54" className="schematic-label">NEXT WAVE: 00:00:37</text>
          </g>

          <g transform="translate(0,740)" className="schematic-stroke-thin" stroke="hsl(var(--accent) / 0.8)">
            <path id="wave" d="M0 20 Q 20 0, 40 20 T 80 20 T 120 20 T 160 20 T 200 20 T 240 20 T 280 20 T 320 20 T 360 20 T 400 20 T 440 20 T 480 20 T 520 20 T 560 20 T 600 20 T 640 20 T 680 20 T 720 20 T 760 20 T 800 20 T 840 20 T 880 20 T 920 20 T 960 20 T 1000 20 T 1040 20 T 1080 20 T 1120 20 T 1160 20 T 1200 20"/>
          </g>
        </svg>
      </div>

      <div className="hero-content">
        <div className="hero-pill">
          <div className="avatars">
            <div className="avatar a1">H</div>
            <div className="avatar a2">⚘</div>
            <div className="avatar a3">R</div>
          </div>
          <span>7,000+ crew already onboard</span>
        </div>

        <h1 className="hero-title">
          Signals from the <span className="serif-italic">edge</span>
        </h1>
        <p className="hero-sub">
          A dispatch for people who stay up late watching the sky. Weekly transmissions on science, technology, and the long and lonely work of thinking carefully.
        </p>

        <form onSubmit={handleSubmit} className="subscribe liquid-glass" noValidate>
          <input
            ref={inputRef}
            type="email"
            name="email"
            placeholder="your@callsign.net"
            autoComplete="email"
            required
          />
          <button
            type="submit"
            className={btnState === 'sent' ? 'sent' : btnState === 'sending' ? 'sending' : ''}
          >
            {btnState === 'sending' ? 'TRANSMITTING' : btnState === 'sent' ? '✓ ONBOARD' : 'SUBSCRIBE'}
          </button>
        </form>
        <div className={messageClass}>{message}</div>
      </div>
    </section>
  )
}
