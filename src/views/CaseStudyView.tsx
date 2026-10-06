import { useT } from '../i18n';
import { useSettings } from '../settings/SettingsContext';

export default function CaseStudyView() {
  const t = useT();
  const { settings } = useSettings();
  const isFr = settings.lang === 'fr';

  return (
    <div className="view case-study-view">
      {/* Hero Header */}
      <header className="case-hero card">
        <div className="case-hero-badge">
          <span className="badge badge--accent">Hyperbloom October 2026</span>
          <span className="case-category">UI/UX & Web Design Hackathon</span>
        </div>
        <h1 className="case-title">
          {isFr
            ? 'Calmly — Conception d’une plateforme d’apprentissage neuro-inclusive'
            : 'Calmly — Designing a Neuro-Inclusive Learning Sanctuary'}
        </h1>
        <p className="case-lead">
          {isFr
            ? 'Étude de cas détaillée : comment nous avons repensé l’expérience d’apprentissage pour les étudiants avec TDAH et dyslexie en éliminant la surcharge cognitive.'
            : 'Design case study: how we re-architected digital learning for students with ADHD & dyslexia by stripping away sensory overwhelm.'}
        </p>

        <div className="case-stats-row">
          <div className="stat-item">
            <span className="stat-number">1 sur 5</span>
            <span className="stat-label">{isFr ? 'Étudiants neurodivergents' : 'Neurodivergent learners'}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">WCAG 2.2</span>
            <span className="stat-label">{isFr ? 'Niveau de conformité AA' : 'AA Strict Compliance'}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">0 Streak</span>
            <span className="stat-label">{isFr ? 'Zéro culpabilité' : 'Shame-free gamification'}</span>
          </div>
        </div>
      </header>

      <div className="case-body-grid">
        {/* Section 1: The Problem */}
        <section className="card case-card">
          <div className="case-section-header">
            <span className="section-pill">01</span>
            <h2>{isFr ? 'Le Problème : La Surcharge Cognitive' : 'The Problem: Sensory Overload'}</h2>
          </div>
          <p>
            {isFr
              ? "Les LMS traditionnels (Moodle, Blackboard, Google Classroom) ont été conçus comme des classeurs administratifs, pas comme des espaces d'apprentissage. Ils bombardent l'écran de barres de progression, de dates butoirs en rouge, de dizaines de dossiers et de notifications constantes."
              : 'Traditional learning platforms (Moodle, Blackboard, Google Classroom) were built like administrative file cabinets, not human learning spaces. They inundate students with conflicting progress bars, urgent red deadlines, and dozens of concurrent visual cues.'}
          </p>
          <div className="quote-callout">
            <span className="quote-mark">“</span>
            <p>
              {isFr
                ? 'Moodle me montre tout ce que je n’ai pas encore fait. Calmly me montre juste la prochaine chose à faire.'
                : 'Mainstream platforms show me everything I haven’t finished yet. Calmly shows me only the next single step.'}
            </p>
          </div>
          <p>
            {isFr
              ? "Pour un étudiant avec TDAH ou dyslexie, cette profusion visuelle déclenche une paralysie de la fonction exécutive : l'incapacité de choisir par où commencer, menant directement au décrochage scolaire."
              : 'For students with ADHD or dyslexia, this causes severe executive dysfunction paralysis: cognitive exhaustion before reading a single sentence.'}
          </p>
        </section>

        {/* Section 2: Personas */}
        <section className="card case-card">
          <div className="case-section-header">
            <span className="section-pill">02</span>
            <h2>{isFr ? 'Personas & Besoins Utilisateurs' : 'Personas & User Needs'}</h2>
          </div>

          <div className="personas-visual-grid">
            <div className="persona-box">
              <div className="persona-top">
                <span className="persona-icon" aria-hidden="true">🧠</span>
                <div>
                  <h3>Léa, {isFr ? '20 ans' : '20'}</h3>
                  <span className="persona-badge persona-badge--adhd">
                    {isFr ? 'Profil TDAH' : 'ADHD Profile'}
                  </span>
                </div>
              </div>
              <ul className="persona-points">
                <li>
                  <strong>{isFr ? 'Obstacle :' : 'Pain Point:'}</strong>{' '}
                  {isFr
                    ? 'Paralysie devant les devoirs vagues de plusieurs heures.'
                    : 'Overwhelmed by sprawling, multi-hour assignments.'}
                </li>
                <li>
                  <strong>{isFr ? 'Solution Calmly :' : 'Calmly Solution:'}</strong>{' '}
                  {isFr
                    ? 'Découpage automatique en micro-étapes de 3 à 10 min, accompagnées de bruit marron.'
                    : 'Automatic micro-chunking into 3-10 min steps + built-in brown noise.'}
                </li>
              </ul>
            </div>

            <div className="persona-box">
              <div className="persona-top">
                <span className="persona-icon" aria-hidden="true">📖</span>
                <div>
                  <h3>Karim, {isFr ? '19 ans' : '19'}</h3>
                  <span className="persona-badge persona-badge--dyslexia">
                    {isFr ? 'Profil Dyslexie' : 'Dyslexia Profile'}
                  </span>
                </div>
              </div>
              <ul className="persona-points">
                <li>
                  <strong>{isFr ? 'Obstacle :' : 'Pain Point:'}</strong>{' '}
                  {isFr
                    ? 'Lettres qui sautent sur les polices serrées, fatigue oculaire rapide.'
                    : 'Letter flipping, crowd crowding, ocular strain on standard sans-serifs.'}
                </li>
                <li>
                  <strong>{isFr ? 'Solution Calmly :' : 'Calmly Solution:'}</strong>{' '}
                  {isFr
                    ? 'Police OpenDyslexic intégrée, règle de lecture dynamique et synthèse vocale.'
                    : 'Embedded OpenDyslexic font, cursor-following reading ruler, text-to-speech.'}
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: The 4 UX Pillars */}
        <section className="card case-card">
          <div className="case-section-header">
            <span className="section-pill">03</span>
            <h2>{isFr ? 'Les 4 Piliers UX / UI' : 'The 4 Core UX Pillars'}</h2>
          </div>

          <div className="pillars-cards-grid">
            <div className="pillar-card">
              <span className="pillar-icon">🎯</span>
              <h3>{isFr ? 'Une seule chose à la fois' : 'One Thing at a Time'}</h3>
              <p>
                {isFr
                  ? 'Une seule tâche active mise en avant. Le reste est replié pour éviter d’angoisser l’étudiant.'
                  : 'Only the immediate next step is prominently visible. Later workloads are cleanly folded.'}
              </p>
            </div>

            <div className="pillar-card">
              <span className="pillar-icon">🎛️</span>
              <h3>{isFr ? 'Adaptabilité sensorielle' : 'Sensory Adaptability'}</h3>
              <p>
                {isFr
                  ? 'Thème Crème chaud (anti-éblouissement), police OpenDyslexic, et réglage instantané du contraste.'
                  : 'Warm cream glare reduction, Atkinson & OpenDyslexic typography, and live scale tweaking.'}
              </p>
            </div>

            <div className="pillar-card">
              <span className="pillar-icon">🌱</span>
              <h3>{isFr ? 'Gamification douce' : 'Gentle Growth'}</h3>
              <p>
                {isFr
                  ? 'La plante grandit avec chaque petite étape. Aucune série à perdre pour zéro sentiment de honte.'
                  : 'Plants evolve forward without punitive break streaks or shame-based notifications.'}
              </p>
            </div>

            <div className="pillar-card">
              <span className="pillar-icon">♿</span>
              <h3>{isFr ? 'Accessibilité native' : 'Native Accessibility'}</h3>
              <p>
                {isFr
                  ? 'Boutons larges (≥44px), support du lecteur d’écran, focus au clavier haute visibilité (WCAG 2.2 AA).'
                  : 'Minimum 44px hitboxes, full keyboard focus outlines, ARIA live timers (WCAG 2.2 AA).'}
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Technical Execution */}
        <section className="card case-card">
          <div className="case-section-header">
            <span className="section-pill">04</span>
            <h2>{isFr ? 'Architecture & Stack Technique' : 'Technical Architecture'}</h2>
          </div>
          <div className="tech-tags-cloud">
            <span className="tech-tag">React 19</span>
            <span className="tech-tag">TypeScript</span>
            <span className="tech-tag">Vite 8</span>
            <span className="tech-tag">Web Audio API</span>
            <span className="tech-tag">SpeechSynthesis API</span>
            <span className="tech-tag">CSS Custom Tokens</span>
            <span className="tech-tag">WCAG 2.2 AA</span>
          </div>
          <p style={{ marginTop: '1rem' }}>
            {isFr
              ? 'Conçu sans frameworks CSS lourds ni dépendances superflues. Les adaptations d’accessibilité sont injectées en CSS natif via des data-attributes, assurant un rendu immédiat et 60fps sur n’importe quel appareil.'
              : 'Zero bulky UI component frameworks. Every comfort parameter is driven natively through CSS custom properties and document data-attributes for instant, zero-lag repainting across mobile and desktop.'}
          </p>
        </section>
      </div>
    </div>
  );
}
