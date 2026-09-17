// Adapted from Kokonut UI Beams Background (Dorian Baffier), MIT.
// Source: https://github.com/kokonut-labs/kokonutui
// Full license: public/licenses/kokonut-ui.txt
import { useEffect, useRef } from 'react'

export default function ForestBeams() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!ctx) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0, last = 0, time = 0, width = 0, height = 0
    const beams = Array.from({ length: 8 }, (_, i) => ({
      x: (i + .5) / 8, phase: i * 1.7,
      color: i % 3 === 0 ? '123,151,106' : '233,182,104',
      width: 24 + (i % 3) * 22,
    }))
    function draw() {
      ctx.clearRect(0, 0, width, height)
      for (const beam of beams) {
        const drift = Math.sin(time * .24 + beam.phase)
        ctx.save()
        ctx.translate(beam.x * width + drift * 85, height * .45)
        ctx.rotate(-.42 + Math.sin(time * .13 + beam.phase) * .045)
        const opacity = .12 + .09 * (.5 + .5 * Math.sin(time * .65 + beam.phase))
        const gradient = ctx.createLinearGradient(-beam.width, 0, beam.width, 0)
        gradient.addColorStop(0, `rgba(${beam.color},0)`)
        gradient.addColorStop(.5, `rgba(${beam.color},${opacity})`)
        gradient.addColorStop(1, `rgba(${beam.color},0)`)
        ctx.fillStyle = gradient
        ctx.fillRect(-beam.width, -height, beam.width * 2, height * 2)
        ctx.restore()
      }
    }
    function tick(now) {
      if (now - last >= 32) {
        time += last ? Math.min((now - last) / 1000, .1) : 0
        last = now
        draw()
      }
      frame = requestAnimationFrame(tick)
    }
    function start() {
      cancelAnimationFrame(frame)
      last = 0
      draw()
      if (!reduced.matches && !document.hidden) frame = requestAnimationFrame(tick)
    }
    function resize() {
      width = innerWidth; height = innerHeight
      const dpr = Math.min(devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      start()
    }
    resize()
    addEventListener('resize', resize)
    reduced.addEventListener('change', start)
    document.addEventListener('visibilitychange', start)
    return () => {
      cancelAnimationFrame(frame)
      removeEventListener('resize', resize)
      reduced.removeEventListener('change', start)
      document.removeEventListener('visibilitychange', start)
    }
  }, [])
  return <canvas ref={ref} className="forest-beams" aria-hidden="true" />
}
