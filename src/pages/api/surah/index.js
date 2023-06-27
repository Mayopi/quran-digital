import { surahById, allSurah } from "@/common/surah";

export default async function handler(req, res) {
  try {
    const data = allSurah();

    data.map((surah) => {
      delete surah.description;
      delete surah.bismillah;
      delete surah.ayahs;
    });

    res.status(200).json({
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}
