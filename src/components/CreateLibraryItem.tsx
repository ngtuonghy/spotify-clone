import React from "react";
import { IconType } from "react-icons";

interface CreateLibraryItemProps {
  icon: IconType;
  label: string;
  onClick?: () => void;
}
const CreateLibraryItem: React.FC<CreateLibraryItemProps> = ({
  icon: Icon,
  label,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex p-2 hover:bg-[#202020] cursor-pointer gap-2"
    >
      <Icon size={20} />
      <p>{label}</p>
    </div>
  );
};

export default CreateLibraryItem;
