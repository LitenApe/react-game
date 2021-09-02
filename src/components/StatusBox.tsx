import { useEffect } from 'react';
import { ComponentProps, useState } from 'react';
import Entity from '../service/Entity';

type StatusBoxProps = {
  entity: Entity;
} & ComponentProps<'div'>;

export default function StatusBox(props: StatusBoxProps): JSX.Element {
  const { entity, ...rest } = props;
  const [startingHealth] = useState(entity.getHealth());
  const [healthPercentage, setHealthPercentage] = useState(100);

  const currentHealth = entity.getHealth();

  useEffect(() => {
    setHealthPercentage(() => (currentHealth / startingHealth) * 100);
  }, [currentHealth, startingHealth]);

  return (
    <div className="entity-status-box" {...rest}>
      <p>{entity.getName()}</p>
      <div className="health-container">
        <p className="health">
          {currentHealth}/{startingHealth}
          <span
            className="health-bar"
            style={{ width: `${healthPercentage}%` }}
          />
        </p>
      </div>
    </div>
  );
}
