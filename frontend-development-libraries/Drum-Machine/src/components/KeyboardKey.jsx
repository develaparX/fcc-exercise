import React, { useEffect } from "react";
import { styleActiveKey, deactivateAudio } from "../utils/helpers";

const KeyboardKey = ({ play, sound: { id, key, url, keyCode } }) => {
  const handleKeydown = (e) => {
    if (keyCode === e.keyCode) {
      const audio = document.getElementById(key);
      play(key, id);
      deactivateAudio(audio);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <button
      className="bg-blue-600 hover:bg-sky-700 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 p-8 flex items-center rounded-xl text-white text-xl font-extrabold "
      id={keyCode}
      onClick={() => play(key, id)}
    >
      <audio className="bg-blue-900 " src={url} id={key} />
      {key}
    </button>
  );
};

export default KeyboardKey;
