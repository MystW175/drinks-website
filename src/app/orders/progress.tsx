'use client';
import React from "react";

interface ProgressBarProps {
  progress: Date,
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  const [value, setValue] = React.useState(0);

  const completionPercent = ((Date.now() - new Date(progress).getTime()) / (1000 * 60 * 60 * 24)) * 100;
  var percent = completionPercent > 3 ? Math.floor(completionPercent) : 3;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= percent ? percent : v + 1));
    }, 10);

    return () => clearInterval(interval);
  }, [percent]);

  const processing = value >= 37 ? 'text-secondary': '';
  const shipped = value >= 67 ? 'text-secondary': '';
  const delivered = value >= 100 ? 'text-secondary': '';

  return (
    <>
      <progress className="progress progress-secondary w-full" value={value} max="100"></progress>
      <ul className="hidden sm:flex justify-between w-full">
        <li className="font-medium text-[15px] text-secondary">Order placed</li>
        <li className={`font-medium text-[15px] ${processing}`}>Processing</li>
        <li className={`font-medium text-[15px] ${shipped}`}>Shipped</li>
        <li className={`font-medium text-[15px] ${delivered}`}>Delivered</li>
      </ul>
    </>
    );
}