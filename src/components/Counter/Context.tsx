import { createContext, PropsWithChildren, useContext, useState } from "react";

type CountContext = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

const context = createContext<CountContext | null>(null);

function Count({ children }: PropsWithChildren<{}>) {
  const [count, setCount] = useState(0);

  function increment() {
    setCount((prev) => prev + 1);
  }

  function decrement() {
    setCount((prev) => prev - 1);
  }

  return (
    <context.Provider
      value={{
        count,
        increment,
        decrement,
      }}
    >
      {children}
    </context.Provider>
  );
}

function useCountContext() {
  return useContext(context);
}

function Counter() {
  const count = useCountContext();

  if (count === null)
    throw new Error("Counter is not wrapped by a Count contex provider!");

  return (
    <div>
      <p>Count is {count.count}</p>
      <button onClick={count.increment}>+</button>
      <button onClick={count.decrement}>-</button>
    </div>
  );
}

export default () => (
  <Count>
    <Counter />
  </Count>
);
