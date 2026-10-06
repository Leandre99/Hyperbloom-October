import { useState, useEffect } from 'react';
import { SettingsProvider, useSettings } from './settings/SettingsContext';
import { useT } from './i18n';
import SettingsPanel from './components/SettingsPanel';
import OnboardingModal from './components/OnboardingModal';
import TodayView from './views/TodayView';
import FocusView from './views/FocusView';
import LessonsView from './views/LessonsView';
import CaseStudyView from './views/CaseStudyView';
import './styles/tokens.css';
import './styles/base.css';

type Tab = 'today' | 'lessons' | 'focus' | 'caseStudy';

function CalmlyApp() {
  const t = useT();
  const { settings, update } = useSettings();
  const [currentTab, setCurrentTab] = useState<Tab>('today');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Focus mode parameters
  const [focusStepLabel, setFocusStepLabel] = useState<string | undefined>(undefined);

  // Lessons parameters
  const [selectedLessonId, setSelectedLessonId] = useState<string | undefined>(undefined);

  // Check if first-time user
  useEffect(() => {
    const onboarded = localStorage.getItem('calmly.onboarded');
    if (!onboarded) {
      setIsOnboardingOpen(true);
    }
  }, []);

  const handleStartFocus = (_stepId: string, label: string) => {
    setFocusStepLabel(label);
    setCurrentTab('focus');
  };

  const handleOpenLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setCurrentTab('lessons');
  };

  const handleToggleLang = () => {
    update({ lang: settings.lang === 'en' ? 'fr' : 'en' });
  };

  return (
    <div className="shell">
      {/* Accessibility Skip Link */}
      <a href="#main-content" className="skip-link">
        {t.skipToContent}
      </a>

      {/* Top Bar / Header */}
      <header className="topbar">
        <a
          href="#today"
          className="brand"
          onClick={(e) => {
            e.preventDefault();
            setCurrentTab('today');
          }}
        >
          <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" width={32} height={32} />
          <span>{t.appName}</span>
        </a>

        <nav className="nav" aria-label={t.nav.mainNav}>
          <button
            type="button"
            className={`nav-btn ${currentTab === 'today' ? 'active' : ''}`}
            onClick={() => setCurrentTab('today')}
            aria-current={currentTab === 'today' ? 'page' : undefined}
          >
            {t.nav.today}
          </button>
          <button
            type="button"
            className={`nav-btn ${currentTab === 'lessons' ? 'active' : ''}`}
            onClick={() => {
              setSelectedLessonId(undefined);
              setCurrentTab('lessons');
            }}
            aria-current={currentTab === 'lessons' ? 'page' : undefined}
          >
            {t.nav.lessons}
          </button>
          <button
            type="button"
            className={`nav-btn ${currentTab === 'focus' ? 'active' : ''}`}
            onClick={() => setCurrentTab('focus')}
            aria-current={currentTab === 'focus' ? 'page' : undefined}
          >
            {t.nav.focus}
          </button>
          <button
            type="button"
            className={`nav-btn ${currentTab === 'caseStudy' ? 'active' : ''}`}
            onClick={() => setCurrentTab('caseStudy')}
            aria-current={currentTab === 'caseStudy' ? 'page' : undefined}
          >
            {t.nav.caseStudy}
          </button>
        </nav>

        <div className="topbar__actions">
          {/* Language Switcher */}
          <div className="lang-switch" role="group" aria-label={t.lang.label}>
            <button
              type="button"
              aria-pressed={settings.lang === 'en'}
              onClick={() => update({ lang: 'en' })}
            >
              EN
            </button>
            <button
              type="button"
              aria-pressed={settings.lang === 'fr'}
              onClick={() => update({ lang: 'fr' })}
            >
              FR
            </button>
          </div>

          {/* Comfort Settings Button */}
          <button
            type="button"
            className="icon-btn"
            onClick={() => setIsSettingsOpen(true)}
            aria-label={t.nav.settings}
            title={t.nav.settings}
          >
            ⚙️
          </button>
        </div>
      </header>

      {/* Main Content View Container */}
      <main id="main-content" className="page" tabIndex={-1}>
        {currentTab === 'today' && (
          <TodayView onStartFocus={handleStartFocus} onOpenLesson={handleOpenLesson} />
        )}
        {currentTab === 'lessons' && <LessonsView initialLessonId={selectedLessonId} />}
        {currentTab === 'focus' && (
          <FocusView stepLabel={focusStepLabel} onExit={() => setCurrentTab('today')} />
        )}
        {currentTab === 'caseStudy' && <CaseStudyView />}
      </main>

      {/* Modals & Panels */}
      <SettingsPanel open={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      {isOnboardingOpen && <OnboardingModal onComplete={() => setIsOnboardingOpen(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <CalmlyApp />
    </SettingsProvider>
  );
}
