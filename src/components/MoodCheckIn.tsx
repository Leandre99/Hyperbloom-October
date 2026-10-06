import { useState } from 'react';
import { useT } from '../i18n';

interface Props {
  onLevelSelected?: (level: number) => void;
}

export default function MoodCheckIn({ onLevelSelected }: Props) {
  const t = useT();
  const m = t.mood;
  const emojis = ['🪫', '🌧️', '⛅', '🌱', '☀️'];
  const [selected, setSelected] = useState<number | null>(() => {
    const saved = localStorage.getItem('calmly.energy');
    return saved !== null ? Number(saved) : null;
  });

  const handleSelect = (idx: number) => {
    setSelected(idx);
    localStorage.setItem('calmly.energy', String(idx));
    if (onLevelSelected) onLevelSelected(idx);
  };

  return (
    <section className="mood-card card" aria-labelledby="mood-title">
      <div className="mood-header">
        <h3 id="mood-title">{m.title}</h3>
        <p className="muted-text">{m.hint}</p>
      </div>

      <div className="mood-levels" role="radiogroup" aria-labelledby="mood-title">
        {m.levels.map((lvl, idx) => {
          const isCurrent = selected === idx;
          return (
            <button
              key={lvl}
              type="button"
              role="radio"
              aria-checked={isCurrent}
              className={`mood-btn ${isCurrent ? 'active' : ''}`}
              onClick={() => handleSelect(idx)}
            >
              <span className="mood-emoji" aria-hidden="true">
                {emojis[idx]}
              </span>
              <span className="mood-label">{lvl}</span>
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="mood-feedback" aria-live="polite">
          <span>✓ {m.saved}</span>
          {selected <= 1 && <p className="hard-day-badge">💡 {m.hardDay}</p>}
        </div>
      )}
    </section>
  );
}
