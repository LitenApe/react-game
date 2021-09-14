import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount((prev) => prev + 1);
  }

  function decrement() {
    setCount((prev) => prev - 1);
  }

  return (
    <div>
      <p>Count is {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
