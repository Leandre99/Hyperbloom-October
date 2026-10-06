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
            // Sound or visual notify
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
      <div className="focus-top-bar">
        <button className="btn btn--ghost" onClick={onExit} aria-label={f.exit}>
          ← {f.exit}
        </button>
        <span className="sessions-badge">🌱 {f.sessions(sessionsCompleted)}</span>
      </div>

      <div className="focus-center-stage">
        {stepLabel ? (
          <div className="focus-step-card card">
            <span className="focus-step-pill">{f.currentStep}</span>
            <h2 className="focus-step-title">{stepLabel}</h2>
          </div>
        ) : (
          <p className="muted-text">{f.noStep}</p>
        )}

        <div className="timer-wrapper">
          <svg className="timer-svg" viewBox="0 0 200 200" aria-hidden="true">
            <circle className="timer-circle-bg" cx="100" cy="100" r="90" />
            <circle
              className="timer-circle-progress"
              cx="100"
              cy="100"
              r="90"
              strokeDasharray={565.48}
              strokeDashoffset={565.48 * (1 - progressRatio)}
            />
          </svg>

          <div className="timer-content">
            <span className="timer-mode-badge">
              {mode === 'work' ? `🎯 ${f.working}` : `🍃 ${f.breakTime}`}
            </span>
            <div className="timer-digits" aria-live="polite">
              {timeFormatted}
            </div>
            <span className="visually-hidden">{f.timeLeft(minutes, seconds)}</span>
          </div>
        </div>

        {/* Breathing Guide Circle during Breaks */}
        {mode === 'break' && (
          <div className={`breathe-guide ${breathePhase} ${settings.motion === 'reduced' ? 'reduced' : ''}`}>
            <span className="breathe-text">
              {breathePhase === 'in' ? `🌬️ ${f.breatheIn}` : `💨 ${f.breatheOut}`}
            </span>
          </div>
        )}

        <div className="timer-controls">
          <button className="btn btn--primary btn--lg" onClick={toggleTimer}>
            {isActive ? f.pause : f.start}
          </button>
          <button className="btn btn--ghost btn--lg" onClick={resetTimer}>
            {f.reset}
          </button>
        </div>

        {/* Custom duration pills */}
        {!isActive && (
          <div className="duration-settings">
            <div className="duration-group">
              <label>{f.focusLength}</label>
              <div className="choice__options">
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
                    {f.min(d)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sensory Sound Machine */}
        <SoundMachine />
      </div>
    </div>
  );
}
