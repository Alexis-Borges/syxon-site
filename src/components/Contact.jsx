import { useState } from 'react'
import styles from './Contact.module.css'

const infoItems = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 6.29 6.29l.95-.89a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: 'Téléphone',
    value: '06 34 18 39 70',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'Email',
    value: 'syxon.industry@gmail.com',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: 'Réponse garantie',
    value: 'Sous 24 heures',
  },
]

const ecranOptions = [
  'Oui, en vitrine',
  'Oui, en intérieur',
  'Oui, vitrine + intérieur',
  "Non, j'en ai besoin",
]

// ⚠️ Remplacer par l'URL Formspree réelle fournie par Wael après création du form.
// Exemple : 'https://formspree.io/f/abcdwxyz'
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xbdpnzpq'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    prenom: '', nom: '', pharmacie: '',
    email: '', tel: '', ville: '',
    ecrans: '', message: '',
    _gotcha: '', // honeypot anti-spam (doit rester vide)
  })

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Si le honeypot est rempli, c'est un bot : on simule un succès sans rien envoyer.
    if (form._gotcha) {
      setSubmitted(true)
      return
    }
    setError('')
    setSending(true)
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError("Une erreur est survenue. Merci de réessayer ou de nous contacter directement.")
      }
    } catch {
      setError("Erreur réseau. Merci de réessayer ou de nous contacter directement.")
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className={styles.section}>
      <div className="section-label">Inscription</div>
      <h2 className="section-title">
        <span className="metal">Rejoindre syx·on.</span>
      </h2>

      <div className={styles.grid}>
        {/* INFO */}
        <div className={styles.info}>
          <p className={styles.intro}>
            Laissez-nous vos informations. Wael vous contacte sous 24h pour faire le point
            sur votre situation et démarrer.
          </p>

          {infoItems.map(item => (
            <div key={item.label} className={styles.infoItem}>
              <div className={styles.infoIcon}>{item.icon}</div>
              <div>
                <div className={styles.infoLabel}>{item.label}</div>
                <div className={styles.infoVal}>{item.value}</div>
              </div>
            </div>
          ))}

          <div className={styles.guarantee}>
            <p>
              L'offre de lancement est{' '}
              <strong>indexée sur le nombre de pharmacies inscrites</strong>. Plus vous êtes
              nombreux, moins c'est cher. Les premiers inscrits gardent le{' '}
              <strong>meilleur tarif à vie</strong>.
            </p>
          </div>
        </div>

        {/* FORM */}
        <div>
          {submitted ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>✓</div>
              Demande reçue — Wael vous contacte sous 24h.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Honeypot anti-spam : invisible pour l'humain, piège à bots */}
              <input
                type="text" name="_gotcha" tabIndex={-1} autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                value={form._gotcha} onChange={handleChange}
              />

              <div className={styles.row}>
                <div className={styles.group}>
                  <label className={styles.label}>Prénom</label>
                  <input
                    className={styles.input} type="text" name="prenom"
                    placeholder="Jean" required maxLength={80}
                    value={form.prenom} onChange={handleChange}
                  />
                </div>
                <div className={styles.group}>
                  <label className={styles.label}>Nom</label>
                  <input
                    className={styles.input} type="text" name="nom"
                    placeholder="Dupont" required maxLength={80}
                    value={form.nom} onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.group}>
                <label className={styles.label}>Nom de la pharmacie</label>
                <input
                  className={styles.input} type="text" name="pharmacie"
                  placeholder="Pharmacie du Centre" required maxLength={120}
                  value={form.pharmacie} onChange={handleChange}
                />
              </div>

              <div className={styles.group}>
                <label className={styles.label}>Email professionnel</label>
                <input
                  className={styles.input} type="email" name="email"
                  placeholder="contact@pharmacie.fr" required maxLength={150}
                  value={form.email} onChange={handleChange}
                />
              </div>

              <div className={styles.group}>
                <label className={styles.label}>Téléphone</label>
                <input
                  className={styles.input} type="tel" name="tel"
                  placeholder="01 48 20 00 00" maxLength={20}
                  value={form.tel} onChange={handleChange}
                />
              </div>

              <div className={styles.row}>
                <div className={styles.group}>
                  <label className={styles.label}>Ville</label>
                  <input
                    className={styles.input} type="text" name="ville"
                    placeholder="Saint-Denis" maxLength={80}
                    value={form.ville} onChange={handleChange}
                  />
                </div>
                <div className={styles.group}>
                  <label className={styles.label}>Vous avez des écrans ?</label>
                  <select
                    className={`${styles.input} ${styles.select}`}
                    name="ecrans"
                    value={form.ecrans} onChange={handleChange}
                  >
                    <option value="">Sélectionner</option>
                    {ecranOptions.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              <div className={styles.group}>
                <label className={styles.label}>Message (optionnel)</label>
                <textarea
                  className={`${styles.input} ${styles.textarea}`}
                  name="message" maxLength={1000}
                  placeholder="Une question, une contrainte particulière..."
                  value={form.message} onChange={handleChange}
                />
              </div>

              {error && <div className={styles.error}>{error}</div>}

              <button type="submit" className={styles.submit} disabled={sending}>
                {sending ? 'Envoi en cours…' : 'Envoyer ma demande →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
