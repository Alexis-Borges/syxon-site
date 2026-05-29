import styles from './Nav.module.css'

const links = [
  { href: '#concept',      label: 'Le concept' },
  { href: '#offre',        label: 'Offre' },
  { href: '#process',      label: 'Comment ça marche' },
  { href: '#realisations', label: 'Réalisations' },
]

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <a href="#" className={styles.wordmark} aria-label="syx·on — accueil">
        <img src="/mark.png" alt="" className={styles.logoMark} width="32" height="32" />
        <span className={styles.wordmarkText}>syx·on</span>
      </a>
      <ul className={styles.links}>
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} className={styles.link}>{l.label}</a>
          </li>
        ))}
        <li>
          <a href="#contact" className={`${styles.link} ${styles.cta}`}>Rejoindre syx·on</a>
        </li>
      </ul>
    </nav>
  )
}
