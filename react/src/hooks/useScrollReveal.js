import { useEffect } from 'react'

export default function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      }
    }, { rootMargin: '-80px 0px' })

    document.querySelectorAll('.fade-up, .reveal-blur, .reveal-scan, .reveal-draw, .reveal-stagger')
      .forEach(el => io.observe(el))

    return () => io.disconnect()
  }, [])
}
