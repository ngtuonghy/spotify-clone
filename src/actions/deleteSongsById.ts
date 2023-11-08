import { SupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

export async function deleteSongById(
  supabaseClient: SupabaseClient,
  id: string,
  song_path: string,
  image_path: string,
  lyric_path: string,
) {
  const { error: deleteTable } = await supabaseClient
    .from("songs")
    .delete()
    .eq("id", id);
  if (deleteTable) {
    return toast.error("Failed remove row SQL");
  }
  const { error: removeSongError } = await supabaseClient.storage
    .from("songs")
    .remove([song_path]);
  if (removeSongError) {
    return toast.error("Failed remove song");
  }
  const { error: removeImageError } = await supabaseClient.storage
    .from("images")
    .remove([image_path]);
  if (removeImageError) {
    return toast.error("Failed remove image");
  }
  const { error: removeLyricError } = await supabaseClient.storage
    .from("lyrics")
    .remove([lyric_path]);
  if (removeLyricError) {
    return toast.error("Failed remove song file");
  }
  return toast.success("Delete success");
}
