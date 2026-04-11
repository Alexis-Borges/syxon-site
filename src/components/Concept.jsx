import { useEffect, useRef } from 'react'
import styles from './Concept.module.css'

const points = [
  {
    num: '01',
    title: 'Vous nous briefez',
    body: 'Vous nous dites ce que vous voulez mettre en avant : promotions, nouveautés, informations santé. Chaque mois, 2 animations sur mesure.',
  },
  {
    num: '02',
    title: 'On crée, on diffuse',
    body: 'Notre équipe crée les animations à votre image. Elles se déploient automatiquement sur vos écrans via notre système cloud. Rien à faire de votre côté.',
  },
  {
    num: '03',
    title: 'Vos patients achètent plus',
    body: "Un écran bien conçu capte l'attention, crée l'envie, et génère des ventes que vous n'auriez pas faites autrement.",
  },
]

const stats = [
  { num: '×4',   label: "Plus d'attention qu'une affiche papier",     desc: "L'écran capte 4× plus l'œil" },
  { num: '83%',  label: 'Des clients influencés par ce qu\'ils voient', desc: "Décision d'achat en pharmacie" },
  { num: '+32%', label: 'De ventes sur les produits mis en avant',     desc: 'Constaté chez nos partenaires' },
]

export default function Concept() {
  const pointRefs = useRef([])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add(styles.visible)
      }),
      { threshold: 0.15 }
    )
    pointRefs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="concept" className={styles.section}>
      {/* LEFT */}
      <div className={styles.left}>
        <div className="section-label">Le concept</div>
        <h2 className="section-title">
          Un vendeur silencieux,<br />
          <span className="metal">7j/7, 24h/24.</span>
        </h2>
        <div className={styles.points}>
          {points.map((p, i) => (
            <div
              key={p.num}
              className={styles.point}
              ref={el => (pointRefs.current[i] = el)}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={styles.pointNum}>{p.num}</div>
              <div className={styles.pointBody}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — stats empilées */}
      <div className={styles.right}>
        {stats.map(s => (
          <div key={s.num} className={styles.statBlock}>
            <div className={styles.statNum}>{s.num}</div>
            <div className={styles.statInfo}>
              <div className={styles.statLabel}>{s.label}</div>
              <div className={styles.statDesc}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
