"use client";
import { useState, useEffect } from "react";

function useHoldStatePlayer() {
  const [loopAudio, setLoopAudio] = useState(false);
  const [randomPlay, setRandomPlay] = useState<boolean>(false);
  return {
    randomPlay,
    setRandomPlay,
    loopAudio,
    setLoopAudio,
  };
}

export default useHoldStatePlayer;
