import { useEffect, useState, useRef } from "react";
import { useGame } from '../../context/GameContext';

export function Timer({ isRunning, onEnd, player }) {
  const { initialTime, timeLeft, setTimeLeft } = useGame()
  const [remainingTime, setRemainingTime] = useState(initialTime);
  const [cleanUp, setCleanUp] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setTimeLeft(prev => {
      const newTime = [...prev];
      newTime[player] = remainingTime;
      return newTime;
    });
  }, [cleanUp]);

  useEffect(() => {
    setTimeLeft(prev => {
      const newTime = [...prev];
      newTime[player] = remainingTime;
      return newTime;
    });
    if (remainingTime === 0) {
      setTimeLeft(prev => {
        const newTime = [...prev];
        newTime[player] = 0;
        return newTime;
      });
      onEnd();
    }
  }, [remainingTime]);

  useEffect(() => {
    if (!isRunning) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    } 

    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
          setRemainingTime((prev) => {
            if (prev <= 1) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
              return 0;
            }
            return prev - 1;
          });
      }, 1000);
    }

    return () => {
      setCleanUp(true);
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isRunning]);

  return (
    <div className={`grid place-items-center size-25 rounded-full border-2 ${remainingTime === 0 ? 'grad-inc': 'grad-pri'}`}>
      <p className={`text-3xl font-bold`}>{remainingTime}</p>
    </div>
  );
}
