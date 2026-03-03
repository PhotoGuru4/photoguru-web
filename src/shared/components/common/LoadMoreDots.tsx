const Dot = ({ delay }: { delay: number }) => {
  return (
    <div
      className="w-2 h-2 rounded-full bg-[#E06B80]"
      style={{
        animation: `wave 1.2s ease-in-out ${delay}ms infinite`,
      }}
    />
  );
};

export const LoadMoreDots = () => {
  return (
    <div className="py-6 flex justify-center items-center">
      <div className="flex items-end gap-1">
        <Dot delay={0} />
        <Dot delay={150} />
        <Dot delay={300} />
      </div>

      <style>
        {`
          @keyframes wave {
            0%, 60%, 100% {
              transform: translateY(0);
              opacity: 0.6;
            }
            30% {
              transform: translateY(-6px);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};
