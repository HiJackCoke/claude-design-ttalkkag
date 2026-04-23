import { useEffect, useRef } from 'react'

export default function useMissionReveal(refs) {
  const rafRef = useRef(null)

  useEffect(() => {
    const update = () => {
      refs.forEach(({ el, wordEls }) => {
        if (!el || !wordEls || wordEls.length === 0) return

        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        const start = vh * 0.82
        const end = vh * 0.25
        const top = rect.top
        const bottom = rect.bottom
        const totalH = bottom - top
        const traveled = start - top
        const total = start - end + totalH * 0.4
        const progress = Math.max(0, Math.min(1, traveled / total))

        const n = wordEls.length
        const active = Math.floor(progress * n * 1.1)
        wordEls.forEach((w, i) => {
          if (w) {
            w.classList.toggle('lit', i < active)
            w.classList.toggle('dim', i >= active)
          }
        })
      })

      rafRef.current = requestAnimationFrame(update)
    }

    const handleScroll = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [refs])
}
