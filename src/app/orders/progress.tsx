'use client';
import React from "react";

interface ProgressBarProps {
  progress: Date,
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  const [value, setValue] = React.useState(0);

  const completionPercent = ((Date.now() - new Date(progress).getTime()) / (1000 * 60 * 60 * 24 * 2)) * 100;
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

  let deliveryDate = new Date();
  deliveryDate.setHours(progress.getHours() + 30);

  let formattedDate = new Date(deliveryDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric' })

  const messageList = ['Order has been placed', 'Order is being processed', `Preparing to ship on ${formattedDate}`, 'Your order is on the way', 'Your order has been delivered'];

  var message ;

  if(percent < 15){
    message = messageList[0];
  }
  else if(percent < 42)
  {
    message = messageList[1];
  }
  else if(percent < 67){
    message = messageList[2];
  }
  else if(percent < 100){
    message = messageList[3];
  }
  else {
    message = messageList[4];
  }

  return (
    <>
      <h4 className="font-medium text-[15px]">{message}</h4>
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