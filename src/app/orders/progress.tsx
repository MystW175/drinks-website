'use client';
import React from "react";
export default function ProgressBar(){
    const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 30 ? 30 : v + 1));
    }, 10);

    return () => clearInterval(interval);
  }, []);

    return(<progress className="progress progress-secondary w-full" value={value} max="100"></progress>);
}