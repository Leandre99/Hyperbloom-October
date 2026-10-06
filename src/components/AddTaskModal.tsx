import { useState } from 'react';
import { useT } from '../i18n';
import { type Task } from '../data/content';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (newTask: Task) => void;
}

export default function AddTaskModal({ isOpen, onClose, onAddTask }: Props) {
  const t = useT();
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [rawText, setRawText] = useState('');
  const [icon, setIcon] = useState('📝');
  const [due, setDue] = useState(() => new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Split pasted notes/text into automatic micro-steps
    const lines = rawText
      .split('\n')
      .map((l) => l.replace(/^[-*•\d.)]\s*/, '').trim())
      .filter((l) => l.length > 0);

    const steps =
      lines.length > 0
        ? lines.map((line, idx) => ({
            id: `custom-step-${Date.now()}-${idx}`,
            minutes: 5,
            label: { en: line, fr: line },
          }))
        : [
            { id: `step-${Date.now()}-1`, minutes: 3, label: { en: 'Read & understand instructions', fr: 'Lire et comprendre les consignes' } },
            { id: `step-${Date.now()}-2`, minutes: 10, label: { en: 'Draft first section', fr: 'Rédiger la première partie' } },
            { id: `step-${Date.now()}-3`, minutes: 5, label: { en: 'Review and finish', fr: 'Relire et finaliser' } },
          ];

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
    onClose();
  };

  return (
    <div className="onboarding-overlay" role="dialog" aria-modal="true" aria-labelledby="add-task-title">
      <div className="onboarding-card card">
        <header className="onboarding-header">
          <h2 id="add-task-title">✨ Add & Break Down a Task</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>

        <form onSubmit={handleSubmit} className="onboarding-body">
          <p className="muted-text">
            Feeling overwhelmed? Enter what you need to do, and Calmly will chunk it into manageable, small micro-steps.
          </p>

          <div className="field">
            <label htmlFor="task-title">Task or Assignment Title *</label>
            <input
              id="task-title"
              className="text-input"
              type="text"
              required
              placeholder="e.g. History essay, Lab report..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="field-row">
            <div className="field" style={{ flex: 1 }}>
              <label htmlFor="task-course">Course / Subject</label>
              <input
                id="task-course"
                className="text-input"
                type="text"
                placeholder="e.g. History, Math..."
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />
            </div>
            <div className="field" style={{ width: '130px' }}>
              <label htmlFor="task-icon">Icon</label>
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

          <div className="field">
            <label htmlFor="task-steps">
              Break down steps (Optional: 1 line = 1 step)
            </label>
            <textarea
              id="task-steps"
              className="textarea-input"
              rows={3}
              placeholder="Paste instructions or leave blank to auto-generate 3 calm steps..."
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
            />
          </div>

          <footer className="onboarding-footer" style={{ marginTop: '1rem' }}>
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              🌱 Create & Chunk Task
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
