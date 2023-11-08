// import { useSupabaseClient } from "@supabase/auth-helpers-nextjs";
// require("dotenv").config({ path: ".env.local" });
import { Song } from "../../types";
import { StorageClient } from "@supabase/storage-js";

const STORAGE_URL = "https://vqpqsjgvbvoncoxseuak.supabase.co/storage/v1";
const SERVICE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxcHFzamd2YnZvbmNveHNldWFrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODU0ODY1NiwiZXhwIjoyMDE0MTI0NjU2fQ.f5ikpO3ej23vMn1C5_muO2hxrvPXnkfWeGobpMy_UGo"; //! service key, not anon key

const storageClient = new StorageClient(STORAGE_URL, {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
});

const useLoadSongUrl = (song: Song) => {
  const { data: lyricData } = storageClient
    .from("lyrics")
    .getPublicUrl(song.lyric_path);
  // if (!song) {
  //   return null;
  // }
  //
  // const { data: lyricData } = supabaseClient.storage
  //   .from("lyrics")
  //   .getPublicUrl(song.lyric_path);

  return lyricData.publicUrl;
};

export default useLoadSongUrl;
