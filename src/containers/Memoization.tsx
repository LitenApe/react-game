function WithoutMemoization(): JSX.Element {
  return (
    <section>
      <h2>Without Memoization</h2>
    </section>
  );
}

function WithMemoization(): JSX.Element {
  return (
    <section>
      <h2>With Memoization</h2>
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
