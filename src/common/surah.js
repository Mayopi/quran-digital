import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/quran.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

const allSurah = () => {
  return data;
};

const surahById = (id) => {
  return data.filter((surah) => surah.number === id);
};

const surahByName = (name) => {
  return data.filter((surah) => surah.name === name);
};

export { surahById, allSurah, surahByName };
