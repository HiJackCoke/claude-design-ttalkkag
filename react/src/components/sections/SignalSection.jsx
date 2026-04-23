export default function SignalSection() {
  return (
    <section className="signal-section snap" id="signal">
      <div className="container">
        <div className="fade-up"><span className="section-label">01 · TRANSMISSION</span></div>
        <h2 className="sec-title fade-up reveal-blur" style={{marginTop:'24px'}}>
          The signal has <span className="serif-italic">changed.</span><br/>Have you?
        </h2>
        <p className="signal-sub fade-up">
          Readers no longer scroll for answers — they ask machines. The machines answer with confidence they haven't earned. If the record isn't written carefully, someone else writes it for us.
        </p>

        <div className="signal-grid">
          <div className="signal-card fade-up reveal-blur">
            <div className="signal-icon">
              <svg width="140" height="140" viewBox="0 0 140 140">
                <circle className="schematic-stroke-thin" cx="70" cy="70" r="62"/>
                <circle className="schematic-stroke-thin" cx="70" cy="70" r="46"/>
                <g className="schematic-stroke">
                  <circle cx="70" cy="70" r="28" fill="hsl(var(--card))"/>
                  <path d="M55 60 Q 70 45, 85 60 M55 70 Q 70 55, 85 70 M55 80 Q 70 65, 85 80"/>
                </g>
                <circle cx="70" cy="70" r="3" className="schematic-accent-fill"/>
                <text x="70" y="128" textAnchor="middle" className="schematic-label schematic-label-fg">LLM-01 / GPT CLASS</text>
              </svg>
            </div>
            <h3>Probabilistic oracles</h3>
            <p>Fluent, confident, occasionally wrong. They quote the room, not the source.</p>
          </div>

          <div className="signal-card fade-up reveal-blur" style={{transitionDelay:'.12s'}}>
            <div className="signal-icon">
              <svg width="140" height="140" viewBox="0 0 140 140">
                <circle className="schematic-stroke-thin" cx="70" cy="70" r="62" strokeDasharray="3 3"/>
                <g transform="translate(70 70)">
                  <circle className="schematic-stroke" r="28" fill="hsl(var(--card))"/>
                  <g stroke="hsl(var(--foreground) / 0.85)" strokeWidth="1" fill="none">
                    <line x1="-16" y1="-8" x2="16" y2="-8"/>
                    <line x1="-16" y1="0" x2="10" y2="0"/>
                    <line x1="-16" y1="8" x2="14" y2="8"/>
                  </g>
                  <circle r="4" className="schematic-accent-fill" cx="22" cy="-16"/>
                </g>
                <text x="70" y="128" textAnchor="middle" className="schematic-label schematic-label-fg">SEARCH / HYBRID</text>
              </svg>
            </div>
            <h3>Synthetic abstracts</h3>
            <p>Answers with citations that sometimes exist. Speed replaces scrutiny.</p>
          </div>

          <div className="signal-card fade-up reveal-blur" style={{transitionDelay:'.24s'}}>
            <div className="signal-icon">
              <svg width="140" height="140" viewBox="0 0 140 140">
                <g transform="translate(70 70)">
                  <path className="schematic-stroke" d="M0 -48 L 6 -6 L 48 0 L 6 6 L 0 48 L -6 6 L -48 0 L -6 -6 Z" fill="hsl(var(--card))"/>
                  <circle className="schematic-stroke-thin" r="58" strokeDasharray="1 3"/>
                  <circle r="3" className="schematic-accent-fill"/>
                </g>
                <text x="70" y="128" textAnchor="middle" className="schematic-label schematic-label-fg">INDEX / CRAWLER</text>
              </svg>
            </div>
            <h3>Indexed archives</h3>
            <p>The old guard. Ranked by links, tuned for ads, losing ground to the oracles.</p>
          </div>
        </div>

        <p className="signal-tagline fade-up">If we don't answer the questions, someone else will.</p>
      </div>
    </section>
  )
}
