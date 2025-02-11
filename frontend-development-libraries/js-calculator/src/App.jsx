import React, { useState } from "react";

const buttons = [
  "7",
  "8",
  "9",
  "/",
  "4",
  "5",
  "6",
  "*",
  "1",
  "2",
  "3",
  "-",
  "0",
  "C",
  "=",
  "+",
];

const App = () => {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    if (value === "C") {
      setInput("");
    } else if (value === "=") {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput("Error");
      }
    } else {
      setInput(input + value);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-72 bg-white p-4 rounded-lg shadow-lg">
        <input
          type="text"
          value={input}
          readOnly
          className="w-full p-3 text-right text-2xl border-b-2 border-gray-300 mb-4"
        />
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => handleClick(btn)}
              className={`p-4 text-xl font-semibold rounded-lg shadow ${
                isNaN(btn) ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
