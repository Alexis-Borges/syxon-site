import { useEffect, useRef } from 'react'
import styles from './Process.module.css'

const steps = [
  {
    num: '01', title: 'Installation',
    body: "Recevez votre boîtier syx·on. Branchez-le à votre écran. C'est prêt. Moins de 10 minutes pour transformer votre écran en vendeur intelligent.",
  },
  {
    num: '02', title: 'Brief mensuel',
    body: "Envoyez-nous vos demandes via WhatsApp ou par email. On s'occupe de les diffuser pour vous.",
  },
  {
    num: '03', title: 'Création',
    body: "Nos équipes conçoivent vos vidéos sur mesure : promotions, informations, nouveautés, etc. Vous choisissez, on crée.",
  },
  {
    num: '04', title: 'Diffusion auto',
    body: "Les animations se déploient automatiquement sur vos écrans via notre plateforme cloud. 7j/7, 24h/24. Sans intervention de votre part.",
  },
]

export default function Process() {
  const refs = useRef([])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add(styles.visible) }),
      { threshold: 0.15 }
    )
    refs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="process" className={styles.section}>
      <div className="section-label">Fonctionnement</div>
      <h2 className="section-title"><span className="metal">Vous branchez. On orchestre.</span></h2>
      <p className={styles.intro}>Tout est conçu pour que vous n'ayez rien à faire. Notre système gère tout en arrière-plan.</p>
      <div className={styles.steps}>
        <div className={styles.connector} />
        {steps.map((s, i) => (
          <div
            key={s.num}
            className={styles.step}
            ref={el => (refs.current[i] = el)}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className={styles.stepNum}>{s.num}</div>
            <div className={styles.stepTitle}>{s.title}</div>
            <p className={styles.stepBody}>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
