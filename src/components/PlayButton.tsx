import React from "react";
import { FaPlay } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface PlayButtonProps {
  className?: string;
}
const PlayButton: React.FC<PlayButtonProps> = ({ className }) => {
  return (
    <button
      className={twMerge(
        `
        transition 
        opacity-0 
        rounded-full 
        flex 
        items-center 
        justify-center 
        bg-green-500 
        p-4 
        drop-shadow-md 
        translate
        translate-y-1/4
        group-hover:opacity-100
        group-hover:translate-y-0
        hover:scale-110
      `,
        className,
      )}
    >
      <FaPlay className="text-black" />
    </button>
  );
};

export default PlayButton;
