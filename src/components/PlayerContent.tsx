"use client";

import { useEffect, useMemo, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import {
  HiOutlineQueueList,
  HiSpeakerWave,
  HiSpeakerXMark,
} from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { SlLoop } from "react-icons/sl";
import { LiaMicrophoneAltSolid, LiaRandomSolid } from "react-icons/lia";
import { RiVideoLine } from "react-icons/ri";
import { CgMiniPlayer } from "react-icons/cg";
import usePlayer from "@/hooks/usePlayer";

import MediaItem from "./MediaItem";
import Slider from "./Slider";
import { Song } from "../../types";
import PlayerControl from "./PlayerControl";
import { PiDevicesDuotone, PiRocketLaunch } from "react-icons/pi";
import {} from "react-icons/hi2";
import PlayerContentItem from "./PlayerContentItem";
import { usePathname, useRouter } from "next/navigation";
import LikedButton from "./LikedButton";
import { usePlayerContext } from "@/providers/PlayerContext";
import useHoldStatePlayer from "@/hooks/useHoldStatePlayer";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const pathname = usePathname();
  const router = useRouter();
  const [isLyric, setIsLyric] = useState(true);
  const [isQueue, setIsQueue] = useState(true);

  const routesLyric = useMemo(() => pathname === "/lyric", [pathname]);
  const routesQueue = useMemo(() => pathname === "/queue", [pathname]);

  const handleToggleRouterLyric = () => {
    if (isLyric) {
      router.push("/lyric");
    } else {
      router.back();
    }
    setIsLyric(!isLyric);
  };

  const handleToggleRouterQueue = () => {
    if (isQueue) {
      router.push("/queue");
    } else {
      router.back();
    }
    setIsQueue(!isQueue);
  };

  const { loopAudio, setLoopAudio } = useHoldStatePlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const { randomPlay, setRandomPlay, volume, setVolume } = usePlayerContext();
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const Icon = isPlaying ? BsPlayFill : BsPauseFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;
  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);

    if (randomPlay) {
      const random = Math.floor(Math.random() * (player.ids.length + 1));
      const nextSong = player.ids[random];
      player.setId(nextSong);
    } else {
      const nextSong = player.ids[currentIndex + 1];
      if (!nextSong) {
        return player.setId(player.ids[0]);
      }
      player.setId(nextSong);
    }
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }
    player.setId(previousSong);
  };

  useEffect(() => {
    const audio = new Audio(songUrl);
    audio.preload;
    setAudio(audio);
  }, [songUrl]);

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };
  useEffect(() => {
    audio?.play();
    return () => {
      audio?.load();
    };
  }, [audio]);
  const handlePlay = () => {
    if (isPlaying) {
      audio?.play();
      setIsPlaying(false);
    } else {
      audio?.pause();
      setIsPlaying(true);
    }
  };
  // control volume
  useEffect(() => {
    if (audio) audio.volume = volume;
  }, [volume]);
  return (
    <div className="flex flex-row justify-between">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4 select-none">
          <MediaItem data={song} />
          <LikedButton songId={song.id} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex md:hidden col-auto w-full justify-end items-center">
          <div
            onClick={handlePlay}
            className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
          >
            <Icon size={30} className="text-black" />
          </div>
        </div>

        <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
          <LiaRandomSolid
            onClick={() => setRandomPlay(!randomPlay)}
            size={20}
            className={`cursor-pointer hover:text-white transition ${
              randomPlay
                ? "text-green-500 hover:text-green-700"
                : "text-neutral-400"
            }`}
          />
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={30}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
          <div
            onClick={handlePlay}
            className="flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
          >
            <Icon size={30} className="text-black" />
          </div>
          <AiFillStepForward
            onClick={onPlayNext}
            size={30}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
          <SlLoop
            onClick={() => setLoopAudio(!loopAudio)}
            size={20}
            className={`cursor-pointer hover:text-white transition ${
              loopAudio
                ? "text-green-500 hover:text-green-700"
                : "text-neutral-400"
            }`}
          />
        </div>
        <div className="flex-1 w-full">
          <PlayerControl
            audio={audio}
            loopAudio={loopAudio}
            autoPlayNext={onPlayNext}
          />
        </div>
      </div>
      <div className="hidden md:flex w-full justify-end items-center pr-2 gap-4">
        <PlayerContentItem icon={RiVideoLine} />
        <PlayerContentItem
          icon={LiaMicrophoneAltSolid}
          active={routesLyric}
          onClick={handleToggleRouterLyric}
        />
        <PlayerContentItem
          icon={HiOutlineQueueList}
          active={routesQueue}
          onClick={handleToggleRouterQueue}
        />
        <PlayerContentItem icon={PiDevicesDuotone} />

        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer text-neutral-400"
            size={20}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
        <PlayerContentItem icon={CgMiniPlayer} />
      </div>
    </div>
  );
};

export default PlayerContent;
