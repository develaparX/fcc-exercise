import React, { useState } from "react";
import Keyboard from "./components/Keyboard";
import DrumControl from "./components/DrumControl";
import { soundsGroup, soundsName } from "./utils/soundData";

const App = () => {
  const [power, setPower] = React.useState(true);
  const [volume, setVolume] = React.useState(1);
  const [soundName, setSoundName] = React.useState("");
  const [soundType, setSoundType] = React.useState("heaterKit");
  const [sounds, setSounds] = React.useState(soundsGroup[soundType]);

  // Gunakan useEffect untuk mengatur volume ketika volume berubah
  React.useEffect(() => {
    const audioElements = sounds.map((sound) =>
      document.getElementById(sound.key)
    );
    audioElements.forEach((audio) => {
      if (audio) {
        audio.volume = volume;
      }
    });
  }, [volume, sounds]);

  const play = (key, sound) => {
    setSoundName(sound);
    const audio = document.getElementById(key);
    audio.currentTime = 0;
    audio.play();
  };

  const stop = () => {
    setPower(!power);
  };

  const changeSoundGroup = () => {
    setSoundName("");
    setSoundType((prevType) =>
      prevType === "heaterKit" ? "smoothPianoKit" : "heaterKit"
    );
    setSounds(
      soundType === "heaterKit"
        ? soundsGroup.smoothPianoKit
        : soundsGroup.heaterKit
    );
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  return (
    <>
      <div className="bg-gray-900 flex h-[100vh] w-[100%] items-center justify-center">
        <div
          id="drum-machine"
          className="flex flex-row gap-8 bg-gray-500 max-w-[50%] place-content-center max-h-[50vh] p-16 rounded-2xl"
        >
          <h1 className="absolute top-43 text-xl font-extrabold">
            Drum Machine
          </h1>
          <Keyboard sounds={sounds} play={play} power={power} />
          <DrumControl
            stop={stop}
            power={power}
            volume={volume}
            name={soundName || soundsName[soundType]}
            changeSoundGroup={changeSoundGroup}
            handleVolumeChange={handleVolumeChange}
          />
        </div>
      </div>
    </>
  );
};

export default App;
