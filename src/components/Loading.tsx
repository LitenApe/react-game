export default function Loading(): JSX.Element {
  return (
    <svg
      viewBox="0 0 100 100"
      width="200"
      height="200"
      style={{ overflow: 'visible' }}
    >
      <circle
        cx="50"
        cy="50"
        r="50"
        fill="transparent"
        stroke="#fff"
        strokeWidth="4px"
      />
      <line x1="0" y1="0" x2="50" y2="50" stroke="#fff" strokeWidth="4px" />
    </svg>
  );
}
