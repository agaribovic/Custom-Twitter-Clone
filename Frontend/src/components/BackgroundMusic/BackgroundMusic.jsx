import { useRef, useState } from "react";
import basshunter from "./Basshunter.mp3";

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.muted = false;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Playback failed:", err);
        });
    }
  };

  return (
    <>
      <audio ref={audioRef} src={basshunter} loop />
      <h1 style={{ marginLeft: "125px" }} onClick={handleTogglePlay}>
        🎶 𝙲𝚄𝚂𝚃𝙾𝙼 𝚃𝚆𝙸𝚃𝚃𝙴𝚁 𝙲𝙻𝙾𝙽𝙴 𝙰𝙿𝙿.mp³ 🎉
      </h1>
    </>
  );
};

export default BackgroundMusic;
