import { surahById, allSurah } from "@/common/surah";
import pako from "pako";

export default async function handler(req, res) {
  try {
    const data = allSurah();

    const compressed = pako.deflate(JSON.stringify(data));
    res.status(200).json({
      data: compressed,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}
