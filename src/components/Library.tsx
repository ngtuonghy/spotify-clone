import React, { useEffect, useRef, useState } from "react";
import { BiLibrary } from "react-icons/bi";
import {
  AiOutlineArrowRight,
  AiOutlinePlus,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { TbMusicUp } from "react-icons/tb";
import { PiFolderLight, PiMusicNotesPlusDuotone } from "react-icons/pi";
import { useUser } from "@/hooks/useUser";
import CreateLibraryItem from "./CreateLibraryItem";
import useUploadModal from "@/hooks/useUploadModal";
import ListLibrary from "./ListLibrary";
import { Song } from "../../types";

interface LibraryProps {
  stateSidebarWidth: boolean;
  sidebarWidth: number;
  toogleSideBar: () => void;
  likedSong: Song[];
  upLoadSongs: Song[];
}
const Library: React.FC<LibraryProps> = ({
  stateSidebarWidth,
  toogleSideBar,
  sidebarWidth,
  likedSong,
  upLoadSongs,
}) => {
  const [statelikedSong, setstateLikedSong] = useState<boolean | null>(null);
  const [stateUpLoadSongs, SetStateUpLoadSongs] = useState<boolean | null>(
    null,
  );
  const AuthModal = useAuthModal();
  const UploadModal = useUploadModal();
  const { user } = useUser();
  const [toggleCreate, setToggleCreate] = useState(false);
  useEffect(() => {
    if (likedSong.length != 0) {
      setstateLikedSong(true);
    } else {
      setstateLikedSong(false);
    }
  });
  useEffect(() => {
    if (upLoadSongs.length != 0) {
      SetStateUpLoadSongs(true);
    } else {
      SetStateUpLoadSongs(false);
    }
  });

  const onClick = () => {
    if (!user) return AuthModal.onOpen();
    else {
      setToggleCreate(!toggleCreate);
    }
  };
  const outSideRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (
        outSideRef.current &&
        !outSideRef.current.contains(e.target as Node)
      ) {
        setToggleCreate(false);
      }
    };
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  const handleCreate = () => {
    setToggleCreate(false);
    UploadModal.onOpen();
  };
  return (
    <div
      ref={outSideRef}
      className={`flex overflow-x-hidden flex-col ${
        stateSidebarWidth ? "" : "items-center"
      }`}
    >
      <div className="flex flex-row items-center justify-between text-neutral-400 px-5">
        <div
          onClick={toogleSideBar}
          className="flex flex-row items-center gap-1 hover:text-white transition cursor-pointer"
        >
          <div className="text-lg font-bold select-none">
            <BiLibrary size={30} />
          </div>
          {stateSidebarWidth && (
            <p className="whitespace-nowrap select-none font-medium text-lg">
              Your library
            </p>
          )}
        </div>
        {stateSidebarWidth && (
          <div className="flex gap-4">
            <div className="relative">
              <div
                onClick={onClick}
                className="w-8 h-8 rounded-full 
                            flex 
                            items-center 
                            justify-center 
                            cursor-pointer 
                            hover:bg-[#303030] 
                            transition"
              >
                <AiOutlinePlus
                  size={25}
                  className="hover:text-white cursor-pointer"
                />
              </div>
              {toggleCreate && (
                <div className="fixed z-50 w-30 p-1 flex flex-col rounded-md bg-[#282828]">
                  <CreateLibraryItem
                    onClick={handleCreate}
                    icon={TbMusicUp}
                    label="Upload new song"
                  />
                  <CreateLibraryItem
                    icon={PiMusicNotesPlusDuotone}
                    label="Create a new playlist"
                  />
                  <CreateLibraryItem
                    icon={PiFolderLight}
                    label="Create a playlist folder"
                  />
                </div>
              )}
            </div>
            {sidebarWidth < 500 ? (
              <div
                className="w-8 h-8 rounded-full 
                            flex 
                            items-center 
                            justify-center 
                            cursor-pointer 
                            hover:bg-[#303030] 
                            transition"
              >
                <AiOutlineArrowRight size={25} />
              </div>
            ) : (
              <div
                className="w-8 h-8  rounded-full 
                            flex 
                            items-center 
                            justify-center 
                            cursor-pointer 
                            hover:bg-[#303030] 
                            transition"
              >
                <AiOutlineArrowLeft size={25} className="hover:text-white" />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="mt-5">
        {statelikedSong && (
          <ListLibrary
            srcImg="/images/liked.png"
            title="Liked Songs"
            subtitle="song"
            stateSidebarWidth={stateSidebarWidth}
            href="/liked"
            countSong={likedSong.length}
          />
        )}
        {stateUpLoadSongs && (
          <ListLibrary
            srcImg="/images/upload.png"
            title="Upload Songs"
            subtitle="upload"
            stateSidebarWidth={stateSidebarWidth}
            href="/yourupload"
            countSong={upLoadSongs.length}
          />
        )}
      </div>
    </div>
  );
};

export default Library;
