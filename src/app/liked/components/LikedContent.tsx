"use client";
import React, { useEffect } from "react";
import { Song } from "../../../../types";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import MediaItem from "@/components/MediaItem";
import LikedButton from "@/components/LikedButton";

interface LikedContentProps {
  songs: Song[];
}
const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const router = useRouter();
  const onPlay = useOnPlay(songs);
  const { isLoading, user } = useUser();
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  return (
    <div>
      <div className="flex flex-col">
        {songs.map((song: any, index: number) => (
          <div
            key={song.id}
            className="flex items-center justify-between px-5 hover:bg-neutral-800/50"
          >
            <div className="flex items-center">
              <span className="font-mono text-sm p-3">{index + 1}</span>
              <MediaItem onClick={(id) => onPlay(id)} data={song} />
            </div>
            <LikedButton songId={song.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedContent;
