import { usePlayerContext } from "@/providers/PlayerContext";
import Router, { useRouter } from "next/navigation";
import React from "react";
interface ListLibraryProps {
  srcImg: string;
  title: string;
  subtitle: string;
  stateSidebarWidth: boolean;
  href: string;
  countSong?: number;
}
const ListLibrary: React.FC<ListLibraryProps> = ({
  srcImg,
  title,
  subtitle,
  stateSidebarWidth,
  href,
  countSong,
}) => {
  const Router = useRouter();
  return (
    <div
      className="flex flex-row p-2 bg-[#202020] m-2 rounded-xl hover:bg-neutral-700 select-none"
      onClick={() => Router.push(href)}
    >
      <div className="w-12 h-12">
        <img
          src={srcImg}
          alt=""
          className="object-cover w-full h-full rounded-md"
        />
      </div>
      <div>
        {stateSidebarWidth && (
          <div className="flex flex-col ml-3 ">
            <p className="font-medium">{title}</p>
            <p className="text-neutral-400">
              Playlist • {countSong} {subtitle}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListLibrary;
