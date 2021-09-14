import { useState } from "react";
type CounterProps = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

type WithCountProps = {
  children: (props: CounterProps) => JSX.Element;
};

function WithCount(props: WithCountProps) {
  const { children } = props;
  const [count, setCount] = useState(0);

  function increment() {
    setCount((prev) => prev + 1);
  }

  function decrement() {
    setCount((prev) => prev - 1);
  }

  return children({ count, increment, decrement });
}

export default function Counter() {
  return (
    <WithCount>
      {({ count, increment, decrement }) => (
        <div>
          <p>Count is {count}</p>
          <button onClick={increment}>+</button>
          <button onClick={decrement}>-</button>
        </div>
      )}
    </WithCount>
  );
}
