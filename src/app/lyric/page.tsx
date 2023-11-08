import Header from "@/components/Header";
import LyricContent from "./components/LyricContent";

function page() {
  return (
    <div
      className="h-full w-full overflow-hidden overflow-y-auto"
      data-id="lyrics-container"
    >
      <Header className="fixed top-15 " />
      <div className="mt-[80px] py-10 pl-10 overflow-y-auto mb-20 bg-[#767676] w-full">
        <LyricContent />
      </div>
    </div>
  );
}

export default page;
