export default function Starburst() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        {Array.from({ length: 16 }).map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2="50"
            y2="10"
            stroke="#E297D0"
            strokeWidth="5"
            transform={`rotate(${i * 22.5} 50 50)`}
          />
        ))}
      </g>
    </svg>
  );
}