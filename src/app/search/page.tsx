import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import React from "react";
import SearchContent from "./components/SearchContent";
interface PageProps {
  searchParams: { title: string };
}
const page = async ({ searchParams }: PageProps) => {
  const songs = await getSongsByTitle(searchParams.title);
  console.log(songs);
  return (
    <div className="rounded-lg bg-[#121212] h-full overflow-hidden overflow-y-auto">
      <Header input={true} className="bg-[#121212]" />
      <h1 className="text-white text-2xl font-semibold ml-4">
        Recent searches
      </h1>
      <div className="mt-20 mb-20">
        <SearchContent songs={songs} />
      </div>
    </div>
  );
};

export default page;
