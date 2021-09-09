import Entity from '../service/Entity';

type GameEntityProps = {
  entity: Entity;
};

export default function GameEntity({ entity }: GameEntityProps): JSX.Element {
  /**
   * Task: Calculate the damage recently received and display it!
   */
  const recentDamage = 0;

  return (
    <div className="entity">
      <div dangerouslySetInnerHTML={{ __html: entity.getAvatar() }}></div>
      <p className="entity-damage-received">{recentDamage}</p>
    </div>
  );
}
