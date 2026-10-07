import { useT } from '../i18n';
import { useSettings } from '../settings/SettingsContext';

interface Props {
  completedCount: number;
}

export interface StageInfo {
  level: number;
  title: string;
  min: number;
  nextThreshold: number | null;
  desc: string;
  icon: string;
}

export function getGardenStage(count: number, isFr: boolean): StageInfo {
  if (count === 0) {
    return {
      level: 1,
      title: isFr ? 'Graine en terre' : 'Dormant Seed',
      min: 0,
      nextThreshold: 1,
      icon: '🌱',
      desc: isFr
        ? 'Valide ta première micro-étape pour faire germer la pousse.'
        : 'Complete your first micro-step to spark life.',
    };
  }
  if (count < 3) {
    return {
      level: 2,
      title: isFr ? 'Jeune Pousse' : 'Fresh Sprout',
      min: 1,
      nextThreshold: 3,
      icon: '🌿',
      desc: isFr
        ? 'La graine a percé le sol ! Chaque micro-action compte.'
        : 'The sprout has emerged. Small consistent steps win.',
    };
  }
  if (count < 6) {
    return {
      level: 3,
      title: isFr ? 'Jeune Arbrisseau' : 'Sturdy Sapling',
      min: 3,
      nextThreshold: 6,
      icon: '🌳',
      desc: isFr
        ? 'Des racines solides se forment. Ta concentration grandit pas à pas.'
        : 'Deep roots are forming. Focus is building up step by step.',
    };
  }
  if (count < 10) {
    return {
      level: 4,
      title: isFr ? 'Plante Épanouie' : 'Thriving Plant',
      min: 6,
      nextThreshold: 10,
      icon: '🪴',
      desc: isFr
        ? 'Feuillage abondant. Ton cerveau a trouvé son rythme calme.'
        : 'Dense lush foliage. Your mind is in a peaceful groove.',
    };
  }
  return {
    level: 5,
    title: isFr ? 'Floraison Épanouie' : 'Blooming Sanctuary',
    min: 10,
    nextThreshold: null,
    icon: '🌸',
    desc: isFr
      ? 'Félicitations ! Une floraison complète sans la moindre culpabilité ni pression de streak.'
      : 'Masterful accomplishment! A blooming sanctuary with zero guilt or streak anxiety.',
  };
}

export default function GrowthGarden({ completedCount }: Props) {
  const t = useT();
  const { settings } = useSettings();
  const isFr = settings.lang === 'fr';

  const stage = getGardenStage(completedCount, isFr);

  // SVG representation for each stage
  const renderSvg = () => {
    switch (stage.level) {
      case 1:
        return (
          <svg viewBox="0 0 100 100" className="garden-svg" aria-hidden="true">
            <ellipse cx="50" cy="85" rx="35" ry="8" fill="var(--border)" opacity="0.5" />
            <ellipse cx="50" cy="78" rx="8" ry="12" fill="#7a5530" transform="rotate(-15 50 78)" />
            <circle cx="50" cy="74" r="3" fill="#9c7348" />
          </svg>
        );
      case 2:
        return (
          <svg viewBox="0 0 100 100" className="garden-svg" aria-hidden="true">
            <ellipse cx="50" cy="85" rx="35" ry="8" fill="var(--border)" opacity="0.5" />
            <path d="M50 82 Q50 60 48 50" stroke="#3d7e52" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M48 56 Q35 45 40 38 Q50 48 48 56 Z" fill="#68bb7d" />
            <path d="M48 50 Q62 42 58 35 Q48 44 48 50 Z" fill="#4fa465" />
          </svg>
        );
      case 3:
        return (
          <svg viewBox="0 0 100 100" className="garden-svg" aria-hidden="true">
            <ellipse cx="50" cy="85" rx="35" ry="8" fill="var(--border)" opacity="0.5" />
            <path d="M50 85 Q52 50 50 30" stroke="#2e5d3d" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M50 60 Q30 50 32 38 Q46 48 50 60 Z" fill="#52a768" />
            <path d="M50 48 Q68 40 65 28 Q52 38 50 48 Z" fill="#68bb7d" />
            <path d="M50 32 Q45 18 50 12 Q56 20 50 32 Z" fill="#80cf94" />
          </svg>
        );
      case 4:
        return (
          <svg viewBox="0 0 100 100" className="garden-svg" aria-hidden="true">
            <ellipse cx="50" cy="88" rx="40" ry="8" fill="var(--border)" opacity="0.5" />
            <path d="M35 70 L65 70 L60 90 L40 90 Z" fill="#c47a4f" />
            <rect x="33" y="66" width="34" height="6" rx="3" fill="#b0673d" />
            <path d="M50 68 Q50 40 50 25" stroke="#2e5d3d" strokeWidth="5" fill="none" strokeLinecap="round" />
            <circle cx="50" cy="35" r="18" fill="#4fa465" opacity="0.9" />
            <circle cx="38" cy="42" r="14" fill="#68bb7d" opacity="0.95" />
            <circle cx="62" cy="42" r="14" fill="#3d7e52" opacity="0.95" />
            <circle cx="50" cy="22" r="12" fill="#80cf94" />
          </svg>
        );
      case 5:
      default:
        return (
          <svg viewBox="0 0 100 100" className="garden-svg" aria-hidden="true">
            <ellipse cx="50" cy="88" rx="40" ry="8" fill="var(--border)" opacity="0.5" />
            <path d="M50 85 Q48 55 50 35" stroke="#2e5d3d" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M50 60 Q30 54 32 42 Q46 50 50 60 Z" fill="#52a768" />
            <path d="M50 50 Q70 44 68 32 Q52 42 50 50 Z" fill="#68bb7d" />
            <circle cx="50" cy="26" r="10" fill="#f79bb4" />
            <circle cx="40" cy="33" r="10" fill="#f9a8be" />
            <circle cx="60" cy="33" r="10" fill="#f9a8be" />
            <circle cx="44" cy="45" r="10" fill="#f79bb4" />
            <circle cx="56" cy="45" r="10" fill="#f79bb4" />
            <circle cx="50" cy="36" r="8" fill="#ffd454" />
          </svg>
        );
    }
  };

  const stepsToNext = stage.nextThreshold !== null ? stage.nextThreshold - completedCount : 0;
  const progressPercent =
    stage.nextThreshold !== null
      ? Math.max(12, Math.min(100, Math.round(((completedCount - stage.min) / (stage.nextThreshold - stage.min)) * 100)))
      : 100;

  const nextStageInfo = stage.nextThreshold !== null ? getGardenStage(stage.nextThreshold, isFr) : null;

  const STAGES_LIST = [
    { level: 1, icon: '🌱', name: isFr ? 'Graine' : 'Seed', req: isFr ? '0 étape' : '0 steps' },
    { level: 2, icon: '🌿', name: isFr ? 'Pousse' : 'Sprout', req: isFr ? '1 étape' : '1 step' },
    { level: 3, icon: '🌳', name: isFr ? 'Arbrisseau' : 'Sapling', req: isFr ? '3 étapes' : '3 steps' },
    { level: 4, icon: '🪴', name: isFr ? 'Plante' : 'Plant', req: isFr ? '6 étapes' : '6 steps' },
    { level: 5, icon: '🌸', name: isFr ? 'Floraison' : 'Bloom', req: isFr ? '10+ étapes' : '10+ steps' },
  ];

  return (
    <section className="card garden-card" id="garden-section" aria-labelledby="garden-title">
      <div className="garden-plant-frame">
        {renderSvg()}
        <span className="garden-level-pill">
          {isFr ? `Stade ${stage.level}/5` : `Stage ${stage.level}/5`}
        </span>
      </div>

      <div className="garden-info-column">
        <div className="garden-title-row">
          <span className="badge badge--accent">🌱 {t.today.gardenTitle}</span>
          <span className="garden-stage-name">
            {stage.icon} {stage.title}
          </span>
        </div>

        <p className="garden-desc-text">{stage.desc}</p>
        <p className="garden-sub-stat">
          {isFr
            ? `Chaque micro-action cochée (sur n'importe quelle tâche) fait grandir cette plante. Vous avez validé ${completedCount} étape${completedCount > 1 ? 's' : ''} au total — sans streak anxiogène à perdre.`
            : `Every micro-step you check off (across any assignment) feeds this plant. You have completed ${completedCount} total step${completedCount > 1 ? 's' : ''} — with zero guilt or streaks to lose.`}
        </p>

        {/* Progress toward next plant level */}
        <div className="garden-bar-wrap">
          <div
            className="garden-progress-bar"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
          <span className="garden-bar-label">
            {nextStageInfo
              ? isFr
                ? `Encore ${stepsToNext} étape${stepsToNext > 1 ? 's' : ''} pour le Stade ${nextStageInfo.level} (${nextStageInfo.title})`
                : `${stepsToNext} more step${stepsToNext > 1 ? 's' : ''} to Stage ${nextStageInfo.level} (${nextStageInfo.title})`
              : isFr
              ? 'Floraison maximale atteinte ! 🎉'
              : 'Max bloom reached! 🎉'}
          </span>
        </div>

        {/* Stages Milestones Ladder */}
        <div className="garden-milestones" aria-label={isFr ? 'Paliers d’évolution de la plante' : 'Plant evolution milestones'}>
          {STAGES_LIST.map((s) => {
            const isCurrent = s.level === stage.level;
            const isUnlocked = s.level <= stage.level;
            return (
              <div
                key={s.level}
                className={`garden-milestone-item ${isCurrent ? 'active' : ''} ${isUnlocked ? 'unlocked' : ''}`}
              >
                <span className="milestone-icon">{s.icon}</span>
                <span className="milestone-label">{s.name}</span>
                <span className="milestone-req">{s.req}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
