import { useEffect } from 'react'

export function useScrollAmbience() {
  useEffect(() => {
    let frame = 0
    const update = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        const range = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
        const progress = Math.min(window.scrollY / range, 1)
        document.documentElement.style.setProperty('--landing-shift', `${(progress - 0.5) * 90}px`)
        frame = 0
      })
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', update)
      if (frame) window.cancelAnimationFrame(frame)
      document.documentElement.style.removeProperty('--landing-shift')
    }
  }, [])
}
