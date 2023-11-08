import React from "react";
import { IconType } from "react-icons";

interface PlayerContentItemProps {
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
}

const PlayerContentItem: React.FC<PlayerContentItemProps> = ({
  icon: Icon,
  active,
  onClick,
}) => {
  return (
    <Icon
      onClick={onClick}
      className={` ${active ? "text-green-500" : "text-neutral-400"}`}
      size={20}
    />
  );
};

export default PlayerContentItem;
