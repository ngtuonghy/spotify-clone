import { create } from "zustand";
interface useEditSong {
  editSong: string;
  setEditSong: (id: string) => void;
}
const useEditSongId = create<useEditSong>((set) => ({
  editSong: "",
  setEditSong: (id) => set({ editSong: id }),
}));

export default useEditSongId;
