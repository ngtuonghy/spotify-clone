"use client";
import useGetSongById from "@/hooks/useGetSongById";
import usePlayer from "@/hooks/usePlayer";
import useLoadLyricUrl from "@/hooks/useLoadLyricUrl";
import React, { useEffect, useState } from "react";
import getLyric from "@/actions/getLyric";
import SyncLyric from "./SyncLyric";
import PlayButton from "@/components/PlayButton";

type LyricLine = {
  time: number;
  text: string;
  endTime: number;
};

const LyricContent = () => {
  const [dataLyricOld, setDataLyric] = useState<string[]>();
  const [lyricData, setLyricData] = useState<LyricLine[]>([]);
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  useEffect(() => {
    async function fetchData() {
      if (song?.lyric_path) {
        const urlLyric = useLoadLyricUrl(song);
        const data = await getLyric(urlLyric);
        const regex = /^\[(?<time>\d{2}:\d{2}(.\d{1,})?)\](?<text>.*)/;
        const output: { time: number; text: string; endTime: number }[] = [];
        const outputText: string[] = [];
        const outputTime: number[] = [];

        const parseTime = (time: string): number => {
          const minsec = time.split(":");
          const min = parseInt(minsec[0]) * 60;
          const sec = parseFloat(minsec[1]);
          return min + sec;
        };
        data.forEach((line, index) => {
          const match = line.match(regex);
          if (match == null) return;
          const time: string = match.groups!.time;
          const text: string = match.groups!.text.trim();

          let endTime: number = 0;

          if (index < data.length - 1) {
            const nextLine = data[index + 1];
            const nextMatch = nextLine.match(regex);
            if (nextMatch !== null) {
              const nextTime: number = parseTime(nextMatch.groups!.time);
              endTime = nextTime;
            }
          }
          outputText.push(text);
          outputTime.push(parseTime(time));
          output.push({
            time: parseTime(time),
            text: text.trim(),
            endTime: endTime,
          });
        });

        setDataLyric(outputText);
        setLyricData(output);
        // setDataLyricTime(outputTime);
      } else {
      }
    }
    fetchData();
  }, [song]);
  return dataLyricOld ? (
    <div className="w-full">
      <SyncLyric data={lyricData} />
    </div>
  ) : (
    <p className="w-full h-full">No Lyric</p>
  );
};

export default LyricContent;
