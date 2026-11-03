import useVideoCarousel from '../hooks/useVideoCarousel'
import styles from './Hero.module.css'

const videos = [
  '/videos/hero-1.mp4',
  '/videos/hero-3.mp4',
  '/videos/hero-4.mp4',
]

export default function Hero() {
  const { current, goTo, videoProps } = useVideoCarousel(videos.length)

  return (
    <section className={styles.hero}>
      <div className={styles.bg} />
      <div className={styles.grid} />

      <div className={styles.container}>
        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Offre de lancement Île-de-France
          </div>
          <h1 className={styles.title}>
            <span className="metal">Vos écrans</span><br />
            <span className={styles.outline}>travaillent</span><br />
            <span className="metal">pour vous.</span>
          </h1>
          <p className={styles.sub}>
            syx·on crée vos animations vidéo sur mesure et les diffuse automatiquement sur vos écrans.<br />
            <strong>Promotions, gammes, infos santé.</strong> Vous demandez, on fait.
          </p>
          <div className={styles.actions}>
            <a href="#contact" className="btn-primary">
              S'inscrire maintenant
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#concept" className="btn-secondary">
              Découvrir le concept
              <span className="btn-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>
          <div className={styles.scrollHint}>
            <div className={styles.scrollLine} />
            Scroll
          </div>
        </div>

        {/* RIGHT — TV screen */}
        <div className={styles.right}>
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
                  src={src}
                  {...videoProps(i, styles)}
                />
              ))}
            </div>
          </div>
          <div className={styles.tvStand}>
            <div className={styles.tvNeck} />
            <div className={styles.tvBase} />
          </div>
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
    </section>
  )
}
