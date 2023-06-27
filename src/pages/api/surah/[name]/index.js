import { surahByName } from "@/common/surah";

export default async function handler(req, res) {
  try {
    const { name } = req.query;
    if (!name)
      return res.status(400).json({
        message: "Bad Request",
        code: 400,
        error: "Id is required!",
      });
    const data = surahByName(name);
    res.status(200).json({
      data,
    });
    console.info("Fetching Surah Complete");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}
