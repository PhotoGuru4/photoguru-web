import { useState } from 'react';

export const useImageSlider = (length: number) => {
  const [current, setCurrent] = useState(0);

  const [startX, setStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const threshold = 50;

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + length) % length);
  };

  const handleStart = (x: number) => {
    setStartX(x);
    setIsDragging(true);
  };

  const handleEnd = (x: number) => {
    if (!isDragging || startX === null) return;

    const diff = startX - x;

    if (diff > threshold) handleNext();
    else if (diff < -threshold) handlePrev();

    setIsDragging(false);
    setStartX(null);
  };

  return {
    current,
    handleNext,
    handlePrev,
    handleStart,
    handleEnd,
  };
};
