import { useState } from 'react';
import { useT } from '../i18n';
import { useSettings } from '../settings/SettingsContext';
import { type Task } from '../data/content';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (newTask: Task) => void;
}

export default function AddTaskModal({ isOpen, onClose, onAddTask }: Props) {
  const t = useT();
  const a = t.addTask;
  const { settings } = useSettings();
  const isFr = settings.lang === 'fr';

  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [rawText, setRawText] = useState('');
  const [icon, setIcon] = useState('📝');
  const [due, setDue] = useState(() => new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]);

  // AI Magic De-chunker state
  const [isAiDechunking, setIsAiDechunking] = useState(false);
  const [generatedSteps, setGeneratedSteps] = useState<{ label: string; minutes: number }[]>([]);

  if (!isOpen) return null;

  // Simulate smart ADHD cognitive-load breakdown
  const handleAiDechunk = () => {
    if (!title.trim() && !rawText.trim()) return;
    setIsAiDechunking(true);

    setTimeout(() => {
      const subject = (title || 'Assignment').toLowerCase();
      let steps: { label: string; minutes: number }[] = [];

      if (subject.includes('essay') || subject.includes('dissert') || subject.includes('écri')) {
        steps = isFr
          ? [
              { label: 'Ouvrir un doc vierge et écrire 1 seule phrase de thèse', minutes: 3 },
              { label: 'Lister 3 idées principales sous forme de tirets simples', minutes: 5 },
              { label: 'Rédiger le premier paragraphe sans corriger les fautes', minutes: 12 },
              { label: 'Faire une pause respiration de 5 min avant la suite', minutes: 5 },
            ]
          : [
              { label: 'Open a blank doc and write a 1-sentence thesis', minutes: 3 },
              { label: 'Bullet-point 3 main arguments (no full sentences yet)', minutes: 5 },
              { label: 'Draft the intro & paragraph 1 without editing', minutes: 12 },
              { label: 'Take a mandatory 5-min breather before continuing', minutes: 5 },
            ];
      } else if (subject.includes('math') || subject.includes('calcul') || subject.includes('exo')) {
        steps = isFr
          ? [
              { label: 'Relire attentivement la formule ou l’exemple du cours', minutes: 4 },
              { label: 'Résoudre uniquement le premier exercice (n°1)', minutes: 8 },
              { label: 'Vérifier la réponse au brouillon', minutes: 3 },
            ]
          : [
              { label: 'Review the formula and worked example from notes', minutes: 4 },
              { label: 'Solve only Problem #1 without looking ahead', minutes: 8 },
              { label: 'Quick self-check and take a short pause', minutes: 3 },
            ];
      } else {
        steps = isFr
          ? [
              { label: 'Lire et surligner uniquement les 3 mots-clés de la consigne', minutes: 3 },
              { label: 'Définir l’objectif le plus simple et préparer le matériel', minutes: 4 },
              { label: 'Travailler pendant une seule tranche de 10 minutes', minutes: 10 },
              { label: 'Cocher et clôturer cette première étape', minutes: 2 },
            ]
          : [
              { label: 'Read instructions and highlight just 3 action verbs', minutes: 3 },
              { label: 'Set up materials & define the very first tiny milestone', minutes: 4 },
              { label: 'Focus exclusively for a single 10-minute block', minutes: 10 },
              { label: 'Review and celebrate this initial win', minutes: 2 },
            ];
      }

      setGeneratedSteps(steps);
      setIsAiDechunking(false);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    let steps = [];

    if (generatedSteps.length > 0) {
      steps = generatedSteps.map((st, idx) => ({
        id: `ai-step-${Date.now()}-${idx}`,
        minutes: st.minutes,
        label: { en: st.label, fr: st.label },
      }));
    } else {
      const lines = rawText
        .split('\n')
        .map((l) => l.replace(/^[-*•\d.)]\s*/, '').trim())
        .filter((l) => l.length > 0);

      steps =
        lines.length > 0
          ? lines.map((line, idx) => ({
              id: `custom-step-${Date.now()}-${idx}`,
              minutes: 5,
              label: { en: line, fr: line },
            }))
          : a.defaultSteps.map((stepText, idx) => ({
              id: `step-${Date.now()}-${idx}`,
              minutes: idx === 0 ? 3 : idx === 1 ? 10 : 5,
              label: { en: stepText, fr: stepText },
            }));
    }

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: { en: title, fr: title },
      course: { en: course || 'General', fr: course || 'Général' },
      color: '#4f9d69',
      icon: icon || '📝',
      due,
      steps,
    };

    onAddTask(newTask);
    setTitle('');
    setCourse('');
    setRawText('');
    setGeneratedSteps([]);
    onClose();
  };

  return (
    <div className="onboarding-overlay" role="dialog" aria-modal="true" aria-labelledby="add-task-title">
      <div className="onboarding-card card" style={{ maxWidth: '580px' }}>
        <header className="onboarding-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.4rem' }}>🪄</span>
            <h2 id="add-task-title">{a.modalTitle}</h2>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label={a.cancel}>
            ✕
          </button>
        </header>

        <form onSubmit={handleSubmit} className="onboarding-body">
          <p className="muted-text">{a.intro}</p>

          <div className="field">
            <label htmlFor="task-title">{a.titleLabel}</label>
            <input
              id="task-title"
              className="text-input"
              type="text"
              required
              placeholder={a.titlePlaceholder}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="field-row">
            <div className="field" style={{ flex: 1 }}>
              <label htmlFor="task-course">{a.courseLabel}</label>
              <input
                id="task-course"
                className="text-input"
                type="text"
                placeholder={a.coursePlaceholder}
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />
            </div>
            <div className="field" style={{ width: '130px' }}>
              <label htmlFor="task-icon">{a.iconLabel}</label>
              <select
                id="task-icon"
                className="select-input"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
              >
                <option value="📝">📝 Notes</option>
                <option value="🔬">🔬 Science</option>
                <option value="📚">📚 Reading</option>
                <option value="📐">📐 Math</option>
                <option value="💻">💻 Code</option>
              </select>
            </div>
          </div>

          {/* AI Magic Dechunker Trigger */}
          <div className="card ai-dechunker-box">
            <div className="ai-dechunker-header">
              <div>
                <strong>✨ {isFr ? 'Assistant Découpage Anti-Anxiété' : 'AI ADHD Magic De-Chunker'}</strong>
                <p className="muted-text" style={{ margin: 0, fontSize: '0.82rem' }}>
                  {isFr
                    ? 'Déconstruit instantanément la tâche en micro-actions gérables de 3 à 12 minutes.'
                    : 'Instantly breaks complex tasks into gentle 3–12 minute micro-steps.'}
                </p>
              </div>
              <button
                type="button"
                className="btn btn--sm btn--primary"
                onClick={handleAiDechunk}
                disabled={isAiDechunking || (!title.trim() && !rawText.trim())}
              >
                {isAiDechunking ? (isFr ? 'Analyse...' : 'Chunking...') : (isFr ? '🪄 Découper pour moi' : '🪄 De-chunk for me')}
              </button>
            </div>

            {/* AI Generated Preview List */}
            {generatedSteps.length > 0 && (
              <div className="ai-steps-preview">
                <span className="badge badge--accent">
                  ✓ {isFr ? 'Étapes anti-surcharge suggérées :' : 'Suggested ADHD-friendly steps:'}
                </span>
                <ul className="ai-steps-list">
                  {generatedSteps.map((st, i) => (
                    <li key={i}>
                      <span>{st.label}</span>
                      <small className="estimate-badge">⏱️ {st.minutes} min</small>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {generatedSteps.length === 0 && (
            <div className="field" style={{ marginTop: '0.75rem' }}>
              <label htmlFor="task-steps">{a.stepsLabel}</label>
              <textarea
                id="task-steps"
                className="textarea-input"
                rows={2}
                placeholder={a.stepsPlaceholder}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
              />
            </div>
          )}

          <footer className="onboarding-footer" style={{ marginTop: '1.25rem' }}>
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              {a.cancel}
            </button>
            <button type="submit" className="btn btn--primary">
              🌱 {a.submit}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
