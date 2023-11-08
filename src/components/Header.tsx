"use client";
import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { BiUser } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useRouter } from "next/navigation";
import UserHeader from "./UserHeader";
import useAuthModal from "@/hooks/useAuthModal";
import Button from "./Button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import SearchBox from "./SearchBox";
import { usePlayerContext } from "@/providers/PlayerContext";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
interface HeaderProps {
  className?: string;
  input?: boolean;
  children?: React.ReactNode;
}
const Header: React.FC<HeaderProps> = ({ className, input, children }) => {
  const [toggleUser, setToggleUser] = useState(false);

  const { sidebarWidth, setSidebarWidth } = usePlayerContext();
  const refToggleUser = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (
        refToggleUser.current &&
        !refToggleUser.current.contains(e.target as Node)
      ) {
        setToggleUser(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  });
  const authModal = useAuthModal();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const { user } = useUser();
  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();
    console.log("logout");
    if (error) toast.error(error.message);
    else {
      toast.success("Logged out!");
    }
  };
  return (
    <>
      <div
        style={{ width: `calc(100% - ${sidebarWidth}px)` }}
        className="fixed z-10 md:hidden flex bg-black  justify-between items-center"
      >
        <div className="w-full">{input && <SearchBox />}</div>
        {user ? (
          <div className="flex items-center gap-x-4 mr-4">
            <div
              className="flex rounded-full bg-black items-center justify-center cursor-pointer"
              onClick={() => router.push("/content-feed")}
            >
              <IoMdNotificationsOutline
                className="text-white p-1 hover:p-[5px] transition"
                size={35}
              />
            </div>
            <div
              onClick={() => setToggleUser(!toggleUser)}
              className="flex relative rounded-full bg-black items-center justify-center cursor-pointer"
            >
              <BiUser
                className="text-white p-1 hover:p-[5px] transition"
                size={35}
              />

              {toggleUser && (
                <div
                  ref={refToggleUser}
                  className="absolute right-0 top-9 w-[200px] rounded-lg p-1.5 bg-[#282828] z-10"
                >
                  <UserHeader href="/" label="Account" />
                  <UserHeader href="/" label="Profile" />
                  <UserHeader href="/" label="Upgradate to Premium" />
                  <UserHeader href="/" label="Settings" />
                  <hr />
                  <div
                    onClick={handleLogout}
                    className="flex w-full bg-[#282828] hover:bg-[#202020] py-1.5 px-2"
                  >
                    <p>Logout </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex">
            <div>
              <Button
                onClick={authModal.onOpen}
                className="bg-transparent text-neutral-300 font-medium w-28"
              >
                Sign up
              </Button>
            </div>
            <div>
              <Button onClick={authModal.onOpen} className="bg-white w-28 mr-4">
                Log in
              </Button>
            </div>
          </div>
        )}
      </div>
      <div
        className={twMerge(
          `h-fit 
        from-emerald-800 
        rounded-t-lg
        fixed
        z-10
p-4
hidden md:flex
      `,
          className,
        )}
        style={{ width: `calc(100% - ${sidebarWidth}px - 23px)` }}
      >
        <div className=" flex items-center justify-between w-full">
          <div className="flex gap-x-2 items-center">
            <div className="flex gap-x-2 items-center">
              <button
                onClick={() => router.back()}
                className="
              rounded-full 
              bg-black 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
              >
                <RxCaretLeft className="text-white" size={35} />
              </button>
              <button
                onClick={() => router.forward()}
                className={`
              rounded-full 
              bg-black 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            `}
              >
                <RxCaretRight className="text-white" size={35} />
              </button>
            </div>
          </div>
          <div className="w-full">{input && <SearchBox />}</div>

          {user ? (
            <div className="flex items-center gap-x-4 mr-4">
              <div
                className="md:flex hidden rounded-full bg-black items-center justify-center cursor-pointer"
                onClick={() => router.push("/content-feed")}
              >
                <IoMdNotificationsOutline
                  className="text-white p-1 hover:p-[5px] transition"
                  size={27}
                />
              </div>
              <div
                onClick={() => setToggleUser(!toggleUser)}
                className="md:flex hidden relative rounded-full bg-black items-center justify-center cursor-pointer"
              >
                <BiUser
                  className="text-white p-1 hover:p-[5px] transition"
                  size={27}
                />

                {toggleUser && (
                  <div
                    ref={refToggleUser}
                    className="absolute right-0 top-9 w-[200px] rounded-lg p-1.5 bg-[#282828] z-10"
                  >
                    <UserHeader href="/" label="Account" />
                    <UserHeader href="/" label="Profile" />
                    <UserHeader href="/" label="Upgradate to Premium" />
                    <UserHeader href="/" label="Settings" />
                    <hr />
                    <div
                      onClick={handleLogout}
                      className="flex w-full bg-[#282828] hover:bg-[#202020] py-1.5 px-2"
                    >
                      <p>Logout </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex">
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-transparent text-neutral-300 font-medium w-28"
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-white w-28 mr-4"
                >
                  Log in
                </Button>
              </div>
            </div>
          )}
        </div>
        {children}
      </div>
    </>
  );
};

export default Header;
