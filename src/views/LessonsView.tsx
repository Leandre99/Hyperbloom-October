import { useState, useEffect, useRef } from 'react';
import { lessons, type Lesson } from '../data/content';
import { useT } from '../i18n';
import { useSettings } from '../settings/SettingsContext';

interface Props {
  initialLessonId?: string;
}

export default function LessonsView({ initialLessonId }: Props) {
  const t = useT();
  const r = t.reader;
  const { settings } = useSettings();
  const lang = settings.lang;

  const [activeLesson, setActiveLesson] = useState<Lesson | null>(() => {
    if (initialLessonId) {
      return lessons.find((l) => l.id === initialLessonId) || null;
    }
    return null;
  });

  // Reading Ruler State
  const [showRuler, setShowRuler] = useState(false);
  const [rulerTop, setRulerTop] = useState(150);

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
        <header className="page-header">
          <h1>{t.lessons.title}</h1>
          <p className="lead">{t.lessons.subtitle}</p>
        </header>

        <div className="lessons-grid">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="card lesson-card">
              <span className="lesson-icon" aria-hidden="true">
                {lesson.icon}
              </span>
              <div className="lesson-content">
                <span className="course-tag">{lesson.course[lang]}</span>
                <h3>{lesson.title[lang]}</h3>
                <span className="read-time-badge">⏱️ {t.lessons.minutes(lesson.minutes)}</span>
              </div>
              <button
                className="btn btn--primary"
                onClick={() => setActiveLesson(lesson)}
              >
                {t.lessons.open}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
          {/* Reading Ruler Toggle */}
          <button
            type="button"
            className={`btn btn--sm ${showRuler ? 'btn--primary' : 'btn--ghost'}`}
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
          <span className="course-tag">{activeLesson.course[lang]}</span>
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

        {/* Lesson Paragraphs */}
        <div className="lesson-body">
          {activeLesson.paragraphs.map((p, idx) => (
            <p
              key={idx}
              className={`lesson-paragraph ${currentParagraphIdx === idx ? 'highlighted' : ''}`}
            >
              {p[lang]}
            </p>
          ))}
        </div>

        <footer className="reader-footer">
          <button className="btn btn--primary" onClick={() => setActiveLesson(null)}>
            ✓ {r.finished}
          </button>
        </footer>
      </article>
    </div>
  );
}
