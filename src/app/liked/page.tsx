import getLikedSongs from "@/actions/getLikedSongs";
import React from "react";
import LikedContent from "./components/LikedContent";
import Header from "@/components/Header";
import Image from "next/image";
import PlayButton from "@/components/PlayButton";
import getUpLoadSong from "@/actions/getUploadSong";
const page = async () => {
  const songs = await getLikedSongs();
  const idSongs = await getUpLoadSong();

  return (
    <div className="rounded-lg h-full w-full overflow-hidden overflow-y-auto bg-[#453287]">
      <Header className="bg-[#453287]" />
      <div className="mb-2 mt-20">
        <div className="flex flex-row items-center bg-[#453287]">
          <div className="relative h-56 w-56 ml-5 ">
            <Image
              className="object-cover"
              fill
              src="/images/liked.png"
              alt="Playlist"
            />
          </div>
          <div className="flex flex-col ml-5 font-bold">
            <p>Playlist</p>
            <p className="text-[80px]">Liked Songs</p>
          </div>
        </div>
        <div className="ml-5">
          <PlayButton className="opacity-100" />
        </div>
        <div className="bg-neutral-900 rounded-lg  mx-5 overflow-hidden overflow-y-auto mt-10 mb-[100px]">
          <LikedContent songs={songs} />
        </div>
      </div>
    </div>
  );
};

export default page;
