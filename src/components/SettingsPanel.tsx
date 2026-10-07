import { useEffect, useRef } from 'react';
import { useT } from '../i18n';
import { useSettings, type Settings, type Theme, type Font, type Spacing, type Motion, type Density } from '../settings/SettingsContext';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ open, onClose }: Props) {
  const t = useT();
  const s = t.settings;
  const { settings, update, reset } = useSettings();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const themes: { id: Theme; label: string; icon: string; previewBg: string; previewText: string; desc: string }[] = [
    { id: 'light', label: s.themes.light, icon: '☀️', previewBg: '#ffffff', previewText: '#192231', desc: 'Clean, soft crisp daylight' },
    { id: 'cream', label: s.themes.cream, icon: '☕', previewBg: '#f5f0e6', previewText: '#212c26', desc: 'Warm paper tint, reduces eyestrain' },
    { id: 'dark', label: s.themes.dark, icon: '🌙', previewBg: '#1e2523', previewText: '#e6ede8', desc: 'Muted slate, restful for dark rooms' },
    { id: 'contrast', label: s.themes.contrast, icon: '⚡', previewBg: '#000000', previewText: '#ffffff', desc: 'Maximum contrast, pure black & white' },
  ];

  const fonts: { id: Font; label: string; sample: string; desc: string }[] = [
    { id: 'default', label: s.fonts.default, sample: 'Aa Bb 123', desc: 'System UI font' },
    { id: 'hyperlegible', label: s.fonts.hyperlegible, sample: 'Aa Bb 123', desc: 'Braille Institute high-legibility' },
    { id: 'dyslexic', label: s.fonts.dyslexic, sample: 'Aa Bb 123', desc: 'Weighted bottom to stop letter flipping' },
  ];

  const spacings: { id: Spacing; label: string; icon: string }[] = [
    { id: 'normal', label: s.spacing.normal, icon: '☰' },
    { id: 'relaxed', label: s.spacing.relaxed, icon: '☱' },
    { id: 'airy', label: s.spacing.airy, icon: '☵' },
  ];

  const motions: { id: Motion; label: string; icon: string; desc: string }[] = [
    { id: 'full', label: s.motions.full, icon: '🌊', desc: 'Soft fluid transitions' },
    { id: 'reduced', label: s.motions.reduced, icon: '🛑', desc: 'Zero movement / vestibular safe' },
  ];

  const densities: { id: Density; label: string; icon: string; desc: string }[] = [
    { id: 'comfortable', label: s.densities.comfortable, icon: '🪟', desc: 'Full friendly layout' },
    { id: 'minimal', label: s.densities.minimal, icon: '🎯', desc: 'Strip out background noise' },
  ];

  return (
    <dialog
      ref={ref}
      className="settings-modal"
      aria-labelledby="settings-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="settings-container">
        {/* Header */}
        <header className="settings-head">
          <div className="settings-head-title">
            <span className="settings-badge" aria-hidden="true">⚙️</span>
            <div>
              <h2 id="settings-title">{s.title}</h2>
              <p className="settings-subtitle">{s.intro}</p>
            </div>
          </div>
          <button className="icon-btn close-btn" onClick={onClose} aria-label={s.close}>
            ✕
          </button>
        </header>

        {/* Live Preview Card */}
        <div className="settings-preview-banner card">
          <span className="preview-tag">👁️ Live sensory preview</span>
          <p className="preview-text">{s.preview}</p>
        </div>

        {/* Settings Body */}
        <div className="settings-sections">
          {/* 1. Theme Selection */}
          <section className="settings-group">
            <label className="section-title">
              <span>🎨 {s.theme}</span>
            </label>
            <div className="theme-grid">
              {themes.map((th) => {
                const isSelected = settings.theme === th.id;
                return (
                  <button
                    key={th.id}
                    type="button"
                    className={`theme-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => update({ theme: th.id })}
                    aria-pressed={isSelected}
                  >
                    <div
                      className="theme-chip"
                      style={{ background: th.previewBg, color: th.previewText }}
                    >
                      <span>{th.icon}</span>
                      <span className="theme-chip-sample">Aa</span>
                    </div>
                    <div className="theme-meta">
                      <strong>{th.label}</strong>
                      <span className="theme-desc">{th.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 2. Font Selection */}
          <section className="settings-group">
            <label className="section-title">
              <span>📖 {s.font}</span>
            </label>
            <div className="font-grid">
              {fonts.map((f) => {
                const isSelected = settings.font === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    className={`font-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => update({ font: f.id })}
                    aria-pressed={isSelected}
                  >
                    <div className="font-card-header">
                      <strong>{f.label}</strong>
                      {isSelected && <span className="check-badge">✓ Active</span>}
                    </div>
                    <div className={`font-card-sample font-sample--${f.id}`}>
                      {f.sample}
                    </div>
                    <span className="font-card-desc">{f.desc}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 3. Text Scale Slider */}
          <section className="settings-group">
            <div className="slider-header">
              <label htmlFor="font-scale-range" className="section-title">
                <span>🔍 {s.fontSize}</span>
              </label>
              <span className="slider-value-pill">
                {Math.round(settings.fontScale * 100)}%
              </span>
            </div>
            <div className="slider-track-wrap">
              <span className="slider-endpoint">Small (90%)</span>
              <input
                id="font-scale-range"
                className="custom-range"
                type="range"
                min={0.9}
                max={1.45}
                step={0.05}
                value={settings.fontScale}
                onChange={(e) => update({ fontScale: Number(e.target.value) })}
              />
              <span className="slider-endpoint">Large (145%)</span>
            </div>
          </section>

          {/* 4. Spacing */}
          <section className="settings-group">
            <label className="section-title">
              <span>↔️ {s.lineSpacing}</span>
            </label>
            <div className="pill-grid">
              {spacings.map((sp) => (
                <button
                  key={sp.id}
                  type="button"
                  className={`pill-btn ${settings.spacing === sp.id ? 'active' : ''}`}
                  onClick={() => update({ spacing: sp.id })}
                >
                  <span className="pill-icon">{sp.icon}</span>
                  <span>{sp.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* 5. Motion & Density Row */}
          <div className="settings-two-cols">
            <section className="settings-group">
              <label className="section-title">
                <span>🍃 {s.motion}</span>
              </label>
              <div className="stacked-choices">
                {motions.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    className={`stacked-btn ${settings.motion === m.id ? 'active' : ''}`}
                    onClick={() => update({ motion: m.id })}
                  >
                    <span>{m.icon} <strong>{m.label}</strong></span>
                    <small>{m.desc}</small>
                  </button>
                ))}
              </div>
            </section>

            <section className="settings-group">
              <label className="section-title">
                <span>🎯 {s.density}</span>
              </label>
              <div className="stacked-choices">
                {densities.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    className={`stacked-btn ${settings.density === d.id ? 'active' : ''}`}
                    onClick={() => update({ density: d.id })}
                  >
                    <span>{d.icon} <strong>{d.label}</strong></span>
                    <small>{d.desc}</small>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="settings-foot">
          <button type="button" className="btn btn--ghost" onClick={reset}>
            ↺ {s.reset}
          </button>
          <button type="button" className="btn btn--primary" onClick={onClose}>
            ✓ Done & Keep Settings
          </button>
        </footer>
      </div>
    </dialog>
  );
}
