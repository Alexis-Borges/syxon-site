import styles from './Footer.module.css'

const links = [
  { href: '#concept',      label: 'Concept' },
  { href: '#offre',        label: 'Tarifs' },
  { href: '#realisations', label: 'Réalisations' },
  { href: '#contact',      label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <div className={styles.wordmark}>syx·on</div>
        <div className={styles.sub}>Service de diffusion dynamique</div>
      </div>
      <ul className={styles.links}>
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} className={styles.link}>{l.label}</a>
          </li>
        ))}
      </ul>
      <div className={styles.copy}>© 2026 syx·on</div>
    </footer>
  )
}
