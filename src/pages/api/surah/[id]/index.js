import { surahById } from "@/common/surah";

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    if (!id)
      return res.status(400).json({
        message: "Bad Request",
        code: 400,
        error: "Id is required!",
      });
    const data = surahById(id);
    res.status(200).json({
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}
