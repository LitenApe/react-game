import Entity from '../service/Entity';
import { usePreviousValue } from '../utils/hooks/usePreviousValue';

type GameEntityProps = {
  entity: Entity;
};

export default function GameEntity({ entity }: GameEntityProps): JSX.Element {
  const previousHealth = usePreviousValue(entity.getHealth());
  const recentDamage = previousHealth - entity.getHealth();

  return (
    <div className="entity">
      <div dangerouslySetInnerHTML={{ __html: entity.getAvatar() }}></div>
      <p className="entity-damage-received">{recentDamage}</p>
    </div>
  );
}
