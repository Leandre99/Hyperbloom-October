import { useState } from 'react';
import { useSettings } from '../settings/SettingsContext';
import { useT } from '../i18n';

interface Props {
  onComplete: () => void;
}

export default function OnboardingModal({ onComplete }: Props) {
  const t = useT();
  const o = t.onboarding;
  const s = t.settings;
  const { settings, update } = useSettings();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      localStorage.setItem('calmly.onboarded', 'true');
      onComplete();
    }
  };

  const handleSkip = () => {
    localStorage.setItem('calmly.onboarded', 'true');
    onComplete();
  };

  return (
    <div className="onboarding-overlay" role="dialog" aria-modal="true" aria-labelledby="onboarding-title">
      <div className="onboarding-card card">
        <header className="onboarding-header">
          <span className="badge">{o.stepOf(step, totalSteps)}</span>
          <button className="btn btn--ghost btn--sm" onClick={handleSkip}>
            {o.skip}
          </button>
        </header>

        {step === 1 && (
          <div className="onboarding-body">
            <h2 id="onboarding-title">{o.welcomeTitle}</h2>
            <p className="lead">{o.welcomeText}</p>
            <div className="callout">
              <span className="callout-icon">✨</span>
              <p>
                <strong>{t.appName}</strong> s'adapte à ta façon de penser, pas l'inverse.
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="onboarding-body">
            <h2 id="onboarding-title">{o.readTitle}</h2>
            <p>{o.readText}</p>

            <div className="choice-group">
              <label className="choice-label">{s.font}</label>
              <div className="choice__options">
                {(['default', 'hyperlegible', 'dyslexic'] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    className={`choice-pill ${settings.font === f ? 'active' : ''}`}
                    onClick={() => update({ font: f })}
                  >
                    {s.fonts[f]}
                  </button>
                ))}
              </div>
            </div>

            <div className="choice-group">
              <label className="choice-label">
                {s.fontSize} <span>{Math.round(settings.fontScale * 100)}%</span>
              </label>
              <input
                type="range"
                min={0.9}
                max={1.4}
                step={0.05}
                value={settings.fontScale}
                onChange={(e) => update({ fontScale: Number(e.target.value) })}
              />
            </div>

            <div className="preview-box">
              <p>{s.preview}</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="onboarding-body">
            <h2 id="onboarding-title">{o.lookTitle}</h2>
            <p>{o.lookText}</p>

            <div className="choice-group">
              <label className="choice-label">{s.theme}</label>
              <div className="choice__options">
                {(['light', 'cream', 'dark', 'contrast'] as const).map((thm) => (
                  <button
                    key={thm}
                    type="button"
                    className={`choice-pill ${settings.theme === thm ? 'active' : ''}`}
                    onClick={() => update({ theme: thm })}
                  >
                    {s.themes[thm]}
                  </button>
                ))}
              </div>
            </div>

            <div className="choice-group">
              <label className="choice-label">{s.motion}</label>
              <div className="choice__options">
                {(['full', 'reduced'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`choice-pill ${settings.motion === m ? 'active' : ''}`}
                    onClick={() => update({ motion: m })}
                  >
                    {s.motions[m]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="onboarding-body">
            <h2 id="onboarding-title">{o.calmTitle}</h2>
            <p>{o.calmText}</p>

            <div className="choice-group">
              <label className="choice-label">{s.density}</label>
              <div className="choice__options">
                {(['comfortable', 'minimal'] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    className={`choice-pill ${settings.density === d ? 'active' : ''}`}
                    onClick={() => update({ density: d })}
                  >
                    {s.densities[d]}
                  </button>
                ))}
              </div>
            </div>

            <div className="callout callout--success">
              <span className="callout-icon">🌱</span>
              <p>{o.doneTitle}</p>
            </div>
          </div>
        )}

        <footer className="onboarding-footer">
          {step > 1 ? (
            <button className="btn btn--ghost" onClick={() => setStep(step - 1)}>
              {o.back}
            </button>
          ) : <div />}
          <button className="btn btn--primary" onClick={handleNext}>
            {step === 1 ? o.start : step === totalSteps ? o.finish : o.next}
          </button>
        </footer>
      </div>
    </div>
  );
}
