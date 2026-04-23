export default function SolutionSection() {
  return (
    <section className="solution-section snap" id="solution">
      <div className="container">
        <div className="solution-header fade-up reveal-blur">
          <span className="section-label">02 · PAYLOAD</span>
          <h2 className="sec-title">The instrument for <span className="serif-italic">meaningful</span> content.</h2>
        </div>

        <div className="solution-schematic fade-up reveal-scan reveal-draw">
          <svg viewBox="0 0 1200 400" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" className="schematic-grid-line"/>
              </pattern>
            </defs>
            <rect width="1200" height="400" fill="url(#grid)"/>

            <g transform="translate(600,200)">
              <path className="schematic-fill" d="M -500 -40 Q -520 0 -500 40 L 460 40 L 500 20 L 500 -20 L 460 -40 Z"/>

              <g className="schematic-stroke-thin">
                <line x1="-400" y1="-40" x2="-400" y2="40"/>
                <line x1="-280" y1="-40" x2="-280" y2="40"/>
                <line x1="-140" y1="-40" x2="-140" y2="40"/>
                <line x1="0" y1="-40" x2="0" y2="40"/>
                <line x1="140" y1="-40" x2="140" y2="40"/>
                <line x1="280" y1="-40" x2="280" y2="40"/>
                <line x1="380" y1="-40" x2="380" y2="40"/>
              </g>

              <circle className="schematic-stroke" cx="-440" cy="0" r="22" fill="hsl(var(--card))"/>
              <circle cx="-440" cy="0" r="4" className="schematic-accent-fill"/>

              <g transform="translate(500,0)">
                <path className="schematic-accent" d="M0 -20 L 60 -10 L 60 10 L 0 20"/>
                <path className="schematic-accent" d="M 20 -16 L 48 -8 L 48 8 L 20 16" strokeWidth="0.5"/>
                <circle cx="66" cy="0" r="3" className="schematic-accent-fill pulse-fade"/>
              </g>

              <circle className="schematic-stroke" cx="0" cy="0" r="28" fill="hsl(var(--background))"/>
              <line className="schematic-stroke-thin" x1="-28" y1="0" x2="28" y2="0"/>
              <line className="schematic-stroke-thin" x1="0" y1="-28" x2="0" y2="28"/>

              <line className="schematic-stroke" x1="0" y1="-40" x2="0" y2="-100"/>
              <path className="schematic-stroke" d="M -20 -100 L 20 -100 M -12 -110 L 12 -110"/>

              <rect className="schematic-stroke" x="-80" y="50" width="160" height="10"/>
              <g className="schematic-stroke-thin">
                <line x1="-72" y1="50" x2="-72" y2="60"/>
                <line x1="-54" y1="50" x2="-54" y2="60"/>
                <line x1="-36" y1="50" x2="-36" y2="60"/>
                <line x1="-18" y1="50" x2="-18" y2="60"/>
                <line x1="0" y1="50" x2="0" y2="60"/>
                <line x1="18" y1="50" x2="18" y2="60"/>
                <line x1="36" y1="50" x2="36" y2="60"/>
                <line x1="54" y1="50" x2="54" y2="60"/>
                <line x1="72" y1="50" x2="72" y2="60"/>
              </g>
            </g>

            <g className="schematic-stroke-thin">
              <path d="M 200 200 L 200 330"/>
              <path d="M 460 200 L 460 330"/>
              <path d="M 740 200 L 740 70"/>
              <path d="M 1000 200 L 1000 70"/>
            </g>
            <text x="200" y="346" textAnchor="middle" className="schematic-label schematic-label-fg">A · FEED</text>
            <text x="460" y="346" textAnchor="middle" className="schematic-label schematic-label-fg">B · COMPOSE</text>
            <text x="740" y="58" textAnchor="middle" className="schematic-label schematic-label-fg">C · COMMUNITY</text>
            <text x="1000" y="58" textAnchor="middle" className="schematic-label schematic-label-fg">D · BROADCAST</text>

            <g transform="translate(40,40)">
              <text className="schematic-label schematic-label-fg" y="10">SEC. / LONGITUDINAL CROSS-SECTION</text>
              <text className="schematic-label" y="26">SCALE 1:240 · UNITS: m</text>
            </g>
            <g transform="translate(1160,40)" textAnchor="end">
              <text className="schematic-label schematic-label-fg" y="10">FIG. iii</text>
              <text className="schematic-label" y="26">SHEET 3 OF 12</text>
            </g>
          </svg>
        </div>

        <div className="feature-grid fade-up reveal-stagger">
          <div className="feature">
            <div className="feature-num">A / 01</div>
            <h4>Curated feed</h4>
            <p>Signal over volume. A feed tuned to your interests, not your impulses — ranked by depth, not dwell time.</p>
          </div>
          <div className="feature">
            <div className="feature-num">B / 02</div>
            <h4>Writer instruments</h4>
            <p>A clean bridge for long-form thought. Drafts, series, analytics — without the clatter of social tools.</p>
          </div>
          <div className="feature">
            <div className="feature-num">C / 03</div>
            <h4>Crew channel</h4>
            <p>Comments that feel like office hours. Writers and readers in a room instead of a scoreboard.</p>
          </div>
          <div className="feature">
            <div className="feature-num">D / 04</div>
            <h4>Long-range broadcast</h4>
            <p>Email, RSS, native apps. Your transmission reaches anyone paying attention, anywhere in the dark.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
