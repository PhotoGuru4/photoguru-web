export const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <svg
      width="72"
      height="72"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-pink-500"
    >
      <path
        d="
          M14 22
          H22
          L25 18
          H39
          L42 22
          H50
          C53 22 55 24 55 27
          V43
          C55 46 53 48 50 48
          H14
          C11 48 9 46 9 43
          V27
          C9 24 11 22 14 22
          Z
        "
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="cute-camera-outline"
      />

      <circle
        cx="32"
        cy="35"
        r="9"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        className="cute-camera-outline"
      />

      <circle
        cx="32"
        cy="35"
        r="4"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        className="cute-camera-outline"
      />

      <circle
        cx="45"
        cy="27"
        r="1.8"
        fill="currentColor"
        className="animate-pulse"
      />
    </svg>
  </div>
);
