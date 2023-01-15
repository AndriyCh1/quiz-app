import { useEffect, useState } from 'react';

const useStopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const start = () => setIsRunning(true);

  const stop = () => setIsRunning(false);

  useEffect(() => {
    let interval: NodeJS.Timer | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
        console.log('stopwatch is running');
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
        console.log('stopwatch is stopped');
      }
    };
  }, [isRunning]);

  return {
    start,
    stop,
    seconds,
  };
};

export default useStopwatch;
