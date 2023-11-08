"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Song } from "../../../../types";
import MediaItem from "@/components/MediaItem";
import LikedButton from "@/components/LikedButton";
import useOnPlay from "@/hooks/useOnPlay";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { FiEdit } from "react-icons/fi";
import ListMenuEditRightClick from "./ListMenuEditRightClick";
import { BsPlusCircle } from "react-icons/bs";
import { GoShare } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import useEditModal from "@/hooks/useEditUpModal";
import useEditSongId from "@/providers/useEditSong";
import { RiDeleteBin2Line } from "react-icons/ri";
interface UploadContentProps {
  songs: Song[];
}

const UploadContent: React.FC<UploadContentProps> = ({ songs }) => {
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    top: undefined,
    left: undefined,
  });
  const [songid, setSongId] = useState<any>("");
  const refMenu = useRef<HTMLUListElement>(null);

  const handleContextMenu = (e: any, songId: Song) => {
    if (!refMenu) return;
    e.preventDefault(); // Ngăn chặn context menu mặc định
    setSongId(songId);
    const clickX = e.clientX;
    const clickY = e.clientY;
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const menuW = refMenu.current?.offsetWidth;
    const menuH = refMenu.current?.offsetHeight;
    if (menuW && menuH) {
      const right = screenW - clickX > menuW;
      const left = !right;
      const top = screenH - clickY > menuH;
      const bottom = !top;
      let Y, X;
      if (right) {
        X = clickX + 5;
      }
      if (left) {
        X = clickX - menuW - 5;
      }
      if (top) {
        Y = clickY + 5;
      }
      if (bottom) {
        Y = clickY - menuH - 5;
      }
      setContextMenuPosition({ top: Y, left: X });
    }
    setContextMenuVisible(true);
  };

  useEffect(() => {
    const closeContextMenu = () => {
      setContextMenuVisible(false);
    };
    document.addEventListener("click", closeContextMenu);
    return () => {
      document.removeEventListener("click", closeContextMenu);
    };
  }, []);
  const editModal = useEditModal();
  const router = useRouter();
  const onPlay = useOnPlay(songs);
  const { isLoading, user } = useUser();
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  const menuContent = useMemo(
    () => [
      {
        icon: FiEdit,
        label: "Edit",
      },
      {
        icon: AiOutlineDelete,
        label: "Delete",
      },
      {
        icon: BsPlusCircle,
        label: "Save to your Like Songs",
      },
      {
        icon: GoShare,
        label: "Share",
      },
    ],
    [],
  );
  const storeEditSong = useEditSongId();
  const handleClicks = [
    () => {
      editModal.onOpen();
      storeEditSong.setEditSong(songid);
    },
    () => {
      // action items 2
      editModal.onOpen();
      storeEditSong.setEditSong(songid);
    },
    () => {
      // action items 3
      alert("You clicked on Item 3");
    },
  ];
  return (
    <div>
      <div className="flex flex-col">
        {songs.map((song: any, index: number) => (
          <div
            onContextMenu={(e) => handleContextMenu(e, song.id)}
            key={song.id}
            className="flex items-center justify-between px-5 hover:bg-neutral-800/50"
          >
            <div className="flex items-center">
              <span className="font-mono text-sm p-3">{index + 1}</span>
              <MediaItem onClick={(id) => onPlay(id)} data={song} />
            </div>
            <div>
              <button
                onClick={() => console.log("ban dang an vao: " + song.id)}
              ></button>
            </div>
          </div>
        ))}
      </div>
      {contextMenuVisible && (
        <div
          className="absolute"
          style={{
            top: contextMenuPosition.top,
            left: contextMenuPosition.left,
          }}
        >
          <ul ref={refMenu} className="bg-[#282828] rounded-lg p-1">
            {menuContent.map((item, index) => (
              <ListMenuEditRightClick
                key={item.label}
                {...item}
                onClick={handleClicks[index]}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadContent;
