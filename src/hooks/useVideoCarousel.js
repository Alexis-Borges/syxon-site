import { useEffect, useRef, useState } from 'react'

// Durée du fondu enchaîné, en secondes (doit correspondre à la transition CSS de .videoActive)
export const FADE = 0.8

// Carrousel vidéo sans passage par le noir :
// - chaque vidéo est jouée en entier, le fondu démarre juste avant sa fin ;
// - la vidéo sortante reste visible (opacité 1, en dessous) pendant que
//   l'entrante apparaît par-dessus.
export default function useVideoCarousel(count) {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState(null)
  const videoRefs = useRef([])
  const advancedRef = useRef(false)
  const fadeTimer = useRef(null)

  const goTo = (idx) => {
    if (idx === current) return
    advancedRef.current = true
    setPrev(current)
    setCurrent(idx)
  }

  const next = () => {
    if (advancedRef.current) return
    goTo((current + 1) % count)
  }

  useEffect(() => {
    advancedRef.current = false
    const v = videoRefs.current[current]
    if (v) {
      try {
        v.currentTime = 0
        const p = v.play()
        if (p && typeof p.catch === 'function') p.catch(() => {})
      } catch {}
    }
    clearTimeout(fadeTimer.current)
    fadeTimer.current = setTimeout(() => {
      setPrev(p => {
        if (p !== null) videoRefs.current[p]?.pause()
        return null
      })
    }, FADE * 1000 + 100)
    return () => clearTimeout(fadeTimer.current)
  }, [current])

  // Props à étaler sur chaque <video>
  const videoProps = (i, styles) => ({
    ref: el => (videoRefs.current[i] = el),
    className: `${styles.video} ${i === current ? styles.videoActive : i === prev ? styles.videoPrev : ''}`,
    muted: true,
    playsInline: true,
    preload: 'auto',
    onTimeUpdate: (e) => {
      if (i !== current) return
      const v = e.currentTarget
      if (v.duration && v.duration - v.currentTime <= FADE) next()
    },
    onEnded: () => { if (i === current) next() },
  })

  return { current, goTo, videoProps }
}
