import { useCallback } from 'react';
import { memo } from 'react';
import { useState } from 'react';
import { ComponentProps } from 'react';
import { MouseEvent } from 'react';

function Button({
  children,
  dataId,
  ...props
}: { dataId: number } & ComponentProps<'button'>): JSX.Element {
  console.log('rendering button', dataId);
  return <button {...props}>{children}</button>;
}

// eslint-disable-next-line react/display-name
const List = memo(
  ({
    onClick,
  }: {
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  }) => {
    return (
      <ul>
        {Array.from(Array(10)).map((_, idx) => (
          <li key={'without-' + idx}>
            <Button dataId={idx} onClick={onClick}>
              hello there
            </Button>
          </li>
        ))}
      </ul>
    );
  }
);

function WithoutMemoization(): JSX.Element {
  const [clicked, setClicked] = useState<number>(-1);

  function onClick() {
    setClicked((last) => last + 1);
  }

  console.log('rendering container');

  return (
    <section>
      <h2>Without Memoization ({clicked})</h2>
      <ul>
        <List onClick={onClick} />
      </ul>
    </section>
  );
}

function WithMemoization(): JSX.Element {
  const [clicked, setClicked] = useState<number>(-1);

  const onClick = useCallback((_) => {
    setClicked((last) => last + 1);
  }, []);

  console.log('rendering container');

  return (
    <section>
      <h2>With Memoization ({clicked})</h2>
      <ul>
        <List onClick={onClick} />
      </ul>
    </section>
  );
}

export default function Memoization(): JSX.Element {
  return (
    <>
      <h1>Memoization Examples</h1>
      <div>
        <WithoutMemoization />
        <WithMemoization />
      </div>
    </>
  );
}
