import { usePlayerContext } from "@/providers/PlayerContext";
import { FormatDurationDisplay } from "@/utils/FormatDurationDisplay";
import React, { useEffect, useState } from "react";

interface PlayerControlProps {
  audio: HTMLAudioElement | null;
  loopAudio: any;
  autoPlayNext: () => void;
}
const PlayerControl: React.FC<PlayerControlProps> = ({
  audio,
  loopAudio,
  autoPlayNext,
}) => {
  const { currentTime, setCurrentTime, stateClickLyric, clickTimeLyric } =
    usePlayerContext();
  const [formatCurrentTime, setFormatCurrentTime] = useState<string>("00:00");
  const [duration, setDuration] = useState<number>(0);
  const [formatduration, setFormatDuration] = useState<string>("00:00");
  useEffect(() => {
    const updateTime = () => {
      if (audio) {
        const time = audio.currentTime;
        setCurrentTime(time);
        setFormatCurrentTime(FormatDurationDisplay(time));
      }
    };
    audio?.addEventListener("timeupdate", updateTime);
    return () => {
      audio?.removeEventListener("timeupdate", updateTime);
    };
  }, [audio]);

  useEffect(() => {
    const onLoadedMetadata = () => {
      if (audio) {
        const time = audio.duration;
        setDuration(time);
        setFormatDuration(FormatDurationDisplay(time));
      }
    };
    audio?.addEventListener("loadedmetadata", onLoadedMetadata);
    return () => {
      audio?.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [audio]);

  useEffect(() => {
    if (audio) {
      audio.currentTime = clickTimeLyric;
    }
  }, [stateClickLyric]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audio) audio.currentTime = parseFloat(e.target.value);
  };
  // control loop
  useEffect(() => {
    const handleLoop = () => {
      if (loopAudio) {
        setCurrentTime(0);
        audio?.play();
      } else {
        autoPlayNext();
      }
    };
    audio?.addEventListener("ended", handleLoop);
    return () => {
      audio?.removeEventListener("ended", handleLoop);
    };
  }, [loopAudio, audio]);

  return (
    <div className="max-w-[620px] flex flex-row items-center gap-2 select-none">
      <p className="text-xs ">{formatCurrentTime}</p>
      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={handleSeek}
        className="w-full h-1 bg-red-700 accent-white "
      />
      <p className="text-xs">{formatduration}</p>
    </div>
  );
};

export default PlayerControl;
