"use client";
interface SideBarProgs {
  children: React.ReactNode;
  likedSong: Song[];
  upLoadSongs: Song[];
}
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "./Box";
import SideBarItem from "./SideBarItem";
import Library from "./Library";
import { usePlayerContext } from "@/providers/PlayerContext";
import { Song } from "../../types";

const SideBar: React.FC<SideBarProgs> = ({
  children,
  likedSong,
  upLoadSongs,
}) => {
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const { sidebarWidth, setSidebarWidth } = usePlayerContext();
  const [previousWidth, setPreviousWidth] = useState<number>(300);
  const toggleSidebarWidth = () => {
    if (sidebarWidth === 80) {
      setSidebarWidth(previousWidth);
    } else {
      setPreviousWidth(sidebarWidth);
      setSidebarWidth(80);
    }
  };
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsResizing(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    const offset = e.clientX - startX;
    const newWidth = sidebarWidth + offset;
    if (newWidth < 150) {
      setSidebarWidth(80);
    } else if (newWidth > 150 && newWidth < 300) {
      setSidebarWidth(300);
    } else {
      setSidebarWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        href: "/search",
        active: pathname === "/search",
      },
    ],
    [pathname],
  );
  const [stateSidebarWidth, setStateSidebarWidth] = useState(false);
  useEffect(() => {
    if (sidebarWidth == 80) {
      setStateSidebarWidth(false);
    } else {
      setStateSidebarWidth(true);
    }
  });

  return (
    <div className="flex h-full overflow-hidden">
      <div
        className={`flex flex-col bg-black py-2 pl-2 gap-y-2 cursor-default relative z-10`}
        style={{ width: sidebarWidth }}
      >
        <Box>
          <div className="px-5">
            {routes.map((route) => (
              <SideBarItem
                key={route.label}
                stateSidebarWidth={stateSidebarWidth}
                {...route}
              />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <div className="py-3">
            <Library
              stateSidebarWidth={stateSidebarWidth}
              toogleSideBar={toggleSidebarWidth}
              sidebarWidth={sidebarWidth}
              likedSong={likedSong}
              upLoadSongs={upLoadSongs}
            />
          </div>
        </Box>
        <div
          className="h-full cursor-col-resize w-[9px] border-none absolute right-[-4.5px] z-0 hover:bg-white"
          onMouseDown={handleMouseDown}
        ></div>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2 pl-2">
        {children}
      </main>
    </div>
  );
};

export default SideBar;
