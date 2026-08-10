import { useEffect, useRef } from 'react'

/* Replaces framer-motion, which was ~40KB gzipped of physics-grade animation
   library used for exactly one effect: fading paragraphs in as they scroll
   into view.
 *
 * Respects prefers-reduced-motion by showing the content immediately rather
 * than animating it, and disconnects after the first reveal — these are
 * once-only entrances, so there's no reason to keep observing. */
export function useReveal({ delay = 0 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-in')
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        el.style.transitionDelay = `${delay}ms`
        el.classList.add('is-in')
      },
      { rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  return ref
}
