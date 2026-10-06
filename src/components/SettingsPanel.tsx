import { useEffect, useRef } from 'react';
import { useT } from '../i18n';
import { useSettings, type Settings } from '../settings/SettingsContext';

interface Props {
  open: boolean;
  onClose: () => void;
}

/** Generic accessible segmented radio group. */
function Choice<K extends keyof Settings>({
  name,
  legend,
  value,
  options,
  onChange,
}: {
  name: K;
  legend: string;
  value: Settings[K];
  options: { value: Settings[K]; label: string }[];
  onChange: (v: Settings[K]) => void;
}) {
  return (
    <fieldset className="choice">
      <legend>{legend}</legend>
      <div className="choice__options">
        {options.map((o) => (
          <label key={String(o.value)} className="choice__option">
            <input
              type="radio"
              name={name}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
            />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
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

  return (
    <dialog
      ref={ref}
      className="settings"
      aria-labelledby="settings-title"
      onClose={onClose}
      onClick={(e) => {
        // click on the backdrop closes the dialog
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="settings__inner">
        <header className="settings__header">
          <h2 id="settings-title">{s.title}</h2>
          <button className="icon-btn" onClick={onClose} aria-label={s.close}>
            <span aria-hidden="true">✕</span>
          </button>
        </header>
        <p className="settings__intro">{s.intro}</p>

        <p className="settings__preview" aria-live="polite">
          {s.preview}
        </p>

        <Choice
          name="theme"
          legend={s.theme}
          value={settings.theme}
          onChange={(theme) => update({ theme })}
          options={(['cream', 'light', 'dark', 'contrast'] as const).map((v) => ({ value: v, label: s.themes[v] }))}
        />
        <Choice
          name="font"
          legend={s.font}
          value={settings.font}
          onChange={(font) => update({ font })}
          options={(['default', 'hyperlegible', 'dyslexic'] as const).map((v) => ({ value: v, label: s.fonts[v] }))}
        />

        <div className="field">
          <label htmlFor="font-scale">
            {s.fontSize} <output htmlFor="font-scale">{Math.round(settings.fontScale * 100)}%</output>
          </label>
          <input
            id="font-scale"
            type="range"
            min={0.9}
            max={1.5}
            step={0.05}
            value={settings.fontScale}
            onChange={(e) => update({ fontScale: Number(e.target.value) })}
          />
        </div>

        <Choice
          name="spacing"
          legend={s.lineSpacing}
          value={settings.spacing}
          onChange={(spacing) => update({ spacing })}
          options={(['normal', 'relaxed', 'airy'] as const).map((v) => ({ value: v, label: s.spacing[v] }))}
        />
        <Choice
          name="motion"
          legend={s.motion}
          value={settings.motion}
          onChange={(motion) => update({ motion })}
          options={(['full', 'reduced'] as const).map((v) => ({ value: v, label: s.motions[v] }))}
        />
        <Choice
          name="density"
          legend={s.density}
          value={settings.density}
          onChange={(density) => update({ density })}
          options={(['comfortable', 'minimal'] as const).map((v) => ({ value: v, label: s.densities[v] }))}
        />

        <button className="btn btn--ghost" onClick={reset}>
          {s.reset}
        </button>
      </div>
    </dialog>
  );
}
