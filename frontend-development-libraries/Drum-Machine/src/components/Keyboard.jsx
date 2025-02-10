import React from "react";
import KeyboardKey from "./KeyboardKey";

const Keyboard = ({ sounds, play, power }) => (
  <div className="grid grid-flow-col grid-rows-3 gap-8 ">
    {sounds.map((sound) => (
      <KeyboardKey
        key={sound.keyCode}
        sound={power ? sound : { ...sound, url: "#" }}
        play={play}
      />
    ))}
  </div>
);

export default Keyboard;
