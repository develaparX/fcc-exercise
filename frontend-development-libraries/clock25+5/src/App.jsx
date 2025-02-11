import { useState, useEffect } from "react";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsSession((prevSession) => !prevSession);
            return isSession ? breakLength * 60 : sessionLength * 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, isSession, breakLength, sessionLength]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">25 + 5 Clock Freecodecamp</h1>
      <div className="flex space-x-6 mb-6">
        <div>
          <h2>Break Length</h2>
          <button
            onClick={() => setBreakLength((b) => Math.max(1, b - 1))}
            className="px-3 py-1 bg-red-600 rounded"
          >
            -
          </button>
          <span className="mx-2">{breakLength}</span>
          <button
            onClick={() => setBreakLength((b) => Math.min(60, b + 1))}
            className="px-3 py-1 bg-green-600 rounded"
          >
            +
          </button>
        </div>
        <div>
          <h2>Session Length</h2>
          <button
            onClick={() => setSessionLength((s) => Math.max(1, s - 1))}
            className="px-3 py-1 bg-red-600 rounded"
          >
            -
          </button>
          <span className="mx-2">{sessionLength}</span>
          <button
            onClick={() => setSessionLength((s) => Math.min(60, s + 1))}
            className="px-3 py-1 bg-green-600 rounded"
          >
            +
          </button>
        </div>
      </div>
      <div className="text-5xl font-mono bg-gray-800 p-6 rounded-lg">
        {formatTime(timeLeft)}
      </div>
      <div className="mt-6">
        <button
          onClick={() => setIsRunning((prev) => !prev)}
          className="px-4 py-2 bg-blue-500 rounded mr-2"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setIsSession(true);
            setTimeLeft(25 * 60);
          }}
          className="px-4 py-2 bg-yellow-500 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
