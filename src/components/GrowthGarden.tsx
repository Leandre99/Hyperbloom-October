import { useT } from '../i18n';

interface Props {
  completedCount: number;
}

export default function GrowthGarden({ completedCount }: Props) {
  const t = useT();

  // Plant evolution stages
  const getStage = (count: number) => {
    if (count === 0) return { icon: '🌰', name: 'Seed' };
    if (count < 3) return { icon: '🌱', name: 'Sprout' };
    if (count < 6) return { icon: '🌿', name: 'Sapling' };
    if (count < 10) return { icon: '🪴', name: 'Growing Plant' };
    return { icon: '🌸', name: 'Blooming Flower' };
  };

  const stage = getStage(completedCount);

  return (
    <div className="garden-card card">
      <div className="garden-visual" aria-hidden="true">
        <span className="garden-plant">{stage.icon}</span>
      </div>
      <div className="garden-info">
        <h3>{t.today.gardenTitle}</h3>
        <p>{t.today.gardenText(completedCount)}</p>
        <div className="garden-progress-bar" role="progressbar" aria-valuenow={completedCount % 5} aria-valuemin={0} aria-valuemax={5}>
          <div className="progress-fill" style={{ width: `${Math.min(100, (completedCount % 5) * 20)}%` }} />
        </div>
      </div>
    </div>
  );
}
