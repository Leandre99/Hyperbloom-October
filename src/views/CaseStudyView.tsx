import { useT } from '../i18n';
import { useSettings } from '../settings/SettingsContext';

export default function CaseStudyView() {
  const t = useT();
  const { settings } = useSettings();
  const lang = settings.lang;

  return (
    <div className="view case-study-view">
      <header className="page-header">
        <span className="badge badge--accent">Hyperbloom October 2026</span>
        <h1>{t.caseStudy.title}</h1>
        <p className="lead">{t.caseStudy.subtitle}</p>
      </header>

      <article className="case-study-content">
        {/* Section 1: The Problem */}
        <section className="card case-section">
          <h2>1. {lang === 'fr' ? 'Le Problème' : 'The Problem'}</h2>
          <p>
            {lang === 'fr'
              ? "Les plateformes éducatives existantes (Moodle, Canvas, Google Classroom) souffrent d'une surcharge cognitive majeure. Elles affichent des dizaines de cours, notifications, échéances et barres de progression simultanément. Pour un étudiant neurodivergent (TDAH, dyslexie, spectre autistique), cette surcharge mène à la paralysie décisionnelle, à la fatigue visuelle et à l'abandon."
              : 'Mainstream LMS platforms (Moodle, Canvas, Google Classroom) suffer from severe cognitive overload. Dozens of assignments, notifications, deadlines, and progress bars compete for attention. For neurodivergent learners (ADHD, dyslexia, autism), this sensory overload triggers decision paralysis, visual fatigue, and burnout.'}
          </p>
          <div className="quote-box">
            <blockquote>
              {lang === 'fr'
                ? '« Moodle me montre tout ce que je n’ai pas fait. Calmly me montre la prochaine chose à faire. »'
                : '“Standard platforms show me everything I haven’t done yet. Calmly shows me the next simple thing to do.”'}
            </blockquote>
          </div>
        </section>

        {/* Section 2: User Personas */}
        <section className="card case-section">
          <h2>2. {lang === 'fr' ? 'Personas Cibles' : 'Target Personas'}</h2>
          <div className="personas-grid">
            <div className="persona-card">
              <div className="persona-header">
                <span className="persona-avatar">🧠</span>
                <div>
                  <h3>Léa (20 {lang === 'fr' ? 'ans' : 'y/o'})</h3>
                  <span className="persona-tag">ADHD / TDAH</span>
                </div>
              </div>
              <p>
                {lang === 'fr'
                  ? 'Perd rapidement sa concentration avec les interfaces encombrées. A besoin d’un découpage en micro-tâches concrètes et d’une seule chose sur son écran.'
                  : 'Struggles with executive dysfunction and cluttered dashboards. Needs clear micro-steps and zero peripheral distractions to get started.'}
              </p>
            </div>

            <div className="persona-card">
              <div className="persona-header">
                <span className="persona-avatar">📖</span>
                <div>
                  <h3>Karim (19 {lang === 'fr' ? 'ans' : 'y/o'})</h3>
                  <span className="persona-tag">Dyslexia / Dyslexie</span>
                </div>
              </div>
              <p>
                {lang === 'fr'
                  ? 'Fatigue oculaire rapide sur les polices standards sans empattement serrées. Bénéficie d’OpenDyslexic, de la règle de lecture et du text-to-speech.'
                  : 'Experiences letter crowding and visual jumping on dense layouts. Relies on OpenDyslexic, line-following reading rulers, and auditory reading.'}
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Design Principles */}
        <section className="card case-section">
          <h2>3. {lang === 'fr' ? 'Principes de Conception UX/UI' : 'UX/UI Design Pillars'}</h2>
          <div className="pillars-grid">
            <div className="pillar-item">
              <h3>🎯 One Thing at a Time</h3>
              <p>
                {lang === 'fr'
                  ? 'Affichage prioritaire de la tâche imminente. Les autres tâches sont doucement repliées pour prévenir l’anxiété.'
                  : 'Only the immediate next step is highlighted. Later work is respectfully tucked away to prevent executive paralysis.'}
              </p>
            </div>

            <div className="pillar-item">
              <h3>🎛️ Sensory Adaptability</h3>
              <p>
                {lang === 'fr'
                  ? 'Police OpenDyslexic intégrée, thèmes anti-éblouissement (Warm Cream), mode fort contraste et support natif de prefers-reduced-motion.'
                  : 'Integrated OpenDyslexic & Atkinson fonts, Warm Cream glare reduction, high-contrast mode, and instant respect for reduced motion.'}
              </p>
            </div>

            <div className="pillar-item">
              <h3>🌱 Gentle Gamification</h3>
              <p>
                {lang === 'fr'
                  ? 'Pas de "streaks" punitifs qui culpabilisent après un oubli. Un jardin bienveillant qui grandit sans jamais régresser.'
                  : 'No punishing daily streaks that induce shame. A kind digital plant that grows with each step and never withers.'}
              </p>
            </div>

            <div className="pillar-item">
              <h3>♿ Strict Accessibility (WCAG 2.2 AA)</h3>
              <p>
                {lang === 'fr'
                  ? 'Cibles tactiles de 44px minimum, navigation 100% au clavier avec outline bien visible, et balisage sémantique ARIA.'
                  : '44px minimum touch targets, complete keyboard navigability with visible focus indicators, and semantic ARIA landmarks.'}
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Tech & Impact */}
        <section className="card case-section">
          <h2>4. {lang === 'fr' ? 'Architecture Technique' : 'Technical Stack'}</h2>
          <p>
            {lang === 'fr'
              ? 'Conçu avec React 19, TypeScript et Vite, alimenté par des variables CSS pures et des data-attributes dynamiques. Zéro dépendance tierce lourde pour garantir des performances optimales et un chargement instantané.'
              : 'Engineered with React 19, TypeScript, and Vite. Configured entirely through pure CSS custom properties and dynamic HTML data-attributes without bloated dependencies, ensuring blazing-fast performance.'}
          </p>
        </section>
      </article>
    </div>
  );
}
