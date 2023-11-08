"use client";
import { usePlayerContext } from "@/providers/PlayerContext";
import React, { useEffect } from "react";

interface LyricLineProps {
  text: string;
  time: number;
  currentTime: number;
  endTime: number;
  timeArray: number[];
}

const LyricLine: React.FC<LyricLineProps> = ({
  text,
  time,
  currentTime,
  endTime,
  timeArray,
}) => {
  const isCurrent = time < currentTime && currentTime < endTime;
  // const isCurrent = Math.abs(currentTime - time) < 1;
  useEffect(() => {
    if (isCurrent) {
      const element = document.querySelector('[data-id="lyrics-container"]');
      if (element) {
        const matchingTimes = (): number | null => {
          for (let i = 0; i < timeArray.length; i++) {
            if (timeArray[i] === time) return timeArray[i];
          }
          return null;
        };
        // console.log(time);
        // console.log("dung");
        // console.log(matchingTimes());
        const child = document.querySelector(
          `[data-id="${matchingTimes()}"]`,
        ) as HTMLElement;
        if (child) {
          const containerHeight = element.clientHeight;
          const childTop = child.offsetTop;
          const childHeight = child.offsetHeight;
          const scrollTop = element.scrollTop;
          // console.log("containerHeight " + containerHeight);
          // console.log("offsetHeightChild " + childHeight);
          // console.log("offsetTopchild " + childTop);
          const minVisibleY = scrollTop;
          const maxVisibleY = scrollTop + containerHeight;
          const minChildY = childTop;
          const maxChildY = childTop + childHeight;
          if (minChildY < maxVisibleY && maxChildY > minVisibleY) {
            const scrollTop = Math.max(
              0,
              childTop - (containerHeight - childHeight) / 2,
            );
            // console.log(scrollTop);
            element.scrollTo({
              top: scrollTop,
              behavior: "smooth",
            });
          }
        }
      }
    }
    // element.
  }, [isCurrent]);
  // console.log("on " + time);
  // console.log("end" + endTime);
  const skip = currentTime > time;
  const { setClickTimeLyric, setStateClickLyric, stateClickLyric } =
    usePlayerContext();
  const handleSeeClick = () => {
    setStateClickLyric(!stateClickLyric);
    setClickTimeLyric(time);
  };
  return (
    <p
      onClick={handleSeeClick}
      className={`text-4xl font-bold p-1 hover:text-white cursor-pointer ${
        isCurrent ? "text-white" : ""
      } ${skip ? "text-neutral-400" : "text-black"} `}
      data-id={time}
    >
      {text}
    </p>
  );
};
export default LyricLine;
