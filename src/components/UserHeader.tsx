import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

interface UserHeaderProps {
  href: string;
  label: string;
}
const UserHeader: React.FC<UserHeaderProps> = ({ href, label }) => {
  return (
    <Link href={href}>
      <div className="flex w-full bg-[#282828] hover:bg-[#202020] py-1.5 px-2">
        {label}
      </div>
    </Link>
  );
};

export default UserHeader;
