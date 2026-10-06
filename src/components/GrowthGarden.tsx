import { useT } from '../i18n';
import { useSettings } from '../settings/SettingsContext';

interface Props {
  completedCount: number;
}

export default function GrowthGarden({ completedCount }: Props) {
  const t = useT();
  const { settings } = useSettings();
  const isFr = settings.lang === 'fr';

  // Plant evolution stages with custom animated SVG representations
  const getStageInfo = (count: number) => {
    if (count === 0) {
      return {
        level: 1,
        title: isFr ? 'Graine en terre' : 'Dormant Seed',
        desc: isFr ? 'Prends ta première micro-étape pour faire germer la pousse.' : 'Complete your first micro-step to spark life.',
        renderSvg: () => (
          <svg viewBox="0 0 100 100" className="garden-svg" aria-hidden="true">
            <ellipse cx="50" cy="85" rx="35" ry="8" fill="var(--border)" opacity="0.5" />
            <ellipse cx="50" cy="78" rx="8" ry="12" fill="#7a5530" transform="rotate(-15 50 78)" />
            <circle cx="50" cy="74" r="3" fill="#9c7348" />
          </svg>
        ),
      };
    }
    if (count < 3) {
      return {
        level: 2,
        title: isFr ? 'Jeune Pousse' : 'Fresh Sprout',
        desc: isFr ? 'La graine a percé le sol ! Chaque effort compte.' : 'The sprout has emerged. Small consistent steps win.',
        renderSvg: () => (
          <svg viewBox="0 0 100 100" className="garden-svg" aria-hidden="true">
            <ellipse cx="50" cy="85" rx="35" ry="8" fill="var(--border)" opacity="0.5" />
            <path d="M50 82 Q50 60 48 50" stroke="#3d7e52" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* Left Leaf */}
            <path d="M48 56 Q35 45 40 38 Q50 48 48 56 Z" fill="#68bb7d" />
            {/* Right Leaf */}
            <path d="M48 50 Q62 42 58 35 Q48 44 48 50 Z" fill="#4fa465" />
          </svg>
        ),
      };
    }
    if (count < 6) {
      return {
        level: 3,
        title: isFr ? 'Jeune Arbrisseau' : 'Sturdy Sapling',
        desc: isFr ? 'Des racines solides se forment. Ta concentration grandit.' : 'Deep roots are forming. Focus is building up.',
        renderSvg: () => (
          <svg viewBox="0 0 100 100" className="garden-svg" aria-hidden="true">
            <ellipse cx="50" cy="85" rx="35" ry="8" fill="var(--border)" opacity="0.5" />
            <path d="M50 85 Q52 50 50 30" stroke="#2e5d3d" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M50 60 Q30 50 32 38 Q46 48 50 60 Z" fill="#52a768" />
            <path d="M50 48 Q68 40 65 28 Q52 38 50 48 Z" fill="#68bb7d" />
            <path d="M50 32 Q45 18 50 12 Q56 20 50 32 Z" fill="#80cf94" />
          </svg>
        ),
      };
    }
    if (count < 10) {
      return {
        level: 4,
        title: isFr ? 'Plante Épanouie' : 'Thriving Plant',
        desc: isFr ? 'Feuillage abondant. Ton cerveau a trouvé son rythme calme.' : 'Dense lush foliage. Your mind is in a peaceful groove.',
        renderSvg: () => (
          <svg viewBox="0 0 100 100" className="garden-svg" aria-hidden="true">
            <ellipse cx="50" cy="88" rx="40" ry="8" fill="var(--border)" opacity="0.5" />
            {/* Pot */}
            <path d="M35 70 L65 70 L60 90 L40 90 Z" fill="#c47a4f" />
            <rect x="33" y="66" width="34" height="6" rx="3" fill="#b0673d" />
            {/* Stem & Leaves */}
            <path d="M50 68 Q50 40 50 25" stroke="#2e5d3d" strokeWidth="5" fill="none" strokeLinecap="round" />
            <circle cx="50" cy="35" r="18" fill="#4fa465" opacity="0.9" />
            <circle cx="38" cy="42" r="14" fill="#68bb7d" opacity="0.95" />
            <circle cx="62" cy="42" r="14" fill="#3d7e52" opacity="0.95" />
            <circle cx="50" cy="22" r="12" fill="#80cf94" />
          </svg>
        ),
      };
    }
    return {
      level: 5,
      title: isFr ? 'Fleur Triomphale' : 'Blooming Sanctuary',
      desc: isFr ? 'Félicitations ! Une floraison complète sans la moindre culpabilité.' : 'Masterful accomplishment! A blooming sanctuary with zero guilt.',
      renderSvg: () => (
        <svg viewBox="0 0 100 100" className="garden-svg" aria-hidden="true">
          <ellipse cx="50" cy="88" rx="40" ry="8" fill="var(--border)" opacity="0.5" />
          {/* Stem */}
          <path d="M50 85 Q48 55 50 35" stroke="#2e5d3d" strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* Leaves */}
          <path d="M50 60 Q30 54 32 42 Q46 50 50 60 Z" fill="#52a768" />
          <path d="M50 50 Q70 44 68 32 Q52 42 50 50 Z" fill="#68bb7d" />
          {/* Flower Petals */}
          <circle cx="50" cy="26" r="10" fill="#f79bb4" />
          <circle cx="40" cy="33" r="10" fill="#f9a8be" />
          <circle cx="60" cy="33" r="10" fill="#f9a8be" />
          <circle cx="44" cy="45" r="10" fill="#f79bb4" />
          <circle cx="56" cy="45" r="10" fill="#f79bb4" />
          {/* Flower Center */}
          <circle cx="50" cy="36" r="8" fill="#ffd454" />
        </svg>
      ),
    };
  };

  const stage = getStageInfo(completedCount);
  const progressInLevel = (completedCount % 3) / 3;

  return (
    <section className="card garden-card" aria-labelledby="garden-title">
      <div className="garden-plant-frame">
        {stage.renderSvg()}
        <span className="garden-level-pill">Stage {stage.level} / 5</span>
      </div>

      <div className="garden-info-column">
        <div className="garden-title-row">
          <span className="badge badge--accent">🌱 {t.today.gardenTitle}</span>
          <span className="garden-stage-name">{stage.title}</span>
        </div>

        <p className="garden-desc-text">{stage.desc}</p>
        <p className="garden-sub-stat">{t.today.gardenText(completedCount)}</p>

        <div className="garden-bar-wrap">
          <div
            className="garden-progress-bar"
            role="progressbar"
            aria-valuenow={Math.round(progressInLevel * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="progress-fill" style={{ width: `${Math.max(12, progressInLevel * 100)}%` }} />
          </div>
          <span className="garden-bar-label">
            {completedCount % 3} / 3 {isFr ? 'vers la prochaine pousse' : 'to next growth'}
          </span>
        </div>
      </div>
    </section>
  );
}
