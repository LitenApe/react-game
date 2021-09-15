import { ComponentProps, useEffect, useState } from 'react';

import classNames from 'classnames';

import Entity from '../service/Entity';

type StatusBoxProps = {
  entity: Entity;
} & ComponentProps<'div'>;

export default function StatusBox(props: StatusBoxProps): JSX.Element {
  const { entity, className, ...rest } = props;
  const [startingHealth] = useState(entity.getStats().originalHealth);
  const [healthPercentage, setHealthPercentage] = useState(100);

  const currentHealth = entity.getHealth();

  useEffect(() => {
    setHealthPercentage(() => (currentHealth / startingHealth) * 100);
  }, [currentHealth, startingHealth]);

  return (
    <div className={classNames('entity-status-box', className)} {...rest}>
      <p>
        {entity.getName()} ({entity.getStats().damage})
      </p>
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
