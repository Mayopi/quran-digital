import { surahById, allSurah } from "@/common/surah";

export default async function handler(req, res) {
  try {
    const data = allSurah();

    const updatedData = [];
    data.forEach((surah) => {
      const updatedSurah = { ...surah };
      delete updatedSurah.description;
      delete updatedSurah.bismillah;
      delete updatedSurah.ayahs;
      delete updatedSurah.audio;
      updatedData.push(updatedSurah);
    });
    res.status(200).json({
      updatedData,
    });
    console.info("Fetching All Data Complete");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}
