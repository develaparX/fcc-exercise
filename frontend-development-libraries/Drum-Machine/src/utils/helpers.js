export const styleActiveKey = (key) => {
    key.parentElement.style.backgroundColor = "#000000";
    key.parentElement.style.color = "#ffffff";
  };
  
  export const deactivateAudio = (audio) => {
    setTimeout(() => {
      audio.parentElement.style.backgroundColor = "#ffffff";
      audio.parentElement.style.color = "#000000";
    }, 300);
  };
  