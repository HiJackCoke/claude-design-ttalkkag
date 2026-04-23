import { useRef, useEffect } from 'react'

export default function Navbar() {
  const navRef = useRef(null)

  useEffect(() => {
    // Direct DOM class toggle — zero React re-renders on scroll
    const handleScroll = () => {
      navRef.current?.classList.toggle('scrolled', window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e) => {
    const href = e.currentTarget.getAttribute('href')
    if (href && href.startsWith('#')) {
      e.preventDefault()
      const el = document.getElementById(href.slice(1))
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav ref={navRef} className="navbar" id="navbar">
      <div className="nav-logo">
        <div className="concentric"><span className="pulse"></span></div>
        <span>Mindloop</span>
      </div>
      <div className="nav-links">
        <a href="#home" onClick={handleNavClick}>Home</a><span className="nav-dot">●</span>
        <a href="#signal" onClick={handleNavClick}>How It Works</a><span className="nav-dot">●</span>
        <a href="#mission" onClick={handleNavClick}>Philosophy</a><span className="nav-dot">●</span>
        <a href="#solution" onClick={handleNavClick}>Use Cases</a>
      </div>
      <div className="nav-right">
        <a className="icon-btn liquid-glass" href="#" aria-label="Instagram">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
        </a>
        <a className="icon-btn liquid-glass" href="#" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/></svg>
        </a>
        <a className="icon-btn liquid-glass" href="#" aria-label="Twitter">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4l7.5 10L4.5 20h2.5l6-6.5L18 20h2l-7.8-10.5L19.5 4H17l-5.5 6L7 4H4z" fill="currentColor" stroke="none"/></svg>
        </a>
      </div>
    </nav>
  )
}
