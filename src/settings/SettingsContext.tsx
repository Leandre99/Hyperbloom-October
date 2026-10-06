import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Theme = 'light' | 'cream' | 'dark' | 'contrast';
export type Font = 'default' | 'hyperlegible' | 'dyslexic';
export type Spacing = 'normal' | 'relaxed' | 'airy';
export type Motion = 'full' | 'reduced';
export type Density = 'comfortable' | 'minimal';
export type Lang = 'en' | 'fr';

export interface Settings {
  theme: Theme;
  font: Font;
  fontScale: number; // 0.9 – 1.5
  spacing: Spacing;
  motion: Motion;
  density: Density;
  lang: Lang;
}

const STORAGE_KEY = 'calmly.settings.v1';

function systemDefaults(): Settings {
  const mq = (q: string) => typeof window !== 'undefined' && window.matchMedia?.(q).matches;
  const browserLang = typeof navigator !== 'undefined' ? navigator.language : 'en';
  return {
    theme: mq('(prefers-contrast: more)') ? 'contrast' : mq('(prefers-color-scheme: dark)') ? 'dark' : 'cream',
    font: 'default',
    fontScale: 1,
    spacing: 'relaxed',
    motion: mq('(prefers-reduced-motion: reduce)') ? 'reduced' : 'full',
    density: 'comfortable',
    lang: browserLang.toLowerCase().startsWith('fr') ? 'fr' : 'en',
  };
}

function load(): Settings {
  const defaults = systemDefaults();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
  } catch {
    return defaults;
  }
}

interface SettingsCtx {
  settings: Settings;
  update: (patch: Partial<Settings>) => void;
  reset: () => void;
}

const Ctx = createContext<SettingsCtx | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(load);

  // Reflect settings on <html> so pure CSS can react to them.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = settings.theme;
    root.dataset.font = settings.font;
    root.dataset.spacing = settings.spacing;
    root.dataset.motion = settings.motion;
    root.dataset.density = settings.density;
    root.style.setProperty('--font-scale', String(settings.fontScale));
    root.lang = settings.lang;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const value = useMemo<SettingsCtx>(
    () => ({
      settings,
      update: (patch) => setSettings((s) => ({ ...s, ...patch })),
      reset: () => setSettings({ ...systemDefaults(), lang: settings.lang }),
    }),
    [settings],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSettings() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useSettings must be used inside SettingsProvider');
  return ctx;
}
