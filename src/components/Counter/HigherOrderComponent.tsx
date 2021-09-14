import { useState } from 'react';

type CounterProps = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

function WithCount(Component: (props: CounterProps) => JSX.Element) {
  const [count, setCount] = useState(0);

  function increment() {
    setCount((prev) => prev + 1);
  }

  function decrement() {
    setCount((prev) => prev - 1);
  }

  // eslint-disable-next-line react/display-name
  return (props: unknown): JSX.Element => (
    <Component
      count={count}
      increment={increment}
      decrement={decrement}
      {...props}
    />
  );
}

function Counter({ count, increment, decrement }: CounterProps) {
  return (
    <div>
      <p>Count is {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

export default WithCount(Counter);
