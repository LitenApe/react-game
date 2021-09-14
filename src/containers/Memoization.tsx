import {
  ComponentProps,
  MouseEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

// eslint-disable-next-line react/display-name
const Button = memo((props: ComponentProps<'button'>): JSX.Element => {
  const { children, ...rest } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    buttonRef.current?.classList.add('rerendered');

    const timer = setTimeout(() => {
      buttonRef.current?.classList.remove('rerendered');
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <button ref={buttonRef} {...rest}>
      {children}
    </button>
  );
});

// eslint-disable-next-line react/display-name
const List = memo(
  ({
    onClick,
  }: {
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  }) => {
    const [clicks, setClicks] = useState(Array.from({ length: 10 }, () => 0));

    const increment = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        const dataId = event.currentTarget.getAttribute('data-id');
        const idx = parseInt(dataId || '');
        setClicks((prev) =>
          prev.map((val, i) => {
            if (idx === i) {
              return val + 1;
            } else {
              return val;
            }
          })
        );
        onClick(event);
      },
      [onClick]
    );

    return (
      <ul>
        {clicks.map((clicksCounted, idx) => (
          <li key={'without-' + idx}>
            <Button
              data-id={idx}
              data-clicks={clicksCounted}
              onClick={increment}
            >
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
      <h2>Without ({clicked})</h2>
      <List onClick={onClick} />
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
      <h2>With ({clicked})</h2>
      <List onClick={onClick} />
    </section>
  );
}

export default function Memoization(): JSX.Element {
  return (
    <>
      <h1>Memoization Examples</h1>
      <div id="memoization">
        <WithoutMemoization />
        <WithMemoization />
      </div>
    </>
  );
}
