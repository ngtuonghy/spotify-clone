"use client";
import React, { createContext, useContext, useState } from "react";
type PlayerContextType = {
  currentTime: number;
  setCurrentTime: (time: number) => void;
  stateClickLyric: boolean;
  setStateClickLyric: (setbool: boolean) => void;
  clickTimeLyric: number;
  setClickTimeLyric: (time: number) => void;
  sidebarWidth: number;
  setSidebarWidth: (size: number) => void;
  randomPlay: boolean;
  setRandomPlay: (rd: boolean) => void;
  volume: number;
  setVolume: (vl: number) => void;
};
const PlayerContext = createContext<PlayerContextType | undefined>(undefined);
export function usePlayerContext() {
  const value = useContext(PlayerContext);
  if (value == null) throw Error("Cannot use outside of PLayerProvider");
  return value;
}
interface PlayerProviderProps {
  children: React.ReactNode;
}
export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [stateClickLyric, setStateClickLyric] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [clickTimeLyric, setClickTimeLyric] = useState<number>(0);
  const [sidebarWidth, setSidebarWidth] = useState<number>(80); // TODO: movie provider.
  const [randomPlay, setRandomPlay] = useState<boolean>(false);
  const [volume, setVolume] = useState(1);

  return (
    <PlayerContext.Provider
      value={{
        currentTime,
        setCurrentTime,
        stateClickLyric,
        setStateClickLyric,
        clickTimeLyric,
        setClickTimeLyric,
        sidebarWidth,
        setSidebarWidth,
        randomPlay,
        setRandomPlay,
        volume,
        setVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
