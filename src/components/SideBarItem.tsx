import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SideBarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
  stateSidebarWidth: boolean;
}
const SideBarItem: React.FC<SideBarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
  stateSidebarWidth,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex flex-row items-center text-neutral-400 text-lg font-bold hover:text-white transition py-2 cursor-pointer gap-x-4 `,
        active && "text-white",
      )}
    >
      <div>
        <Icon size={30} />
      </div>
      {stateSidebarWidth && <p>{label}</p>}
    </Link>
  );
};

export default SideBarItem;
