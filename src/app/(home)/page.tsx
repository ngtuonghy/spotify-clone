import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import TimeBaseGreeting from "@/components/TimeBaseGreeting";
import PageContent from "./components/PageContent";

export default async function Home() {
  const songs = await getSongs();
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto ">
      <Header className="bg-gradient-to-b rounded-lg" />
      <div className="mb-2 mt-20">
        <TimeBaseGreeting />
      </div>
      <div>
        <PageContent songs={songs} />
      </div>
    </div>
  );
}
