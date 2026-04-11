import styles from './Offre.module.css'

const featuresLeft = [
  '2 animations vidéo sur mesure / mois',
  'Diffusion automatique sur vos écrans',
  'Boîtier syx·on fourni et configuré',
  'Mise à jour à distance incluse',
  'Support dédié · Résiliable à tout moment',
]

const featuresRight = [
  "Tout l'abonnement standard inclus",
  'Écran(s) professionnel(s) fournis',
  'Installation et câblage inclus',
  'Garantie matériel 5 ans',
  'Tarif ajusté selon la configuration',
]

const groupFeatures = [
  'Tarif négocié au volume',
  'Même service premium pour tous',
  'Tarif de lancement garanti à vie',
  'Priorité aux premières inscriptions',
]

export default function Offre() {
  return (
    <section id="offre" className={styles.section}>
      <div className="section-label">Tarifs</div>
      <h2 className="section-title">
        <span className="metal">Une offre simple,</span><br />sans surprise.
      </h2>

      {/* 2 cartes */}
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.cardTag}>Populaire</div>
          <div className={styles.cardIcon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
            </svg>
          </div>
          <div className={styles.cardLabel}>Vous avez déjà un écran</div>
          <div className={`${styles.cardPlan} metal`}>Abonnement<br />standard</div>
          <div className={styles.cardEngage}>Sans engagement</div>
          <div className={styles.sep} />
          <ul className={styles.features}>
            {featuresLeft.map(f => (
              <li key={f}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                {f}
              </li>
            ))}
          </ul>
          <a href="#contact" className={styles.cardBtn}>S'inscrire maintenant</a>
        </div>

        <div className={`${styles.card} ${styles.cardHighlight}`}>
          <div className={`${styles.cardTag} ${styles.cardTagPro}`}>Recommandé</div>
          <div className={styles.cardIcon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
              <path d="M7 8h10M7 11h6" strokeOpacity="0.5" />
            </svg>
          </div>
          <div className={styles.cardLabel}>Il vous faut un écran</div>
          <div className={`${styles.cardPlan} metal`}>Abonnement<br />écran</div>
          <div className={styles.cardEngage}>5 ans d'engagement</div>
          <div className={styles.sep} />
          <ul className={styles.features}>
            {featuresRight.map(f => (
              <li key={f}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                {f}
              </li>
            ))}
          </ul>
          <a href="#contact" className={`${styles.cardBtn} ${styles.cardBtnPro}`}>S'inscrire maintenant</a>
        </div>
      </div>

      {/* Tarif groupe */}
      <div className={styles.group}>
        <div className={styles.groupLeft}>
          <div className={styles.groupMeta}>
            <div className={styles.groupLabel}>Tarif groupé</div>
            <div className={styles.groupTitle}>Prix dégressif</div>
            <p className={styles.groupDesc}>
              Plus vous êtes nombreux, moins c'est cher. Les premiers inscrits gardent le meilleur tarif à vie.
            </p>
          </div>
          <ul className={styles.groupFeatures}>
            {groupFeatures.map(f => (
              <li key={f}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.groupRight}>
          <div className={styles.groupRightTxt}>Plus vous êtes nombreux</div>
          <div className={styles.groupRightTag}>Le prix baisse pour tous</div>
        </div>
      </div>

      <div className={styles.note}>
        Comprend le boîtier syx·on + 4 animations de lancement · Installation incluse
      </div>
    </section>
  )
}
