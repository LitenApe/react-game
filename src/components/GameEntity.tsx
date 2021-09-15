import Entity from '../service/Entity';
import { usePreviousValue } from '../utils/hooks/usePreviousValue';

type GameEntityProps = {
  entity: Entity;
};

export default function GameEntity({ entity }: GameEntityProps): JSX.Element {
  const current = entity.getHealth();
  const previous = usePreviousValue(current);
  const recentDamage = previous - current;

  return (
    <div className="entity">
      <div dangerouslySetInnerHTML={{ __html: entity.getAvatar() }}></div>
      <p className="entity-damage-received">{recentDamage}</p>
    </div>
  );
}
