import { useEffect, useRef, useState } from 'react'
import styles from './Realisations.module.css'

const videos = [
  '/videos/pharma-1.mp4',
  '/videos/pharma-2.mp4',
  '/videos/pharma-3.mp4',
]

export default function Realisations() {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef(null)
  const videoRefs = useRef([])

  const goTo = (idx) => {
    setCurrent(idx)
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % videos.length)
    }, 6000)
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % videos.length)
    }, 6000)
    return () => clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    const v = videoRefs.current[current]
    if (v) {
      try {
        v.currentTime = 0
        const p = v.play()
        if (p && typeof p.catch === 'function') p.catch(() => {})
      } catch {}
    }
  }, [current])

  return (
    <section id="realisations" className={styles.section}>
      <div className={styles.container}>
        <div className="section-label">Réalisations</div>

        <div className={styles.split}>
          {/* TEXTE */}
          <div className={styles.text}>
            <div className={styles.mois}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
              </svg>
              Pharmacie du mois — Novembre 2026
            </div>
            <h2 className={styles.title}>
              Ce que voient<br />
              <span className="metal">vos patients.</span>
            </h2>
            <p className={styles.desc}>
              Tous les mois, une pharmacie est mise à l'honneur. Voici les réalisations commandées par<br />
              <strong>Pharmacie des Écoles, Bagnolet</strong> — 2 animations livrées en novembre.
            </p>
          </div>

          {/* ECRAN TV VERTICAL */}
          <div className={styles.screenCol}>
            <div className={styles.tvFrame}>
              <div className={styles.tvTopbar}>
                <div className={styles.tvDots}>
                  <span /><span /><span />
                </div>
                <div className={styles.tvLabel}>syx·on — Diffusion</div>
                <div className={styles.tvLive}>
                  <span />Live
                </div>
              </div>
              <div className={styles.tvScreen}>
                {videos.map((src, i) => (
                  <video
                    key={src}
                    ref={el => (videoRefs.current[i] = el)}
                    className={`${styles.video} ${i === current ? styles.videoActive : ''}`}
                    src={src}
                    muted
                    playsInline
                    autoPlay
                    loop
                    preload={i === 0 ? 'auto' : 'metadata'}
                  />
                ))}
              </div>
            </div>
            <div className={styles.tvStand}>
              <div className={styles.tvNeck} />
              <div className={styles.tvBase} />
            </div>
            <p className={styles.caption}>Pharmacie des Écoles · Bagnolet</p>
            <div className={styles.dots}>
              {videos.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Video ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
