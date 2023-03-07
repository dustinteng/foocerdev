import React, { useState, useEffect, useRef } from "react";

function Timer({ duration }) {
  const [seconds, setSeconds] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef();

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    setSeconds(duration);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  return (
    <div>
      <h1>Timer</h1>
      <p>{seconds}</p>
      <button onClick={handleStart} disabled={isRunning}>
        Start
      </button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handlePause} disabled={!isRunning}>
        Pause
      </button>
    </div>
  );
}

export default Timer;
