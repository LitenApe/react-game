import { ComponentProps, useState } from 'react';
import Entity from '../service/Entity';

type StatusBoxProps = {
  entity: Entity;
} & ComponentProps<'div'>;

export default function StatusBox(props: StatusBoxProps): JSX.Element {
  const { entity, ...rest } = props;
  const [startingHealth] = useState(entity.getHealth());

  const currentHealth = entity.getHealth();
  const healthPercentage = (currentHealth / startingHealth) * 100;

  return (
    <div className="entity-status-box" {...rest}>
      <p>{entity.getName()}</p>
      <div className="health-container">
        <p className="health">
          {currentHealth}/{startingHealth}
          <div
            className="health-bar"
            style={{ width: `${healthPercentage}%` }}
          />
        </p>
      </div>
    </div>
  );
}
