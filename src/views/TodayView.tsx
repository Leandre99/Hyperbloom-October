import { useState } from 'react';
import { tasks, type Task } from '../data/content';
import { useSettings } from '../settings/SettingsContext';
import { useT } from '../i18n';
import MoodCheckIn from '../components/MoodCheckIn';
import GrowthGarden, { getGardenStage } from '../components/GrowthGarden';
import AddTaskModal from '../components/AddTaskModal';

interface Props {
  onStartFocus: (stepId: string, label: string) => void;
  onOpenLesson: (lessonId: string) => void;
}

export default function TodayView({ onStartFocus, onOpenLesson }: Props) {
  const t = useT();
  const { settings } = useSettings();
  const lang = settings.lang;

  const [taskList, setTaskList] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('calmly.tasks');
      return saved ? JSON.parse(saved) : tasks;
    } catch {
      return tasks;
    }
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Stored completed steps
  const [completedSteps, setCompletedSteps] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('calmly.completedSteps');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [energyLevel, setEnergyLevel] = useState<number | null>(() => {
    const saved = localStorage.getItem('calmly.energy');
    return saved !== null ? Number(saved) : null;
  });

  const [showLater, setShowLater] = useState(false);

  const handleAddTask = (newTask: Task) => {
    const updated = [newTask, ...taskList];
    setTaskList(updated);
    localStorage.setItem('calmly.tasks', JSON.stringify(updated));
  };

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) => {
      const next = prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId];
      localStorage.setItem('calmly.completedSteps', JSON.stringify(next));
      return next;
    });
  };

  // Determine current active task and next step
  const activeTask: Task = taskList[0] || tasks[0];
  const activeSteps = activeTask.steps;
  const doneCount = activeSteps.filter((s) => completedSteps.includes(s.id)).length;
  const isTaskComplete = doneCount === activeSteps.length;
  const nextUnfinishedStep = activeSteps.find((s) => !completedSteps.includes(s.id));

  const isHardDay = energyLevel !== null && energyLevel <= 1;
  const gardenStage = getGardenStage(completedSteps.length, lang === 'fr');

  return (
    <div className="view today-view">
      <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1>{t.today.greeting(t.today.defaultName)}</h1>
          <p className="lead">{t.today.subtitle}</p>
        </div>
        <div className="header-actions" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <a
            href="#garden-section"
            className="garden-header-pill"
            aria-label={lang === 'fr' ? 'Accéder à mon jardin botanique' : 'Jump to my botanical garden'}
          >
            <span className="garden-pill-icon">{gardenStage.icon}</span>
            <span className="garden-pill-text">
              {lang === 'fr'
                ? `Jardin : Stade ${gardenStage.level}/5 (${gardenStage.title}) • ${completedSteps.length} étape${completedSteps.length > 1 ? 's' : ''}`
                : `Garden: Stage ${gardenStage.level}/5 (${gardenStage.title}) • ${completedSteps.length} step${completedSteps.length > 1 ? 's' : ''}`}
            </span>
          </a>
          <button className="btn btn--primary" onClick={() => setIsAddModalOpen(true)}>
            ➕ {t.addTask.btn}
          </button>
        </div>
      </header>
      {isHardDay && <div className="banner banner--calm">🌱 {t.today.hardDayOn}</div>}

      {/* Energy Check-in */}
      <MoodCheckIn onLevelSelected={(lvl) => setEnergyLevel(lvl)} />

      {/* Focus / Next Up Card */}
      <section className="next-up-section" aria-labelledby="next-up-title">
        <div className="section-label-group">
          <span className="badge badge--accent">{t.today.nextUp}</span>
          <span className="course-tag">{activeTask.course[lang]}</span>
        </div>

        <div className="card next-up-card">
          <div className="card-header-row">
            <span className="task-icon" aria-hidden="true">
              {activeTask.icon}
            </span>
            <div className="task-title-group">
              <h2 id="next-up-title">{activeTask.title[lang]}</h2>
              <p className="task-progress-label">
                {t.today.stepProgress(doneCount, activeSteps.length)}
              </p>
            </div>
          </div>

          <div className="progress-bar-container" role="progressbar" aria-valuenow={doneCount} aria-valuemin={0} aria-valuemax={activeSteps.length}>
            <div
              className="progress-bar-fill"
              style={{ width: `${(doneCount / activeSteps.length) * 100}%` }}
            />
          </div>

          {/* Micro-steps list */}
          <div className="micro-steps-list">
            {activeSteps.map((step, idx) => {
              const isDone = completedSteps.includes(step.id);
              const isCurrentNext = !isDone && nextUnfinishedStep?.id === step.id;

              if (settings.density === 'minimal' && !isCurrentNext && !isDone) {
                if (idx > (activeSteps.indexOf(nextUnfinishedStep || activeSteps[0]) + 1)) return null;
              }

              return (
                <div
                  key={step.id}
                  className={`micro-step-item ${isDone ? 'done' : ''} ${isCurrentNext ? 'current' : ''}`}
                >
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => toggleStep(step.id)}
                      aria-label={t.task.markDone(step.label[lang])}
                    />
                    <span className="checkbox-custom" aria-hidden="true">
                      {isDone ? '✓' : ''}
                    </span>
                    <span className="step-label-text">{step.label[lang]}</span>
                  </label>

                  <div className="step-actions">
                    <span className="estimate-badge">⏱️ {t.task.estimate(step.minutes)}</span>
                    {!isDone && (
                      <button
                        type="button"
                        className="btn btn--sm btn--primary"
                        onClick={() => onStartFocus(step.id, step.label[lang])}
                      >
                        🎯 {t.focus.start}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {isTaskComplete && (
            <div className="task-completed-message alert alert--success">
              {t.today.allDone}
            </div>
          )}

          {activeTask.lessonId && (
            <div className="task-footer">
              <button
                type="button"
                className="btn btn--soft btn--open-lesson"
                onClick={() => onOpenLesson(activeTask.lessonId!)}
              >
                📖 {t.task.openLesson}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Gentle Growth Garden */}
      <GrowthGarden completedCount={completedSteps.length} />

      {/* Task Creation Modal */}
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTask={handleAddTask}
      />

      {/* Later Tasks (Collapsible to prevent overwhelm) */}
      {!isHardDay && (
        <section className="later-tasks-section">
          <button
            className="btn btn--ghost collapse-btn"
            onClick={() => setShowLater(!showLater)}
            aria-expanded={showLater}
          >
            {showLater ? t.today.hideLater : t.today.showLater(tasks.length - 1)}
          </button>

          {showLater && (
            <div className="later-tasks-grid">
              {tasks.slice(1).map((task) => (
                <div key={task.id} className="card later-task-card">
                  <div className="later-task-header">
                    <span className="task-icon">{task.icon}</span>
                    <div>
                      <h3>{task.title[lang]}</h3>
                      <span className="due-label">
                        {t.today.due}: {task.due}
                      </span>
                    </div>
                  </div>
                  <p className="task-steps-count">
                    {task.steps.length} {t.task.microSteps.toLowerCase()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
