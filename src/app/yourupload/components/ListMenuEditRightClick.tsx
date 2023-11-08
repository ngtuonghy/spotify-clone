import React from "react";
import { IconType } from "react-icons";
interface ListMenuEditRightClickProps {
  icon: IconType;
  label: string;
  onClick?: () => void;
}
const ListMenuEditRightClick: React.FC<ListMenuEditRightClickProps> = ({
  icon: Icon,
  label,
  onClick,
}) => {
  return (
    <li
      onClick={onClick}
      className="rounded-sm p-3 flex items-center cursor-pointer hover:bg-[#202020]"
    >
      <Icon size={20} />
      <p className="ml-3 text-sm whitespace-nowrap">{label}</p>
    </li>
  );
};

export default ListMenuEditRightClick;
