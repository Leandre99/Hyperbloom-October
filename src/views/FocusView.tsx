import { useState, useEffect, useRef } from 'react';
import { useT } from '../i18n';
import { useSettings } from '../settings/SettingsContext';
import SoundMachine from '../components/SoundMachine';

interface Props {
  stepLabel?: string;
  onExit: () => void;
}

export default function FocusView({ stepLabel, onExit }: Props) {
  const t = useT();
  const f = t.focus;
  const { settings } = useSettings();
  const isFr = settings.lang === 'fr';

  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [workDuration, setWorkDuration] = useState(25); // minutes
  const [breakDuration, setBreakDuration] = useState(5); // minutes
  const [secondsLeft, setSecondsLeft] = useState(workDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  // Breathing guide animation state
  const [breathePhase, setBreathePhase] = useState<'in' | 'out'>('in');

  useEffect(() => {
    if (mode === 'break') {
      const interval = setInterval(() => {
        setBreathePhase((p) => (p === 'in' ? 'out' : 'in'));
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [mode]);

  // Timer interval
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive) {
      timerRef.current = window.setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            if (mode === 'work') {
              setSessionsCompleted((c) => c + 1);
              setMode('break');
              return breakDuration * 60;
            } else {
              setMode('work');
              return workDuration * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, mode, workDuration, breakDuration]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft((mode === 'work' ? workDuration : breakDuration) * 60);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const totalTime = (mode === 'work' ? workDuration : breakDuration) * 60;
  const progressRatio = (totalTime - secondsLeft) / totalTime;

  return (
    <div className="view focus-view">
      {/* Top Header with Back button and progress */}
      <div className="focus-top-bar">
        <button type="button" className="btn btn--ghost" onClick={onExit} aria-label={f.exit}>
          ← {f.exit}
        </button>

        <div className="focus-header-meta">
          <span className="sessions-badge">
            🌱 {sessionsCompleted} {isFr ? `session${sessionsCompleted > 1 ? 's' : ''} terminée${sessionsCompleted > 1 ? 's' : ''}` : `focus session${sessionsCompleted > 1 ? 's' : ''}`}
          </span>
        </div>
      </div>

      <div className="focus-layout-grid">
        {/* Left Column: Pomodoro & Active Step */}
        <section className="card focus-main-card">
          {/* Active Step Banner */}
          <div className="focus-step-banner">
            <span className="badge badge--accent">
              {isFr ? '🎯 Tâche en cours' : '🎯 Current Focus Step'}
            </span>
            <h2 className="focus-step-heading">
              {stepLabel || (isFr ? 'Session de travail libre' : 'Open Focus Session')}
            </h2>
            {!stepLabel && (
              <p className="focus-step-hint">
                {isFr
                  ? 'Astuce : Clique sur « 🎯 Démarrer » depuis une micro-étape de la page d’accueil pour l’importer ici.'
                  : 'Tip: Click "🎯 Start" next to any micro-step on Today to import it here.'}
              </p>
            )}
          </div>

          {/* Big Timer Circle */}
          <div className="timer-wrapper">
            <svg className="timer-svg" viewBox="0 0 200 200" aria-hidden="true">
              <circle className="timer-circle-bg" cx="100" cy="100" r="88" />
              <circle
                className="timer-circle-progress"
                cx="100"
                cy="100"
                r="88"
                strokeDasharray={552.92}
                strokeDashoffset={552.92 * (1 - progressRatio)}
              />
            </svg>

            <div className="timer-content">
              <span className={`timer-mode-tag ${mode === 'work' ? 'work' : 'break'}`}>
                {mode === 'work' ? (isFr ? '⚡ Temps d’effort' : '⚡ Focus Time') : (isFr ? '🍃 Pause respiration' : '🍃 Rest Break')}
              </span>
              <div className="timer-digits" aria-live="polite">
                {timeFormatted}
              </div>
              <span className="timer-subtext">
                {isActive ? (isFr ? 'Chrono en cours...' : 'In progress...') : (isFr ? 'En pause' : 'Paused')}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="timer-controls">
            <button
              type="button"
              className={`btn btn--lg ${isActive ? 'btn--accent' : 'btn--primary'}`}
              onClick={toggleTimer}
            >
              {isActive ? (isFr ? '⏸️ Mettre en pause' : '⏸️ Pause') : (isFr ? '▶️ Lancer le chrono' : '▶️ Start Timer')}
            </button>
            <button type="button" className="btn btn--lg btn--ghost" onClick={resetTimer}>
              ↺ {isFr ? 'Réinitialiser' : 'Reset'}
            </button>
          </div>

          {/* Quick presets (when paused) */}
          {!isActive && (
            <div className="duration-settings">
              <span className="duration-label">
                {isFr ? 'Régler la durée :' : 'Set duration:'}
              </span>
              <div className="duration-pills">
                {[15, 20, 25, 30].map((d) => (
                  <button
                    key={d}
                    type="button"
                    className={`choice-pill ${workDuration === d ? 'active' : ''}`}
                    onClick={() => {
                      setWorkDuration(d);
                      if (mode === 'work') setSecondsLeft(d * 60);
                    }}
                  >
                    {d} min
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Breathing Guide during break */}
          {mode === 'break' && (
            <div className={`breathe-guide ${breathePhase} ${settings.motion === 'reduced' ? 'reduced' : ''}`}>
              <span className="breathe-text">
                {breathePhase === 'in' ? `🌬️ ${f.breatheIn}` : `💨 ${f.breatheOut}`}
              </span>
            </div>
          )}
        </section>

        {/* Right Column: Sensory Sound Machine */}
        <aside className="focus-sidebar">
          <SoundMachine />

          <div className="card focus-tips-card">
            <h3>💡 {isFr ? 'Conseils Anti-Distraction' : 'Anti-Overload Tips'}</h3>
            <ul className="focus-tips-list">
              <li>
                <strong>{isFr ? 'Une seule fenêtre' : 'Single tab only'}</strong> :{' '}
                {isFr
                  ? 'Ferme ou masque tous les autres onglets pendant cette session.'
                  : 'Close or hide other browser tabs during this session.'}
              </li>
              <li>
                <strong>{isFr ? 'Pardon aux pauses' : 'Take real breaks'}</strong> :{' '}
                {isFr
                  ? 'Quand le chrono sonne, lève les yeux de l’écran et respire avec la bulle.'
                  : 'Look away from the screen when the break bell chimes.'}
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
