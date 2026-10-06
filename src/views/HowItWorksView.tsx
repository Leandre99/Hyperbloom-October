import { useSettings } from '../settings/SettingsContext';

interface Props {
  onGoToToday: () => void;
  onOpenSettings: () => void;
}

export default function HowItWorksView({ onGoToToday, onOpenSettings }: Props) {
  const { settings } = useSettings();
  const isFr = settings.lang === 'fr';

  return (
    <div className="view how-it-works-view">
      {/* Intro Header */}
      <header className="page-header" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem' }}>
        <span className="badge badge--accent">
          {isFr ? '🌱 Guide Rapide' : '🌱 Quick Guide'}
        </span>
        <h1 style={{ marginTop: '0.5rem' }}>
          {isFr ? 'Comment fonctionne Calmly ?' : 'How does Calmly work?'}
        </h1>
        <p className="lead">
          {isFr
            ? 'Une visite guidée en 4 étapes simples pour comprendre la plateforme et commencer sans stress.'
            : 'A simple 4-step walkthrough to get the most out of your calm learning workspace.'}
        </p>
      </header>

      {/* 4 Steps Visual Flow */}
      <div className="steps-flow-container">
        {/* Step 1 */}
        <div className="card step-flow-card">
          <div className="step-flow-number">1</div>
          <div className="step-flow-content">
            <div className="step-flow-icon">🎛️</div>
            <h3>{isFr ? 'Règle ton confort sensoriel' : 'Tune your sensory comfort'}</h3>
            <p>
              {isFr
                ? 'Clique sur la petite roue crantée (⚙️) en haut à droite. Choisis un thème anti-éblouissement (comme Crème chaud), une police adaptée à la dyslexie (OpenDyslexic) et ajuste la taille du texte. Tout s’enregistre automatiquement sur ton ordinateur.'
                : 'Click the comfort gear (⚙️) in the top bar. Choose an eyestrain-free theme (like Warm Cream), a dyslexia-friendly font (OpenDyslexic), and scale your text. Everything saves instantly on your device.'}
            </p>
            <button type="button" className="btn btn--sm btn--soft" onClick={onOpenSettings}>
              ⚙️ {isFr ? 'Ouvrir les réglages' : 'Open comfort settings'}
            </button>
          </div>
        </div>

        {/* Step 2 */}
        <div className="card step-flow-card">
          <div className="step-flow-number">2</div>
          <div className="step-flow-content">
            <div className="step-flow-icon">🪫</div>
            <h3>{isFr ? 'Indique ton niveau d’énergie' : 'Check in your energy level'}</h3>
            <p>
              {isFr
                ? 'Sur l’accueil, dis-nous comment tu te sens (Épuisé, Moyen, Super). Si ton énergie est basse, Calmly passe en "Mode jour difficile" et ne t’affiche qu’une seule micro-tâche pour t’éviter de culpabiliser.'
                : 'On Today, tap how you feel right now. If your energy is low, Calmly activates "Hard-Day Mode" and hides heavy backlogs to protect you from paralysis and guilt.'}
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="card step-flow-card">
          <div className="step-flow-number">3</div>
          <div className="step-flow-content">
            <div className="step-flow-icon">🎯</div>
            <h3>{isFr ? 'Fais une seule chose à la fois' : 'Focus on one small step'}</h3>
            <p>
              {isFr
                ? 'Chaque grand devoir est découpé en étapes de 2 à 10 minutes. Clique sur « 🎯 Démarrer » pour entrer dans le mode Focus avec un chrono Pomodoro, un exercice de respiration et un générateur de bruit marron.'
                : 'Big assignments are broken into 2–10 minute bite-sized steps. Tap "🎯 Start" on any step to open the distraction-free Focus room with a Pomodoro timer, guided breathing, and brown noise.'}
            </p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="card step-flow-card">
          <div className="step-flow-number">4</div>
          <div className="step-flow-content">
            <div className="step-flow-icon">📖</div>
            <h3>{isFr ? 'Lis ou écoute tes cours sans fatigue' : 'Read or listen without fatigue'}</h3>
            <p>
              {isFr
                ? 'Dans l’onglet Leçons, active la "Règle de lecture" (un surlignage qui suit ta souris pour ne pas perdre la ligne) ou clique sur "Écouter" pour que l’application te lise le texte à voix haute.'
                : 'In the Lessons tab, toggle the "Reading Ruler" (a gentle bar following your mouse so you never jump lines) or hit "Listen" for native text-to-speech reading.'}
            </p>
          </div>
        </div>
      </div>

      {/* Account & Storage Explanation Callout */}
      <section className="card zero-account-banner" style={{ marginTop: '2.5rem' }}>
        <div className="zero-account-header">
          <span className="zero-account-icon" aria-hidden="true">🔒</span>
          <div>
            <h3>{isFr ? 'Pourquoi n’y a-t-il pas de création de compte ?' : 'Why is there no sign-up form?'}</h3>
            <p className="muted-text">
              {isFr
                ? 'Zéro mot de passe, zéro collecte de données. Tout reste privé et enregistré dans ton navigateur.'
                : 'Zero passwords, zero data tracking. Everything is saved locally and privately in your browser.'}
            </p>
          </div>
        </div>
        <p style={{ margin: '1rem 0 0 0', lineHeight: 1.6 }}>
          {isFr
            ? 'Pour les étudiants neurodivergents, devoir créer un compte avec mot de passe et confirmation par e-mail est une friction cognitive majeure qui pousse à l’abandon. Calmly utilise la sauvegarde locale (`localStorage`) : tes préférences, ton humeur du jour, tes tâches ajoutées et tes étapes cochées sont instantanément enregistrées sur ton appareil et conservées même quand tu fermes ton navigateur.'
            : 'For neurodivergent students, mandatory account creation and password management trigger high friction and drop-off. Calmly relies on instant local storage: your theme comfort, energy level, custom tasks, and checked micro-steps persist seamlessly on your computer without transmitting any personal data.'}
        </p>
      </section>

      {/* Action CTA */}
      <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
        <button type="button" className="btn btn--primary btn--lg" onClick={onGoToToday}>
          🚀 {isFr ? 'C’est parti, aller à Aujourd’hui' : 'Got it, let’s go to Today'}
        </button>
      </div>
    </div>
  );
}
