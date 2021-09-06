import Entity from '../service/Entity';

type GameEntityProps = {
  entity: Entity;
};

export default function GameEntity({ entity }: GameEntityProps): JSX.Element {
  return <div dangerouslySetInnerHTML={{ __html: entity.getAvatar() }}></div>;
}
