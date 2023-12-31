import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/SideBar";
import Player from "@/components/Player";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import { PlayerProvider } from "@/providers/PlayerContext";
import getLikedSongs from "@/actions/getLikedSongs";
import getUpLoadSong from "@/actions/getUploadSong";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const likedSong = await getLikedSongs();
  const UploadSong = await getUpLoadSong();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <PlayerProvider>
          <SupabaseProvider>
            <UserProvider>
              <ModalProvider />
              <SideBar likedSong={likedSong} upLoadSongs={UploadSong}>
                {children}
              </SideBar>
              <Player />
            </UserProvider>
          </SupabaseProvider>
        </PlayerProvider>
      </body>
    </html>
  );
}
