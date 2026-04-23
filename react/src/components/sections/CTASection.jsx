export default function CTASection() {
  const scrollToForm = () => {
    document.querySelector('input[type="email"]')?.focus()
    document.querySelector('#home').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="cta-section snap">
      <div className="cta-bg"></div>
      <div className="cta-inner">
        <div style={{display:'flex', justifyContent:'center'}}>
          <div className="concentric lg"><span className="pulse"></span></div>
        </div>
        <h2>Begin your <span className="serif-italic">transmission.</span></h2>
        <p>One careful dispatch a week. No retweets, no reply guys — just the kind of reading that used to make the afternoon disappear.</p>
        <div className="cta-buttons">
          <button className="btn-primary" onClick={scrollToForm}>Subscribe Now</button>
          <button className="btn-ghost liquid-glass" style={{borderRadius:'10px'}}>Start Writing</button>
        </div>
      </div>
    </section>
  )
}
