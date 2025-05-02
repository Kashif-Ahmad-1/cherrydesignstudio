export default function Smiley() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="50" fill="#F8B736" />
      <path
        d="M35 40L40 40M60 40L65 40M35 60C35 60 40 70 50 70C60 70 65 60 65 60"
        stroke="#000000"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M50 20L50 25M45 25L50 30L55 25"
        stroke="#000000"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M50 80L50 75M45 75L50 70L55 75"
        stroke="#000000"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}