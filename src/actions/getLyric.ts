const getLyric = async (lyricUrl: string): Promise<string[]> => {
  return await fetch(lyricUrl)
    .then((data) => data.text())
    .then((data) => data.trim().split("\n")); // break lines to array
  // .catch((err) => console.error(err));
};
export default getLyric;
