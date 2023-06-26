import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/quran.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

const cutSize = (data) => {
  const modifiedData = data.map((surah) => {
    const modifiedAyahs = surah.ayahs.map((ayah) => {
      // Menghapus properti "image", "tafsir", dan "meta" dari setiap objek ayah
      const { image, tafsir, meta, ...newAyah } = ayah;

      // Menghapus properti "image" dan "meta" secara rekursif dari objek ayahs di dalam ayah
      if (newAyah.ayahs) {
        newAyah.ayahs = cutSize(newAyah.ayahs);
      }

      return newAyah;
    });

    const modifiedMeta = { ...surah.meta };
    // Menghapus properti "image" dari objek meta
    delete modifiedMeta.image;

    return {
      ...surah,
      ayahs: modifiedAyahs,
      meta: modifiedMeta,
    };
  });

  return modifiedData;
};

const allSurah = () => {
  return cutSize(data);
};

const surahById = (id) => {
  const result = data.filter((surah) => surah.number == id);
  return cutSize(result);
};

const surahByName = (name) => {
  const result = data.filter((surah) => surah.name == name);
  const final = cutSize(result);
  return final.length > 0 ? final[0] : null;
};

export { surahById, allSurah, surahByName };
