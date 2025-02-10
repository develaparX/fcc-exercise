import React from "react";

const DrumControl = ({
  stop,
  name,
  power,
  volume,
  handleVolumeChange,
  changeSoundGroup,
}) => (
  <div className="flex flex-col items-center gap-3">
    <button
      className={`p-2 rounded-2xl ${power ? "bg-green-500" : "bg-red-500"}`}
      onClick={stop}
    >
      Power {power ? "OFF" : "ON"}
    </button>
    <h2 className="bg-blue-400 px-2 rounded-xl">
      Volume: % {Math.round(volume * 100)}
    </h2>
    <input
      type="range"
      max="1"
      min="0"
      step="0.01"
      value={volume}
      onChange={handleVolumeChange}
    />
    <h2 className="bg-emerald-400 px-3 rounded-lg" id="display">
      {name}
    </h2>
    <button
      className="bg-teal-400 px-5 py-2 rounded-xl"
      onClick={changeSoundGroup}
    >
      Change Sounds Group
    </button>
  </div>
);

export default DrumControl;
