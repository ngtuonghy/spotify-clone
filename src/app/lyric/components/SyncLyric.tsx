import { usePlayerContext } from "@/providers/PlayerContext";
import React from "react";
import LyricLine from "./Lyric";
type LyricLineProps = {
  time: number;
  text: string;
  endTime: number;
};
interface SyncLyricProps {
  data: LyricLineProps[];
  currentTime?: number;
}
const SyncLyric: React.FC<SyncLyricProps> = ({ data }) => {
  const { currentTime } = usePlayerContext();

  const timeArray = data.map((data) => {
    return data.time;
  });

  return (
    <div className="w-full scroll-smooth overflow-y-auto">
      {data.map((line: LyricLineProps, index: number) => (
        <LyricLine
          key={index}
          text={line.text}
          time={line.time}
          endTime={line.endTime}
          currentTime={currentTime}
          timeArray={timeArray}
        />
      ))}
    </div>
  );
};

export default SyncLyric;
