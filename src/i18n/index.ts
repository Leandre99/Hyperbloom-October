import { useSettings } from '../settings/SettingsContext';
import { en, type Dict } from './en';
import { fr } from './fr';

const dictionaries: Record<'en' | 'fr', Dict> = { en, fr };

/** Returns the typed dictionary for the current language: `const t = useT(); t.nav.today` */
export function useT(): Dict {
  const { settings } = useSettings();
  return dictionaries[settings.lang];
}
