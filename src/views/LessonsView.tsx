import { useState, useEffect, useRef } from 'react';
import { lessons, type Lesson } from '../data/content';
import { useT } from '../i18n';
import { useSettings } from '../settings/SettingsContext';

interface Props {
  initialLessonId?: string;
}

/** Formats a text into Bionic Reading (bolding the fixation anchor of each word) */
function renderBionicText(text: string) {
  const words = text.split(' ');
  return words.map((word, wIdx) => {
    if (!word) return null;
    const cleanWord = word.trim();
    // Bionic fixation: bold ~40-50% of the word
    const mid = Math.ceil(cleanWord.length * 0.45);
    const head = cleanWord.slice(0, mid);
    const tail = cleanWord.slice(mid);

    return (
      <span key={wIdx} className="bionic-word">
        <strong className="bionic-bold">{head}</strong>
        <span>{tail}</span>{' '}
      </span>
    );
  });
}

export default function LessonsView({ initialLessonId }: Props) {
  const t = useT();
  const r = t.reader;
  const { settings } = useSettings();
  const lang = settings.lang;
  const isFr = lang === 'fr';

  const [activeLesson, setActiveLesson] = useState<Lesson | null>(() => {
    if (initialLessonId) {
      return lessons.find((l) => l.id === initialLessonId) || null;
    }
    return null;
  });

  // Track completed lessons persisted in localStorage
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('calmly.completedLessons');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessons((prev) => {
      const next = prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId];
      try {
        localStorage.setItem('calmly.completedLessons', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Reading Ruler State
  const [showRuler, setShowRuler] = useState(false);
  const [rulerTop, setRulerTop] = useState(150);

  // Bionic Reading Toggle
  const [isBionic, setIsBionic] = useState(false);

  // Text to Speech State
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const [currentParagraphIdx, setCurrentParagraphIdx] = useState<number | null>(null);

  const synthRef = useRef<SpeechSynthesis | null>(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Mouse move listener for reading ruler
  const handleMouseMove = (e: React.MouseEvent) => {
    if (showRuler) {
      setRulerTop(e.clientY - 20);
    }
  };

  // Stop speech when changing lesson or leaving
  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [activeLesson]);

  const handleSpeak = () => {
    if (!synthRef.current || !activeLesson) return;

    if (isPlaying) {
      synthRef.current.cancel();
      setIsPlaying(false);
      setCurrentParagraphIdx(null);
      return;
    }

    const fullText = activeLesson.paragraphs.map((p) => p[lang]).join('. ');
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = lang === 'fr' ? 'fr-FR' : 'en-US';
    utterance.rate = speechRate;

    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentParagraphIdx(null);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setCurrentParagraphIdx(null);
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
    setIsPlaying(true);
  };

  const handleSpeedChange = (rate: number) => {
    setSpeechRate(rate);
    if (isPlaying && synthRef.current) {
      synthRef.current.cancel();
      setIsPlaying(false);
    }
  };

  // If no lesson is currently selected, show the lessons catalogue
  if (!activeLesson) {
    return (
      <div className="view lessons-catalogue">
        <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1>{t.lessons.title}</h1>
            <p className="lead">{t.lessons.subtitle}</p>
          </div>
          <span className="badge badge--accent" style={{ fontSize: '0.9rem', padding: '0.45rem 0.9rem' }}>
            📚 {completedLessons.length} / {lessons.length} {isFr ? 'leçons terminées' : 'lessons completed'}
          </span>
        </header>

        <div className="lessons-grid">
          {lessons.map((lesson) => {
            const isLessonDone = completedLessons.includes(lesson.id);
            return (
              <div key={lesson.id} className="card lesson-card">
                <span className="lesson-icon" aria-hidden="true">
                  {lesson.icon}
                </span>
                <div className="lesson-content">
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                    <span className="course-tag">{lesson.course[lang]}</span>
                    {isLessonDone && (
                      <span className="badge badge--success">
                        ✓ {isFr ? 'Terminée' : 'Completed'}
                      </span>
                    )}
                  </div>
                  <h3>{lesson.title[lang]}</h3>
                  <span className="read-time-badge">⏱️ {t.lessons.minutes(lesson.minutes)}</span>
                </div>
                <button
                  className={`btn ${isLessonDone ? 'btn--soft' : 'btn--primary'}`}
                  onClick={() => setActiveLesson(lesson)}
                >
                  {isLessonDone ? (isFr ? 'Relire la leçon' : 'Review lesson') : t.lessons.open}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const isCurrentLessonDone = completedLessons.includes(activeLesson.id);

  // Active Reader View
  return (
    <div className="view reader-view" onMouseMove={handleMouseMove}>
      {/* Visual Reading Ruler following cursor */}
      {showRuler && (
        <div
          className="reading-ruler"
          style={{ top: `${rulerTop}px` }}
          aria-hidden="true"
        />
      )}

      <div className="reader-toolbar">
        <button className="btn btn--ghost" onClick={() => setActiveLesson(null)}>
          ← {r.back}
        </button>

        <div className="reader-actions">
          {/* Bionic Reading Toggle */}
          <button
            type="button"
            className={`btn btn--sm ${isBionic ? 'btn--accent' : 'btn--ghost'}`}
            onClick={() => setIsBionic(!isBionic)}
            aria-pressed={isBionic}
            title={isFr ? "Active la fixation visuelle guidée (Bionic Reading)" : "Toggle Bionic Reading fixation guides"}
          >
            ⚡ {isFr ? 'Lecture Bionique' : 'Bionic Reading'}
          </button>

          {/* Reading Ruler Toggle */}
          <button
            type="button"
            className={`btn btn--sm ${showRuler ? 'btn--accent' : 'btn--ghost'}`}
            onClick={() => setShowRuler(!showRuler)}
            aria-pressed={showRuler}
          >
            📏 {r.ruler}
          </button>

          {/* Text-to-Speech Controls */}
          {synthRef.current ? (
            <div className="tts-controls">
              <button
                type="button"
                className={`btn btn--sm ${isPlaying ? 'btn--accent' : 'btn--soft'}`}
                onClick={handleSpeak}
              >
                {isPlaying ? `⏸️ ${r.stop}` : `🔊 ${r.listen}`}
              </button>

              <select
                className="speed-select"
                value={speechRate}
                onChange={(e) => handleSpeedChange(Number(e.target.value))}
                aria-label={r.speed}
              >
                <option value={0.8}>0.8x</option>
                <option value={1}>1.0x</option>
                <option value={1.2}>1.2x</option>
              </select>
            </div>
          ) : (
            <span className="muted-text">{r.noVoice}</span>
          )}
        </div>
      </div>

      <article className="reader-article card">
        <header className="reader-header">
          <div className="reader-badge-row">
            <span className="course-tag">{activeLesson.course[lang]}</span>
            {isCurrentLessonDone && (
              <span className="badge badge--success">
                ✓ {r.finishedDone}
              </span>
            )}
            {isBionic && (
              <span className="badge badge--accent">
                ⚡ {isFr ? 'Mode Bionique Actif' : 'Bionic Reading On'}
              </span>
            )}
          </div>
          <h1>{activeLesson.title[lang]}</h1>
          <span className="read-time-badge">⏱️ {t.lessons.minutes(activeLesson.minutes)}</span>
        </header>

        {/* Key Ideas Quick Box */}
        <div className="key-ideas-box">
          <h3>💡 {r.keyIdeas}</h3>
          <ul>
            {activeLesson.keyIdeas.map((idea, i) => (
              <li key={i}>{idea[lang]}</li>
            ))}
          </ul>
        </div>

        {/* Lesson Paragraphs with optional Bionic Reading support */}
        <div className="lesson-body">
          {activeLesson.paragraphs.map((p, idx) => (
            <p
              key={idx}
              className={`lesson-paragraph ${currentParagraphIdx === idx ? 'highlighted' : ''}`}
            >
              {isBionic ? renderBionicText(p[lang]) : p[lang]}
            </p>
          ))}
        </div>

        <footer className="reader-footer" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <button
              type="button"
              className={`btn btn--lg ${isCurrentLessonDone ? 'btn--accent' : 'btn--primary'}`}
              onClick={() => toggleLessonComplete(activeLesson.id)}
              aria-pressed={isCurrentLessonDone}
            >
              {isCurrentLessonDone ? `✓ ${r.finishedDone}` : `✓ ${r.finished}`}
            </button>

            <button type="button" className="btn btn--ghost" onClick={() => setActiveLesson(null)}>
              ← {r.back}
            </button>
          </div>

          {isCurrentLessonDone && (
            <div className="alert alert--success" style={{ margin: 0 }}>
              {isFr
                ? 'Bravo ! Cette leçon est validée sans fatigue cognitive. Tu peux la relire quand tu veux.'
                : 'Great job! This lesson is marked complete without cognitive strain. You can review it anytime.'}
            </div>
          )}
        </footer>
      </article>
    </div>
  );
}
