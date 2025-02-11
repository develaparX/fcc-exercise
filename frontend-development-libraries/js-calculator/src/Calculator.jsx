// src/Calculator.js
import React, { useState } from "react";

const Calculator = () => {
  const [expression, setExpression] = useState("");

  // Fungsi untuk menangani klik tombol
  const handleButtonClick = (value) => {
    if (value === "C") {
      setExpression("");
    } else if (value === "DEL") {
      setExpression(expression.slice(0, -1));
    } else if (value === "=") {
      try {
        // Menggunakan eval untuk evaluasi ekspresi
        // Catatan: eval memiliki risiko keamanan jika ekspresi tidak terkontrol
        const result = eval(expression);
        setExpression(String(result));
      } catch (error) {
        setExpression("Error");
      }
    } else {
      setExpression(expression + value);
    }
  };

  // Tata letak tombol (grid 5x4)
  const buttons = [
    ["C", "DEL", "", ""],
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
  ];

  return (
    <div className="max-w-sm mx-auto mt-10 shadow-lg">
      {/* Display Kalkulator */}
      <div className="bg-gray-200 text-right text-3xl p-4 rounded-t-lg">
        {expression || "0"}
      </div>
      {/* Tombol Kalkulator */}
      <div className="grid grid-cols-4 gap-2 bg-gray-100 p-4 rounded-b-lg">
        {buttons.flat().map((btn, index) => {
          if (btn === "") {
            // Jika tombol kosong, render elemen kosong agar grid tetap terjaga
            return <div key={index}></div>;
          }
          return (
            <button
              key={index}
              onClick={() => handleButtonClick(btn)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded"
            >
              {btn}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calculator;
