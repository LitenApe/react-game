import { createAvatar } from '@dicebear/avatars';
import { useState } from 'react';
import * as style from '@dicebear/pixel-art';
import Entity from '../service/Entity';

type GameEntityProps = {
  entity: Entity;
};

export default function GameEntity({ entity }: GameEntityProps): JSX.Element {
  const [avatar] = useState(
    createAvatar(style, {
      seed: entity.getName(),
    })
  );

  return <div dangerouslySetInnerHTML={{ __html: avatar }}></div>;
}
